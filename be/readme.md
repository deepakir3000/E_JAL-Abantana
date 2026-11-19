<!--
Important:- Please remove the TODO comments once implemented. Easy to track.

TODO:- Completed
- Do not user application.properties file. Add the all the properties in config.json file and where you want to use the properties just use process.env.{KEY}
Because, in this way we can manage the environment wise different value. Also it helps during distribution of the code.

Also could you please check why http://203.193.144.93:8080/waterResource/index.html#/login is not running??????






#######################################
Completed
user:
user_id
role_id //default role while user login

TODO:- 1 create below table
user_roles:
user_id
role_id

TODO:- 2 Completed
while login below data should be added to jwt token in user.js generateAuthToken method. Added TODO there.
Earlier : {user_id : this.id, access}

Now :
{
	user_id : this.id,
	access : 'auth'
	role_access : {
		1:'admin',
		2:user',
		default: '2' //from user table  
		etc..}//should be retrieve from user_roles table

}

TODO:- 3 Completed
All the post login request, We have to use another middleware to get the roles from the token and authorize the access for the requested api.
Ex:-
  router.route('/someRoute').get(authenticate, permit('user','admin') someApi.controllerMethod);

TODO:- Insert Query workflow

insert into application_type_mst(id,application_type_id,name,application_type_desc,created_by,created_on,updated_by,updated_on)
values(3,1,1250,'CGW_UPTO_1250_KLD',1,GETDATE(),1,GETDATE())

1-insert into workflow values(3,'CGW_UPTO_1250_KLD_APPLICATION_FLOW','CGW_UPTO_1250_KLD_APPLICATION_FLOW',1,1,GETDATE(),1,GETDATE())

2-insert into workflow_type_mst  values
(2,'ALLOCATION_ORDER_FLOW','ALLOCATION_ORDER_FLOW',1,GETDATE(),1,GETDATE())

3- insert into workflow_step  values(1,'EXECUTIVE_ENGINEER_VERIFICATION','EXECUTIVE_ENGINEER_VERIFICATION',1,1,'false',1,'false','false','false',1,GETDATE(),1,GETDATE())

 insert into workflow_step_transition_type_mst values(1,'approved','step is for approval process',1,GETDATE(),1,GETDATE())

  insert into workflow_step_transitions values(10,4,'false',10,9,1,'ISSUE_ALLOCATION_ORDER',21,21,null,null,1,GETDATE(),1,GETDATE(),'true')

  
  insert into [mst_holidays] values(2,1,'Subash Chandra Bose Jayanti/ Vir Surendrasai Jayanti','2020-01-23','Magha-03','Thursday',1,1,GETDATE(),1,GETDATE())

 -->

 
