import { Component, OnInit, ViewEncapsulation, Input, SimpleChanges } from '@angular/core';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { element } from 'protractor';
import { NextStepActionTakenService } from '@app/services/admin/next-step-action-taken.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonService } from '@app/services/common/common.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
    selector: 'app-proposal-approval',
    templateUrl: './proposal-approval.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.None
})
export class ProposalApprovalComponent implements OnInit {
    // public proposalDtls = [
    //     { ques: 'Applicant Details', ans: 'Yes' },
    //     { ques: 'Industry Details', ans: 'Yes' },
    //     { ques: 'Capacity Details', ans: 'Yes' },
    //     { ques: 'Location Details', ans: 'Yes' },
    //     { ques: 'Requisition water Details', ans: 'Yes' },
    //     { ques: 'Phase wise requirement Details', ans: 'Yes' },
    //     { ques: 'Water management plan Details', ans: 'Yes' },
    //     { ques: 'Enclosure Details', ans: 'Yes' },
    //     { ques: 'Payment completed', ans: 'Yes' },
    // ];
    public appSts1Check = 'Y';
    public appSts1 = false;
    public appSts2Check = 'N';
    public appSts2 = false;
    public appSts3Check = 'N';
    public appSts3 = false;
    public stepCounter = 6;
    public currentStep = 1;
    public roleID;
    public applicationId;
    public actionDt;
    public actionValue = 0;
    public nextStepData;
    public tranFID: any = [];
    public tranRID: any = [];
    public tranAID: any = [];
    public desc = '';
    public statusDt = 0;
    public SUBMIT_DETAILS;
    public toId = '';
    public isExicutiveEngineer = true;
    public type = null;
    public industId = '0';
    public file = null;
    public fileName = '';
    public step;
    public step1;
    public applicationType;
    public date = new Date();
    public actionDate = '';
    constructor(
        private toastr: ToastrClientService,
        private activatedRoute: ActivatedRoute,
        private service: NextStepActionTakenService,
        private router: Router, // Router Instance
        private commonService: CommonService,
        private spinner: NgxSpinnerService,
    ) { }

    ngOnInit() {
        this.industId = localStorage.getItem('indusId');
        this.applicationId = this.activatedRoute.snapshot.paramMap.get('applId');
        console.log('Application ID:---', this.applicationId);
        this.getNextStepData();
        this.roleID = localStorage.getItem('role_id');
        console.log('*************', this.roleID);
        const CUR_ID = Number(this.roleID) === 4 ? 2 : (Number(this.roleID) === 5 ? 3 : (Number(this.roleID) === 6 ? 4 : (Number(this.roleID) === 7 ? 5 : Number(this.roleID) === 8 ? 6 : 0)));
        this.showSelectedStepDtls(CUR_ID);
    }
    setApproverSts(event) {
        console.log(event.target.value);
        this.appSts1Check = event.target.value;
        if (this.appSts1Check === 'Y') {
            this.appSts1 = false;
        } else {
            this.appSts1 = true;
        }
        console.log(this.appSts1);
    }
    setApproverSts2() {
        if (this.appSts2Check === 'Y') {
            this.appSts2 = true;
        } else {
            this.appSts2 = false;
        }
    }
    setApproverSts3() {
        if (this.appSts3Check === 'Y') {
            this.appSts3 = true;
        } else {
            this.appSts3 = false;
        }
    }
    showSelectedStepDtls(selectedStep) {
        console.log('--------------------------------', selectedStep, this.stepCounter);
        if (selectedStep > this.stepCounter && selectedStep !== 1) {
            this.toastr.warningToastr('Not Allowed');
        } else if (selectedStep === 1 && this.roleID === '2') {
            this.currentStep = selectedStep;
        } else {
            this.currentStep = selectedStep;
        }
        console.log(this.currentStep);
    }
    public getNextStepData() {
        console.log("step 1 hitted");
        
        this.service.getNextStepActionDetails(this.applicationId).subscribe(successResponse => {
            if (successResponse !== null) {
                this.nextStepData = successResponse['data'];
                this.tranFID = this.nextStepData.steps.trans.filter(ele => ele.transition_desc === 'APPROVE');
                this.tranRID = this.nextStepData.steps.trans.filter(ele => ele.transition_desc === 'REJECT');
                this.tranAID = this.nextStepData.steps.trans.filter(ele => ele.transition_desc === 'ISSUE_ALLOCATION_ORDER');
                this.nextStepData = successResponse['data'];
                this.step = this.nextStepData['steps'].isDate;
                this.step1 = this.nextStepData['steps'].step_name;
                this.applicationType = localStorage.getItem('appType');
                console.log('NEXT STEP DATA------------------->', this.nextStepData['steps']);
                console.log(this.tranFID, this.tranRID, this.tranAID);
                if (this.tranAID.length !== 0) {
                    if (this.tranAID[0].wf_step_to_id === '$CZ_ID' || this.tranAID[0].wf_step_to_id === '$EE_ID' || this.tranAID[0].wf_step_to_id === '$CE_ID') {
                        console.log('Comming');
                        if (this.tranAID[0].wf_step_to_id === '$EE_ID') {
                            this.type = 'EE';
                            console.log(this.type, '**************');
                        } else if (this.tranAID[0].wf_step_to_id === '$CE_ID') {
                            this.type = 'CE';
                            console.log(this.type, '**************');
                        }
                        this.isExicutiveEngineer = true;
                        this.getEEDetails();
                    } else {
                        this.isExicutiveEngineer = false;
                    }
                } else if (this.tranFID.length !== 0) {
                    if (this.tranFID[0].wf_step_to_id === '$CZ_ID' || this.tranFID[0].wf_step_to_id === '$EE_ID' || this.tranFID[0].wf_step_to_id === '$CE_ID') {
                        console.log('Comming2');
                        if (this.tranFID[0].wf_step_to_id === '$EE_ID') {
                            this.type = 'EE';
                            console.log(this.type, '**************');
                        } else if (this.tranFID[0].wf_step_to_id === '$CE_ID') {
                            this.type = 'CE';
                            console.log(this.type, '**************');
                        }
                        this.isExicutiveEngineer = true;
                        this.getEEDetails();
                    } else {
                        this.isExicutiveEngineer = false;
                    }
                }
                console.log('*************', this.tranAID.length, this.tranFID.length, this.tranRID.length);
                this.toastr.successToastr(successResponse['message']);
                console.log(successResponse);
                // this.router.navigate(["../"], { relativeTo: this.resourceActiveRoute });
            } else {
                this.toastr.dangerToastr('Something went wrong..!!');
            }
        });
    }
    private getEEDetails() {
        console.log(', this.roleID', typeof (this.roleID));
        if (this.roleID === '5') {
            this.currentStep = 3;
            this.stepCounter = 3;
            this.getEEData();
        } else if (this.roleID === '4') {
            this.currentStep = 2;
            this.stepCounter = 2;
        } else if (this.roleID === '2') {
            this.currentStep = 4;
            this.stepCounter = 4;
        } else if (this.roleID === '7') {
            this.currentStep = 6;
            this.stepCounter = 6;
        }
    }
    public getEEData() {
        console.log('ID', this.industId);
        this.service.getAllEEDetails(this.type, (this.industId === 'null' ? 0 : this.industId)).subscribe(successResponse => {
            if (successResponse !== null) {
                this.actionDt = successResponse['data'];
                // this.toastr.successToastr(successResponse['message']);
                console.log(successResponse);
                // this.router.navigate(["../"], { relativeTo: this.resourceActiveRoute });
            } else {
                this.toastr.dangerToastr('Something went wrong..!!');
            }
        });
    }
    // public getToId(data) {
    //     console.log(data);
    //     this.toId = data.wf_step_to_id;
    // }
    public submitApplicationDetails() {
        const FORM_DATA = new FormData();
        console.log(this.statusDt, this.nextStepData,'dksjlkfjsdlfjsfd');
        console.log(this.nextStepData.steps.trans.filter(ele => ele.id === Number(this.statusDt)), 'hsdgaksdadshd');
        // console.log(typeof this.nextStepData.steps.trans.filter(ele => ele.id === Number(this.statusDt))[0].wf_step_to_id);
        if (this.roleID === '4') {
            console.log('4');
            this.SUBMIT_DETAILS = {
                'appId': Number(this.applicationId),
                'wfId': Number(this.nextStepData.wf_id),
                'stId': Number(this.nextStepData.steps.id),
                'trId': this.statusDt,
                'toId': (typeof this.nextStepData.steps.trans.filter(ele => ele.id === Number(this.statusDt))[0].wf_step_to_id !== 'string') ? Number(this.nextStepData.steps.trans.filter(ele => ele.id === Number(this.statusDt))[0].wf_step_to_id) : this.nextStepData.steps.trans.filter(ele => ele.id === Number(this.statusDt))[0].wf_step_to_id,
                'remarks': this.desc
            };
        } else {
            console.log('Else');
            this.SUBMIT_DETAILS = {
                'appId': Number(this.applicationId),
                'wfId': Number(this.nextStepData.wf_id),
                'stId': Number(this.nextStepData.steps.id),
                'trId': this.appSts2 ? (this.tranFID.length !== 0 ? Number(this.tranFID[0].id) : (this.tranAID.length !== 0 ? Number(this.tranAID[0].id) : null)) : (this.tranRID.length !== 0 ? Number(this.tranRID[0].id) : (this.tranFID.length !== 0 ? Number(this.tranFID[0].id) : null)),
                'toId': this.appSts2 ? (Number(this.actionValue) === 0 ? (this.tranFID.length !== 0 ? this.tranFID[0].wf_step_to_id : (this.tranAID.length !== 0 ? this.tranAID[0].wf_step_to_id : null)) : Number(this.actionValue)) : (this.tranRID.length !== 0 ? Number(this.actionValue) : (this.tranFID.length !== 0 ? this.tranFID[0].wf_step_to_id : null)), // (this.tranRID.length !== 0 ? this.tranRID[0].wf_step_to_id : null)
                'remarks': this.desc
            };
        }
        FORM_DATA.append('appId', (this.SUBMIT_DETAILS.appId));
        FORM_DATA.append('wfId', this.SUBMIT_DETAILS.wfId);
        FORM_DATA.append('stId', this.SUBMIT_DETAILS.stId);
        FORM_DATA.append('trId', this.SUBMIT_DETAILS.trId);
        FORM_DATA.append('toId', this.SUBMIT_DETAILS.toId === 'null' ? null : this.SUBMIT_DETAILS.toId);
        FORM_DATA.append('remarks', this.SUBMIT_DETAILS.remarks);
        const FILE = this.file !== null ?  this.file : null;
        if (this.file !== null) {
            FORM_DATA.append("allocation_order", FILE, FILE.fileName);
          } else {
            FORM_DATA.append("allocation_order", FILE);
          }
        FORM_DATA.append('wacDate', this.actionDate === '' ? null : this.commonService.transformDate(this.actionDate));
        console.log('DATA:----', this.SUBMIT_DETAILS, this.commonService.transformDate(this.actionDate));
        Swal.fire({
            title: 'Are you sure?',
            text: 'Once you confirm, the application will be submitted',
            type: 'warning',
            confirmButtonText: 'Yes, Confirm!',
            cancelButtonText: 'No, Dont Confirm',
            showConfirmButton: true,
            showCancelButton: true
        }).then((result) => {
            this.spinner.show();
            if (result.value) {
                this.service.submitWorkflow(FORM_DATA).subscribe(successResponse => {
                    console.log(successResponse);
                    console.log('DATA:----', this.SUBMIT_DETAILS);
                    if (successResponse !== null) {
                        this.spinner.hide();
                        this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
                        this.toastr.successToastr(successResponse.message);
                    } else {
                        this.toastr.warningToastr('Something went wrong');
                    }
                }, errorResponse => {
                    this.toastr.warningToastr('Something went wrong');
                });
            } else {
                this.spinner.hide();
                Swal.fire(
                    'Cancelled',
                    'Application has not been forwarded',
                    'error');
            }
            // console.log(result)
        });
    }
    fileChange(event) {
        console.log(event);
        if (event.target.files.length > 0) {
            const file = event.target.files[0] as File;
            console.log(file);
            if (file.size <= 4000000) {
                this.file = file;
                this.fileName = file.name.includes(',') ? file.name.replace(',', ' ') : file.name;
            } else {
                this.toastr.warningToastr('File size must be less than 4MB');
            }
        }
    }
    ngOnDestroy(): void {
        localStorage.setItem('indusId', '0');
    }
}
