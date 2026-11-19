import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IndustryTypeService } from '@app/services/admin/industry-type.service';
import Swal from 'sweetalert2';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-industry-type",
  templateUrl: "./industry-type.component.html",
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class IndustryTypeComponent implements OnInit {
  public industryForm:FormGroup;
  private pathType = '';
  public industryModType = '';
  public storedIndustryDetails;
  constructor(
    private industryFB: FormBuilder,
    private router: Router,
    private industryActiveRoute: ActivatedRoute,
    private service:IndustryTypeService,
    private toastr: ToastrClientService,
    private spinner: NgxSpinnerService,
  ) {
    this.createIndusrtyForm();
  }

  ngOnInit() {
    this.industryActiveRoute.url.subscribe(params => {
      this.getModificationType((params[2].path));
  });
  }

  private createIndusrtyForm() {
    this.industryForm = this.industryFB.group({
        id:'',
        industryName: ['', Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
    });
}
private getModificationType(params) {
  this.pathType = params;
  console.log(this.pathType);
  if(this.pathType === 'edit'){
      this.industryModType = 'Edit';
    this.setPageData();
  }else{
      this.industryModType = 'Create';
  }
}
public setPageData(){
  this.storedIndustryDetails = this.service.getdata();
  console.log(this.storedIndustryDetails);
  this.industryForm.controls.id.patchValue(this.storedIndustryDetails.id);
  this.industryForm.controls.industryName.patchValue(this.storedIndustryDetails.industry_name);
}

public addIndustry(data: object) {
  Swal.fire({
      title: 'Are you sure?',
      text: 'You will Save this data!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Submit it!',
      cancelButtonText: 'No, keep it'
  }).then((resultdata) => {
      if (resultdata.value) {

          // this.spinner.show();
          this.service.addIndTypeDetails(data).subscribe(successResponse => {
              if (successResponse !== null) {
                  this.spinner.hide();
                  // console.log('result:----', successResponse);
                  // console.log('statusDesc:-----', successResponse.statusDesc);
                  this.toastr.successToastr(successResponse.message);
                  Swal.fire(
                      'Submit!',
                      'Your Data has been Submittted .',
                      'success'
                  );
                  this.router.navigate(['../'], { relativeTo: this.industryActiveRoute });
              } else {
                  this.spinner.hide();
                  this.toastr.warningToastr('Something went wrong');
              }

          }, errorResponse => {
              this.spinner.hide();
              //  this.error.showMessage(errorResponse);
              // console.log(error);
              Swal.fire(
                  'Cancelled',
                  'Oops... Duplicate Data',
                  'error'

              );
          });
      }
  });
}

public updateIndustry(data: object) {
  Swal.fire({
      title: 'Are you sure?',
      text: 'You will Save this data!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Submit it!',
      cancelButtonText: 'No, keep it'
  }).then((resultdata) => {
      if (resultdata.value) {

          this.spinner.show();
          this.service.updateIndTypeDetails(data).subscribe(successResponse => {
              if (successResponse !== null) {
                  this.spinner.hide();
                  // console.log('result:----', successResponse);
                  // console.log('statusDesc:-----', successResponse.statusDesc);
                  this.toastr.successToastr(successResponse.message);
                  Swal.fire(
                      'Submit!',
                      'Your Data has been Submittted .',
                      'success'
                  );
                  this.router.navigate(['../'], { relativeTo: this.industryActiveRoute });
              } else {
                  this.spinner.hide();
                  this.toastr.warningToastr('Something went wrong');
              }

          }, errorResponse => {
              this.spinner.hide();
              //  this.error.showMessage(errorResponse);
              // console.log(error);
              Swal.fire(
                  'Cancelled',
                  'Oops... Duplicate Data',
                  'error'

              );
          });
      }
  });
}
public submitIndustryDetails(data){
  console.log(data);
  if(this.pathType === 'create'){
      this.addIndustry(data);
  }else if(this.pathType === 'edit'){
      this.updateIndustry(data);
  }
}
public resetButton() {
  if (this.pathType === 'create') {
      this.createIndusrtyForm();   
  } else if (this.pathType === 'edit') {
      this.setPageData();
  }
}
enableEdit(){
  this.industryForm.enable();
}
  backButton() {
    this.router.navigate(["../"], { relativeTo: this.industryActiveRoute });
  }
}
