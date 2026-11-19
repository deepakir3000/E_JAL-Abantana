import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperationalSourceService } from '../operational-source.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-operational-create',
  templateUrl: './operational-create.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class OperationalCreateComponent implements OnInit {

  public operationalForm: FormGroup;
  private pathType = '';
  public operationModType = '';
  public storedOperationDetails;
  constructor(
    private router: Router,
    private operationalActiveRoute: ActivatedRoute,
    private toastr: ToastrClientService,
    private spinner: NgxSpinnerService,
    private operationalFB: FormBuilder,
    private service: OperationalSourceService
  ) {
    this.createOperationForm();
   }

  ngOnInit() {
    this.operationalActiveRoute.url.subscribe(params => {
      this.getModificationType((params[2].path));
    });
  }
  private createOperationForm() {
    this.operationalForm = this.operationalFB.group({
      id: '',
      operationalSource: ['', Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
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
    this.operationalForm.controls.id.patchValue(this.storedOperationDetails.id);
    this.operationalForm.controls.operationalSource.patchValue(this.storedOperationDetails.operational_source);
  }
  public addOperation(data: object) {
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
            this.service.addOperationalSourceDetails(data).subscribe(successResponse => {
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
                    this.router.navigate(['../'], { relativeTo: this.operationalActiveRoute });
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
  
  public updateOperation(data: object) {
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
            this.service.updateOperationalSourceDetails(data).subscribe(successResponse => {
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
                    this.router.navigate(['../'], { relativeTo: this.operationalActiveRoute });
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
        this.addOperation(data);
    }else if(this.pathType === 'edit'){
        this.updateOperation(data);
    }
  }
  public resetButton() {
    if (this.pathType === 'create') {
        this.createOperationForm();   
    } else if (this.pathType === 'edit') {
        this.setPageData();
    }
  }
  enableEdit(){
    this.operationalForm.enable();
  }
  backButton() {
    this.router.navigate(["../"], { relativeTo: this.operationalActiveRoute });
  }
}
