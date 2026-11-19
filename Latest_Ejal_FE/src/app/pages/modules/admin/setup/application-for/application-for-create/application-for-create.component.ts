import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApplicationForService } from '../application-for.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-application-for-create',
  templateUrl: './application-for-create.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class ApplicationForCreateComponent implements OnInit {

  public applicationForm: FormGroup;
  private pathType = '';
  public applicationModType = '';
  public storedApplicationDetails;
  constructor(
    private router: Router,
    private applicationActiveRoute: ActivatedRoute,
    private toastr: ToastrClientService,
    private spinner: NgxSpinnerService,
    private applicationFB: FormBuilder,
    private service: ApplicationForService
  ) {
    this.createApplicationForm();
   }

  ngOnInit() {
    this.applicationActiveRoute.url.subscribe(params => {
      this.getModificationType((params[2].path));
    });
  }
  private createApplicationForm() {
    this.applicationForm = this.applicationFB.group({
      id: '',
      applicationType: ['', Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
    });
  }
  private getModificationType(params) {
    this.pathType = params;
    console.log(this.pathType);
    if(this.pathType === 'edit'){
        this.applicationModType = 'Edit';
      this.setPageData();
    }else{
        this.applicationModType = 'Create';
    }
  }
  public setPageData(){
    this.storedApplicationDetails = this.service.getData();
    console.log(this.storedApplicationDetails);
    this.applicationForm.controls.id.patchValue(this.storedApplicationDetails.id);
    this.applicationForm.controls.applicationType.patchValue(this.storedApplicationDetails.application_type);
  }
  public addApplication(data: object) {
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
            this.service.addApplicaitonTypeDetails(data).subscribe(successResponse => {
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
                    this.router.navigate(['../'], { relativeTo: this.applicationActiveRoute });
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
  
  public updateApplication(data: object) {
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
            this.service.updateApplicaitonTypeDetails(data).subscribe(successResponse => {
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
                    this.router.navigate(['../'], { relativeTo: this.applicationActiveRoute });
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
  public submitApplicationDetails(data){
    console.log(data);
    if(this.pathType === 'create'){
        this.addApplication(data);
    }else if(this.pathType === 'edit'){
        this.updateApplication(data);
    }
  }
  public resetButton() {
    if (this.pathType === 'create') {
        this.createApplicationForm();   
    } else if (this.pathType === 'edit') {
        this.setPageData();
    }
  }
  enableEdit(){
    this.applicationForm.enable();
  }
  backButton() {
    this.router.navigate(["../"], { relativeTo: this.applicationActiveRoute });
  }
}
