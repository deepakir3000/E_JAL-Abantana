var cron = require('node-cron');
const {logger} = require('./../config/log-config');
const LOG = logger.getLogger('emailCronJobs.js');
const {Application} = require('./../models/formaction/applicationdetails.js');
const {AppConstants} = require('./../utils/AppConstants');
const email = require('./../config/email_sms/email');
const{Status} = require('./../models/uac/status.js');
const AppUtils = require('./../utils/AppUtils');
var {poolConnect,cpool} = require('../db/sql');
const _ = require('lodash');

const CRON_EXPRESSION = "59 59 23 * * *";
/* cron.schedule(CRON_EXPRESSION, async function() {
    let firstDate = new Date();
    console.log('running a email task every Second');
    try{
        const totalRecord = await cpool.query(`select s.obj_id,s.wf_id,s.wf_step_transition_id,s.from_id,s.to_id,s.created_on, a.status_id,d.mobile,d.email,c.max_duration_in_days,c.max_times from workflow_execution_log s join (select obj_id,max(id) id from workflow_execution_log group by obj_id) f1 on f1.id = s.id and f1.obj_id = s.obj_id join application_details a on s.obj_id = a.id join workflow_step_transitions c on s.wf_step_transition_id = c.id join mst_users d on s.to_id = d.id where a.status_id = 3`);
        if(totalRecord != null){
          let totHol = 0;
          let dataRecord = totalRecord.recordset;
        //  for(i=0;i<dataRecord.length;i++){
          _.forEach(dataRecord, async(item) => {
              try{
                let secondDate = new Date(item.created_on);
                secondDate = convert(secondDate);
                firstDate = convert(firstDate);
                let query = `SELECT count(*) as count FROM mst_holidays WHERE hol_date BETWEEN CAST('${secondDate}' AS DATE) AND CAST('${firstDate}' AS DATE);`
                const totalHolidays = await cpool.query(query);
                let diff = AppUtils.dateDiif(item.created_on);
                if(totalHolidays != null){
                  totHol = totalHolidays.recordset;
                  if(totHol != null){
                    totHol = totHol[0].count;
                  }
                }
                diff = parseInt(diff - totHol);
                console.log('application id ' + item.obj_id + ' execution time ' + diff + ' max Duration ' + parseInt(0.75 * item.max_duration_in_days))
                if(diff >= item.max_duration_in_days){
                  console.log('Application Number is rejected today...',item.obj_id)
                  // email.sendSimpleMail('jayant.kumar@silicontechlab.com','TEST','msg sent successfully');
                  var status = await Status.findOne({
                    where: {
                        id: AppConstants.REJECTED
                        },
                        raw: true
                  })
                  let result = null;
                  if(status != null){
                    result = await Application.update({
                      work_flow_step_transiton_type_mst_id: 3,
                      status_remarks: 'Rejected',
                      status_id: status.id
                      }, {
                      where: {id: item.obj_id}
                    })
                  }
                }else if(diff >= parseInt(0.75 * item.max_duration_in_days)){
                  console.log(item.email);
                  // email.sendSimpleMail('jayant.kumar@silicontechlab.com','TEST','msg sent successfully');
                }
              }catch (err) {
                LOG.error("SQL error!!!",err);
              }
            })
        }
      }catch (err) {
        LOG.error("SQL error!!!",err);
    }
  }); */
    
  //PSEUDO CODE
  // Iterate below logic for all the available workflows:-W1, W2,.....
  /*let wi = current workflow
  //Step 1:-
    Find last logs from execution_log table for unique applications with CURRENT workflow, where trans_status not in ('Rejected' || 'Issue Alocation order')
    Get additional fields for the above query with atleast below fields:-
      obj_id, wf_id, step_id, log_date, from_id, from_id_user_type, from_email_id, from_mobile_no, to_id, to_id_user_type, to_email_id, to_mobile_no for all the log records.
    Put these logs in a list say L1Wi
    */

    /*select er.app_id, CONVERT(datetime, er.log_date, 101) as log_date, er.wf_id, er.wf_step_id, er.wf_step_transition_id, er.from_id, er.to_id, usr.mobile as to_mobile_no, usr.email as to_email_id, usr.role_name as to_id_user_type, er.created_on, er.transition_desc from(
              	select wel.app_id, wel.log_date, wel.wf_id, wel.wf_step_id, wel.wf_step_transition_id, wel.from_id, wel.to_id, wel.created_on, wst.transition_desc from (
              		select *
              		from (
              		   select distinct obj_id as app_id, max(created_on) as log_date
              		   from [jform].[dbo].[workflow_execution_log ] group by obj_id
              		) as x inner join [jform].[dbo].[workflow_execution_log ] as f on  f.obj_id = x.app_id and f.created_on = x.log_date
              	) as wel
              inner join [jform].[dbo].[workflow_step_transitions] as wst on wel.wf_step_transition_id = wst.id and RTRIM(LTRIM((UPPER(wst.transition_desc)))) not in ('REJECT', 'ISSUE_ALLOCATION_ORDER') --order by wel.app_id
              ) as er
              inner join (select u.id, u.mobile, u.email, r.role_name from [jform].[dbo].[mst_users] as u inner join [jform].[dbo].[mst_roles] as r on u.role_id = r.id) as usr on usr.id = er.to_id order by er.app_id
              */

  //Step 2:-
    /*Find all allowed durations for CURRENT workflow with below fields atleast
      wf_id, trans_type(Ex. FTD, REJ, APP, RzQ, IAO), from, to, MaxDID, step_id
    Put these records in a list say L2Wi
    */
/*
    select ws.wf_id, wst.work_flow_step_id, wst.transition_type_id, wst.transition_desc, wst.max_duration_in_days as mdid, wst.step_notify_template_id
from  [jform].[dbo].[workflow_step_transitions] as wst inner join  [jform].[dbo].[workflow_step ] as ws
on wst.work_flow_step_id = ws.id and ws.wf_id=? and wst.max_duration_in_days != 0 order by wst.work_flow_step_id
*/
  //Step 3:- choose the action from L2Wi for each applicable L1Wi
/*
    Iterate L1Wi{
      let l1wi = L1Wi.currentRecord;
      let stepSelected = null;
      Iterate L2Wi{
        let l2wi = L2Wi.currentRecord;
        if(l1wi.to_id == l2wi.from || l1wi.to_id_user_type == l2wi.from){//As sometimes we have exact id & sometimes $Variable
          if(stepSelected == null){
            stepSelected = l2wi;
          }else if(stepSelected.step_id > l2wi.step_id){
            stepSelected = l2wi.step_id;
          }
        }
      }//L2Wi iteration complete
      if(stepSelected != null){
        //validate Holidays
        if(findCurrentDayDifferenceFrom(l1wi.log_date) > 0.75 * stepSelected.MaxDID){
          Add to action items for rejection & mailing purpose
          Ex.
            Reject the application with l1wi.obj_id as application id
            Send notification to l1wi.to user email & mobile
        }
      }
    }//L1Wi iteration complete
*/
  //Step 4:- calculate day difference
/*
  findCurrentDayDifferenceFrom(fromDate){
    return current_date - fromDate- (holidays between current_date & fromDate);
    // select ((select DATEDIFF(day, CAST('${fromDate}' AS date), GETDATE()) as dateDiff) - (select count(*) as holidays from [jform].[dbo].[mst_holidays]
    //                                 where hol_date between CAST('${fromDate}' AS date)  and GETDATE())) as dayDifference
  }
*/

cron.schedule(CRON_EXPRESSION, () => {//59 59 23 * * *
  LOG.info('Cron job started.');

  jobHandler().then(()=>{
      LOG.info('Task executed successfully.');
  })
  .catch((e)=>{
      LOG.error(e);
      LOG.info('Task execution failed!!!');
    });
});

async function doNotifyOrReject(request, fromDate, l1wi, stepSelected,secEmail){
  let numberOfHolidaysBetween = await request.query(`select ((select DATEDIFF(day, CAST('${fromDate}' AS date), GETDATE()) as dateDiff) - (select count(*) as holidays from [jform].[dbo].[mst_holidays]
                                  where hol_date between CAST('${fromDate}' AS date)  and GETDATE())) as dayDifference`);
  let dayDiff = 0;
  if(numberOfHolidaysBetween != null){
    dayDiff = numberOfHolidaysBetween.recordset[0].dayDifference;
  }
  LOG.debug(`Day difference : ${dayDiff}`);

  if( dayDiff > parseInt(0.75 * stepSelected.mdid) & dayDiff <= stepSelected.mdid){
    LOG.info(`Record found for email trigger : dayDiff = ${dayDiff} & MaxDurationAllowed = ${stepSelected.mdid}`);
    LOG.info(`Notify logged record : ${JSON.stringify(l1wi)}`);
    LOG.info(`Notify probable stepSelected record : ${JSON.stringify(stepSelected)}`);
    LOG.info(`Notify probable stepSelected Email : ${JSON.stringify(l1wi.to_email_id)}`);
    LOG.info(`Notify probable Secratery Email : ${JSON.stringify(secEmail)}`);
    // Send notification to l1wi.to_email_id & l1wi.to_mobile_no about l1wi.app_id
    email.sendSimpleMailWithCC(l1wi.to_email_id, secEmail,'Action required!','Dear Sir/Madam, \nPlease take reqired action on the application with id ' + l1wi.app_id + '. \n\nThis is a system auto generated email. \n Admin\n Water Resource Management System.');
  }else if( dayDiff > stepSelected.mdid ){
    LOG.info(`Record found for rejection trigger : dayDiff = ${dayDiff} & MaxDurationAllowed = ${stepSelected.mdid}`);
    LOG.info(`Reject logged record : ${JSON.stringify(l1wi)}`);
    LOG.info(`Reject probable stepSelected record : ${JSON.stringify(stepSelected)}`);
    LOG.info(`Notify probable stepSelected Email : ${JSON.stringify(l1wi.to_email_id)}`);
    LOG.info(`Notify probable Secratery Email : ${JSON.stringify(secEmail)}`);
    //  TODO:- Reject the application with id = l1wi.app_id
    await rejectHandler(l1wi.app_id);
    email.sendSimpleMailWithCC(l1wi.to_email_id, secEmail,'Application Rejected!','Dear Sir/Madam, \nThis is to inform you that application with id ' + l1wi.app_id + ' is auto rejected. \n\nThis is a system auto generated email. \n Admin\n Water Resource Management System.');
  }else{
    LOG.info(`Notification/Rejection not applicable : dayDiff = ${dayDiff} & MaxDurationAllowed = ${stepSelected.mdid}`);
  }
  return dayDiff;
}//end of addToNotifyOrRejectList

async function jobHandler() {
    LOG.info('running jobHandler...');

    await poolConnect;
    const request = cpool.request();
    let secEmail;
    let S1W =  await request.query(`select email from mst_users where id=9`);
    if(S1W != null & S1W.recordset.length > 0 ){
      secEmail = _.map(S1W.recordset, 'email');
    }
    let wfIds;
    let L1W =  await request.query(`select er.app_id, CONVERT(datetime, er.log_date, 101) as log_date, er.wf_id, er.wf_step_id, er.wf_step_transition_id, er.from_id, er.to_id, usr.mobile as to_mobile_no, usr.email as to_email_id, usr.role_name as to_id_user_type, er.created_on, er.transition_desc, er.status_id from(
      select wel.app_id, wel.log_date, wel.wf_id, wel.wf_step_id, wel.wf_step_transition_id, wel.from_id, wel.to_id, wel.created_on, wst.transition_desc,wel.status_id from (
          select *
          from (
        select *
          from (
              select distinct obj_id as app_id, max(created_on) as log_date
              from [jform].[dbo].[workflow_execution_log ] group by obj_id
          ) as x inner join [jform].[dbo].[workflow_execution_log ] as f on  f.obj_id = x.app_id and f.created_on = x.log_date) as t
        inner join (select app.id as appp_id,app.status_id as status_id from application_details as app) as ap on ap.appp_id = t.app_id
      ) as wel
      inner join [jform].[dbo].[workflow_step_transitions] as wst on wel.wf_step_transition_id = wst.id and RTRIM(LTRIM((UPPER(wst.transition_desc)))) not in ('REJECT') --order by wel.app_id, ISSUE_ALLOCATION_ORDER
      ) as er
      inner join (select u.id, u.mobile, u.email, r.role_name from [jform].[dbo].[mst_users] as u inner join [jform].[dbo].[mst_roles] as r on u.role_id = r.id) as usr on usr.id = er.to_id 
      where er.status_id = 3 order by er.app_id`);

    if(L1W != null & L1W.recordset.length > 0 ){
      LOG.info(`Total number of records eligible for validation : ${L1W.recordset.length}`);
      // console.log(`${JSON.stringify(L1W.recordset[0])}`);
      //find distinct available workflows in all the eligible records
      wfIds = _.map(L1W.recordset, 'wf_id');
      if(wfIds != null & wfIds.length > 0){
        wfIds = _.uniq(wfIds);
      }
      LOG.info(`Applicable applications are belonging to Workflow Ids : + ${JSON.stringify(wfIds)}`);
    }

    _.forEach(wfIds, async(wi) =>{
      LOG.info(`Running for workflow id : ${wi}`);
      let L1Wi = _.filter(L1W.recordset, (l1w) => { return l1w.wf_id == wi; });
      LOG.info(`Total records to process in ${wi} = ${L1Wi.length}`);

      let L2Wi;
      var durationRecs = await request.query(`select ws.wf_id, wst.work_flow_step_id as step_id, wst.wf_step_from_id as from_id_or_type, wst.wf_step_to_id as to_id_or_type, wst.transition_type_id, wst.transition_desc, wst.max_duration_in_days as mdid, wst.step_notify_template_id
                        from  [jform].[dbo].[workflow_step_transitions] as wst inner join  [jform].[dbo].[workflow_step ] as ws
                        on wst.work_flow_step_id = ws.id and ws.wf_id= ${wi} and wst.max_duration_in_days != 0 order by wst.work_flow_step_id`);

      if(durationRecs != null & durationRecs.recordset.length > 0){
        L2Wi = durationRecs.recordset;
        LOG.info(`Total duration data available for workflow ${wi} = ${L2Wi.length}`);
      }else{
        return false;
      }

      // Iterate L1Wi
      _.forEach(L1Wi, async(l1wi) =>{
        let stepSelected = null;
        _.forEach(L2Wi, async(l2wi) =>{
          // console.log(`l1wi = ${l1wi} & l2wi = ${l2wi}`);
          if(_.trim(l2wi.from_id_or_type) === '$EE_ID'){
            l2wi.from_id_or_type = 'EXECUTIVE_ENGINEER';
          }else if(_.trim(l2wi.from_id_or_type) === '$CE_ID'){
            l2wi.from_id_or_type = 'CE/BP';
          }
          if(l1wi.to_id === l2wi.from_id_or_type || l1wi.to_id_user_type === l2wi.from_id_or_type){//As sometimes we have exact id & sometimes $Variable
            if(stepSelected == null){
              stepSelected = l2wi;
            }else if(stepSelected.step_id > l2wi.step_id){
              stepSelected = l2wi;
            }
          }

        });
        if(stepSelected != null){
          LOG.info(`Found one timing event for due date verification. It is : ${JSON.stringify(stepSelected)}`)
          //validate Holidays
          LOG.debug(`Validating holidays for from date : ${l1wi.log_date}`);
          await doNotifyOrReject(request, new Date(l1wi.log_date).toISOString().slice(0,10), l1wi, stepSelected,secEmail);
        }
      });
    });
  } 

  async function rejectHandler(appId) {
    if(appId != null & appId != 0){
      LOG.info(`Found one Application for rejection. It is : ${JSON.stringify(appId)}`)
        let result = null;
        result = await Application.update({
          work_flow_step_transiton_type_mst_id: 3,
          status_remarks: 'Rejected',
          status_id: AppConstants.REJECTED
          }, {
          where: {id: appId}
        })
    }
  }

/* function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
} */
