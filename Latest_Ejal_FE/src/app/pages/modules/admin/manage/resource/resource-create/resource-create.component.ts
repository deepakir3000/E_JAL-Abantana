import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrClientService } from "@app/services/toastr/toastr.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ResourceService } from "./../../../../../../services/admin/resource.service";

@Component({
  selector: "app-resource-create",
  templateUrl: "./resource-create.component.html",
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class ResourceCreateComponent implements OnInit {
  public resourceForm: FormGroup;
  public pathType;
  public getStoredDetails;
  public parentResource = [];
  public isSubmenu = false;
  constructor(
    private router: Router,
    private resourceActiveRoute: ActivatedRoute,
    private resourceFB: FormBuilder,
    private resourceService: ResourceService,
    private toastr: ToastrClientService
  ) {
    this.createResourceForm();
  }

  ngOnInit() {
    this.resourceActiveRoute.url.subscribe(params => {
      // console.log(params[2].path);
      this.getPathType(params[2].path);
    });
  }
  public createResourceForm() {
    this.resourceForm = this.resourceFB.group({
      id: '',
      resourceName: ['', Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
      linkText: ['', Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
      resourceDescription: ['', Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
      sub_menu: "",
      seq_order:['', Validators.compose([Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
      status: ["", Validators.required]
    });
  }
  public createResourceDetails(data) {
    console.log(data);
    if (this.pathType === "create") {
      this.resourceService.createResourceDetails(data).subscribe(successResponse => {
          if (successResponse !== null) {
            this.toastr.successToastr(successResponse["message"]);
            this.router.navigate(["../"], { relativeTo: this.resourceActiveRoute });
          } else {
            this.toastr.dangerToastr("Something went wrong..!!");
          }
        },errorResponse=>{
          this.toastr.dangerToastr(errorResponse['error'].message);
        });
    }else if(this.pathType === 'edit'){
      this.resourceService.editResourceDetails(data).subscribe(successResponse => {
        if (successResponse !== null) {
          this.toastr.successToastr(successResponse["message"]);
          this.router.navigate(["../"], { relativeTo: this.resourceActiveRoute });
        } else {
          this.toastr.dangerToastr("Something went wrong..!!");
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
  public isSubmenuChanged(event){
    // console.log(event);
    this.isSubmenu = !this.isSubmenu;
    if(event.target.checked === true){
      this.getParentResourceDetails();
    }
  }
  public getParentResourceDetails(){
    this.resourceService.getParentResource().subscribe(response=>{
      // console.log(response);
      if(typeof response !== null){
        this.parentResource = response['data'];
      }
    })
  }
  public setPageData(){
    this.getStoredDetails = this.resourceService.setStoredData();
    this.isSubmenu = true
    console.log(this.getStoredDetails);
    this.resourceForm.controls.resourceName.patchValue(this.getStoredDetails.resource_name);
    this.resourceForm.controls.linkText.patchValue(this.getStoredDetails.link_text)
    this.resourceForm.controls.resourceDescription.patchValue(this.getStoredDetails.resource_description)
    this.resourceForm.controls.status.patchValue(this.getStoredDetails.status);
    this.resourceForm.controls.id.patchValue(this.getStoredDetails.id);
    this.resourceForm.disable();
    // this.resourceForm.patchValue(this.getStoredDetails);
  }
  public enableEdit(){
    this.resourceForm.enable();
  }
  public roleFormReset(){
    if(this.pathType === 'edit'){
      this.setPageData();
    }else{
      this.resourceForm.controls.resourceName.patchValue(this.getStoredDetails.resource_name);
      this.resourceForm.controls.linkText.patchValue(this.getStoredDetails.link_text)
      this.resourceForm.controls.resourceDescription.patchValue(this.getStoredDetails.resource_description)
      this.resourceForm.controls.id.patchValue(this.getStoredDetails.id);  
    }
  }
  backButton() {
    this.router.navigate(["../"], { relativeTo: this.resourceActiveRoute });
  }
}
