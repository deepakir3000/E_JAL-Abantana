import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class FeedbackCreateComponent implements OnInit {
  public feedbackForm: FormGroup;
  private pathType = '';
  public operationModType = '';
  public storedOperationDetails;

  constructor(
    private service: FeedbackService,
    private router: Router,
    private feedbackActiveRoute: ActivatedRoute,
    private toastr: ToastrClientService,
    private spinner: NgxSpinnerService,
    private riverFB: FormBuilder,
  ) { 
    this.createFeedbackForm();
  }

  ngOnInit() {
    this.feedbackActiveRoute.url.subscribe(params => {
      this.getModificationType((params[2].path));
    });
  }
  private createFeedbackForm() {
    this.feedbackForm = this.riverFB.group({
      id: 0,
      feedbackQuestion: ['', Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/)])]
    });
  }
  private getModificationType(params) {
    this.pathType = params;
    console.log(this.pathType);
    if(this.pathType === 'edit'){
        this.operationModType = 'Edit';
      this.setPageData();
    }else{
        this.operationModType = 'Create';
    }
  }
  public setPageData(){
    this.storedOperationDetails = this.service.getData();
    console.log(this.storedOperationDetails);
    this.feedbackForm.controls.id.patchValue(this.storedOperationDetails.id);
    this.feedbackForm.controls.feedbackQuestion.patchValue(this.storedOperationDetails.feedback__questions);
  }
  public addQuestion(data: object) {
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
            this.service.addfeedbackQuestion(data).subscribe(successResponse => {
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
                    this.router.navigate(['../'], { relativeTo: this.feedbackActiveRoute });
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
  public updateRiver(data: object) {
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
            this.service.addfeedbackQuestion(data).subscribe(successResponse => {
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
                    this.router.navigate(['../'], { relativeTo: this.feedbackActiveRoute });
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
  public submitOperationDetails(data){
    console.log(data);
    if(this.pathType === 'create'){
        this.addQuestion(data);
    }else if(this.pathType === 'edit'){
        this.updateRiver(data);
    }
  }
  
  public resetButton() {
    this.feedbackForm.reset();
    if (this.pathType === 'create') {
        this.createFeedbackForm();   
    } else if (this.pathType === 'edit') {
        this.setPageData();
    }
  }
  backButton() {
    this.router.navigate(["../"], { relativeTo: this.feedbackActiveRoute });
  }

}
