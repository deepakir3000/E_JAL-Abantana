import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BasinService } from '../basin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-basin-create',
  templateUrl: './basin-create.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class BasinCreateComponent implements OnInit {

  public basinForm: FormGroup;
  private pathType = '';
  public operationModType = '';
  public storedOperationDetails;

  constructor(
    private service: BasinService,
    private router: Router,
    private basinActiveRoute: ActivatedRoute,
    private toastr: ToastrClientService,
    private spinner: NgxSpinnerService,
    private basinFB: FormBuilder,
  ) {
    this.createBasinForm();
  }

  ngOnInit() {
    this.basinActiveRoute.url.subscribe(params => {
      this.getModificationType((params[2].path));
    });
  }
  private createBasinForm() {
    this.basinForm = this.basinFB.group({
      id: '',
      status: ['', Validators.compose([Validators.required])],
      basinName: ['', Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
    });
  }

  private getModificationType(params) {
    this.pathType = params;
    console.log(this.pathType);
    if (this.pathType === 'edit') {
      this.operationModType = 'Edit';
      this.setPageData();
    } else {
      this.operationModType = 'Create';
    }
  }
  public setPageData() {
    this.storedOperationDetails = this.service.getData();
    console.log(this.storedOperationDetails);
    this.basinForm.controls.id.patchValue(this.storedOperationDetails.id);
    this.basinForm.controls.basinName.patchValue(this.storedOperationDetails.basin_name);
  }

  public addBasin(data: object) {
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
        this.service.addBasinDetails(data).subscribe(successResponse => {
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
            this.router.navigate(['../'], { relativeTo: this.basinActiveRoute });
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

  public updateBasin(data: object) {
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
        this.service.updateBasinDetails(data).subscribe(successResponse => {
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
            this.router.navigate(['../'], { relativeTo: this.basinActiveRoute });
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
  public submitOperationDetails(data) {
    console.log(data);
    if (this.pathType === 'create') {
      this.addBasin(data);
    } else if (this.pathType === 'edit') {
      this.updateBasin(data);
    }
  }
  public resetButton() {
    if (this.pathType === 'create') {
      this.createBasinForm();
    } else if (this.pathType === 'edit') {
      this.setPageData();
    }
  }
  enableEdit() {
    this.basinForm.enable();
  }
  backButton() {
    this.router.navigate(['../'], { relativeTo: this.basinActiveRoute });
  }

}
