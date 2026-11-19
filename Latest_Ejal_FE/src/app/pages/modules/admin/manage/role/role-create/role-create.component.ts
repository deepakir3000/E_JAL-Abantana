import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators}from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService} from '../../../../../../services/admin/role.service';
import { ToastrClientService } from '@app/services/toastr/toastr.service';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class RoleCreateComponent implements OnInit {

  public roleFormGroup: FormGroup;
  public pathType;
  public getStoredDetails;
  constructor(
    private router: Router,
    private roleActiveRoute: ActivatedRoute,
    private roleFB: FormBuilder,
    private userService: UserService,
    private toastr: ToastrClientService
  ) { 
    this.createRoleForm();
  }

  ngOnInit() {
    this.roleActiveRoute.url.subscribe(params => {
      this.getPathType(params[2].path);
    });

  }
  /*Role Form*/
  public createRoleForm(){
    this.roleFormGroup = this.roleFB.group({
      id: '',
      roleName: ['', Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
      status: ['', Validators.required]
    })
  }
  public createRoleDeatils(data){
    // console.log(data);
    if (this.pathType === "create") {
      this.userService.createRoleDeatils(data).subscribe(successResponse=>{
        // console.log(successResponse);
        if(successResponse !== null || successResponse['status'] === 'SUCCESS'){
          this.toastr.successToastr(successResponse['message']);
          // this.router.navigate(["../"], { relativeTo: this.roleActiveRoute });
        }else{
          this.toastr.dangerToastr('Somthing went wrong, Chekc the data you provided');
        }
      });
    }else if(this.pathType === 'edit'){
      this.userService.editRoleDetails(data).subscribe(successResponse=>{
        // console.log(successResponse);
        if(successResponse !== null || successResponse['status'] === 'SUCCESS'){
          this.toastr.successToastr(successResponse['message']);
          this.router.navigate(["../"], { relativeTo: this.roleActiveRoute });
        }else{
          this.toastr.dangerToastr('Somthing went wrong, Chekc the data you provided');
        }
      });
    }
  }
  public getPathType(params) {
    this.pathType = params;
    if(this.pathType === 'edit'){
      this.setPageData();
    }
    // console.log('PATHTYPE====>',this.pathType);
  }
  public setPageData(){
    this.getStoredDetails = this.userService.getdata();
    console.log('=========>',this.getStoredDetails);
    this.roleFormGroup.controls.id.patchValue(this.getStoredDetails.id);
    this.roleFormGroup.controls.roleName.patchValue(this.getStoredDetails.role_name);
    this.roleFormGroup.controls.status.patchValue(this.getStoredDetails.status);
    this.roleFormGroup.disable();
  }
  public enableEdit(){
    this.roleFormGroup.enable();
    this.roleFormGroup.controls.id.disable();
  }
  public roleFormReset(){
    if(this.pathType === 'edit'){
      this.setPageData();
    }else{
      this.roleFormGroup.controls.id.reset();
      this.roleFormGroup.controls.role_name.reset();  
    }
  }
  backButton() {
    this.router.navigate(["../"], { relativeTo: this.roleActiveRoute });
  }
}
