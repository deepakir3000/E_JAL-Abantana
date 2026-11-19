import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { nameValidator } from '@app/validators/custom.validators';
import {StateService} from './../state.service'
import { ToastrClientService } from '@app/services/toastr/toastr.service';

@Component({
  selector: "app-state-create",
  templateUrl: "./state-create.component.html",
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class StateCreateComponent implements OnInit {
  public stateForm: FormGroup;
  public pathType;
  public getStoredDetails;
  public parentResource = [];
  constructor(
    private router: Router,
    private stateActiveRoute: ActivatedRoute,
    private stateFB: FormBuilder,
    private service:StateService,
    private toastr: ToastrClientService
  ) {
    this.createStateForm();
  }

  ngOnInit() {
    this.stateActiveRoute.url.subscribe(params => {
      // console.log(params[2].path);
      this.getPathType(params[2].path);
    });
  }

  private createStateForm() {
    this.stateForm = this.stateFB.group({
        id:'',
        stateName: ['', Validators.compose([Validators.required, nameValidator, Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
    });
}
public createState(data){
  if (this.pathType === "create") {
    this.service.addStateDetails(data).subscribe(response=>{
      // console.log(response);
      if (response !== null) {
        this.toastr.successToastr(response["message"]);
        this.router.navigate(["../"], { relativeTo: this.stateActiveRoute });
      } else {
        this.toastr.dangerToastr("Something went wrong..!!");
      }
    })
  }else if (this.pathType === "edit") {
    this.service.editStateDetails(data).subscribe(response=>{
      // console.log(response);
      if (response !== null) {
        this.toastr.successToastr(response["message"]);
        this.router.navigate(["../"], { relativeTo: this.stateActiveRoute });
      } else {
        this.toastr.dangerToastr("Something went wrong..!!");
      }
    })
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
  this.getStoredDetails = this.service.setStoredData();
  console.log(this.getStoredDetails);
  this.stateForm.controls.id.patchValue(this.getStoredDetails.id);
  this.stateForm.controls.stateName.patchValue(this.getStoredDetails.state_name);
  this.stateForm.disable();
  // this.resourceForm.patchValue(this.getStoredDetails);
}
public enableEdit(){
  this.stateForm.enable();
}
public roleFormReset(){
  this.stateForm.reset();
  if(this.pathType === 'edit'){
    this.setPageData();
  }else{
    this.stateForm.controls.stateName.patchValue(this.getStoredDetails.state_name);
  }
}
  backButton() {
    this.router.navigate(["../"], { relativeTo: this.stateActiveRoute });
  }
}
