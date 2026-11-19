import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PurposeService } from '../purpose.service';
import Swal from 'sweetalert2';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-purpose-create',
  templateUrl: './purpose-create.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class PurposeCreateComponent implements OnInit {

  public purposeForm: FormGroup;
  private pathType = '';
  public industryModType = '';
  public storedPurposeDetails;
  constructor(
    private purposeFB: FormBuilder,
    private router: Router,
    private PurposeActiveRoute: ActivatedRoute,
    private service: PurposeService,
    private toastr: ToastrClientService,
    private spinner: NgxSpinnerService,
  ) {
    this.createPurposeForm();
   }

  ngOnInit() {

    this.PurposeActiveRoute.url.subscribe(params => {
      this.getModificationType((params[2].path));
  });
  }
  private createPurposeForm() {
    this.purposeForm = this.purposeFB.group({
      id: '',
      purposeName: ['', Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
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
    this.storedPurposeDetails = this.service.getData();
    console.log(this.storedPurposeDetails);
    this.purposeForm.controls.id.patchValue(this.storedPurposeDetails.id);
    this.purposeForm.controls.purposeName.patchValue(this.storedPurposeDetails.purpose_name);
  }
  public addPurpose(data: object) {
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
            this.service.addPurposeDetails(data).subscribe(successResponse => {
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
                    this.router.navigate(['../'], { relativeTo: this.PurposeActiveRoute });
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
  
  public updatePurpose(data: object) {
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
            this.service.updatePurposeDetails(data).subscribe(successResponse => {
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
                    this.router.navigate(['../'], { relativeTo: this.PurposeActiveRoute });
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
  public submitpurposeDetails(data){
    console.log(data);
    if(this.pathType === 'create'){
        this.addPurpose(data);
    }else if(this.pathType === 'edit'){
        this.updatePurpose(data);
    }
  }
  public resetButton() {
    if (this.pathType === 'create') {
        this.createPurposeForm();   
    } else if (this.pathType === 'edit') {
        this.setPageData();
    }
  }
  enableEdit(){
    this.purposeForm.enable();
  }
  
  backButton() {
    this.router.navigate(["../"], { relativeTo: this.PurposeActiveRoute });
  }
}
