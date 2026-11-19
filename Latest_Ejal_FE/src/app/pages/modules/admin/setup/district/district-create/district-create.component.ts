import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { District, State } from '../../block/block.model';
import { PaginationModel } from '@app/model/pagination-model';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DistrictService } from '../district.service';
import { StateService } from '../../state/state.service';
import { CommonService } from '@app/services/common/common.service';
import { nameValidator, comboboxValidator } from '@app/validators/custom.validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-district-create',
  templateUrl: './district-create.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
  providers: []
})
export class DistrictCreateComponent implements OnInit {

  public districtForm: FormGroup;
    // district details
    public district;
    public id;
    // district details
    // public status: Status[];
    // show state details in data
    public state;
    // used for pagination object
    private districtPaginationObj: PaginationModel;
    public districtModType = '';
    // Routing path name
    public pathType = '';
    // Stored district details
    private storedDistrictDetails;


    constructor(
        private districtFB: FormBuilder, // FormBuilder Instance
        private router: Router, // Router Instance
        private toastr: ToastrClientService, // toastr instance
        private districtActiveRoute: ActivatedRoute, // Active Router Instance
        private spinner: NgxSpinnerService, // Spinner Service Instance
        private districtService: DistrictService, // district Instance
        private stateService: StateService, // district Instance
        // private error: ErrorResponseService, // error response Instance
        private commonService: CommonService // common service instance
    ) {
        this.createDistrictForm(); // Used to district form instance
    }

    ngOnInit() {
        this.getStateDetails();
        this.districtActiveRoute.url.subscribe(params => {
            this.getModificationType((params[2].path));
        });
    }
    private createDistrictForm() {
        this.districtForm = this.districtFB.group({
            districtId:'',
            districtName: ['', Validators.compose([Validators.required, nameValidator])],
            stateId: ['', Validators.compose([Validators.required, comboboxValidator])],
        });
    }
    private getModificationType(params) {
        this.pathType = params;
        console.log(this.pathType);
        if(this.pathType === 'edit'){
            this.districtModType = 'Edit';
          this.setPageData();
        }else{
            this.districtModType = 'Create';
        }
    }
    public setPageData(){
        this.storedDistrictDetails = this.districtService.getdata();
        console.log(this.storedDistrictDetails);
        this.districtForm.controls.districtId.patchValue(this.storedDistrictDetails.id);
        this.districtForm.controls.districtName.patchValue(this.storedDistrictDetails.district_name);
        this.districtForm.controls.stateName.patchValue(this.storedDistrictDetails.state_id)
        this.districtForm.disable();
        // this.resourceForm.patchValue(this.getStoredDetails);
      }
    
    private getStateDetails() {
        this.spinner.show();
        this.districtPaginationObj = {
            isActiveDataRequired: false,
            isPaginationRequired: false,
            isOrderRequired: false,
            isAscending: false,
            pageNumber: 0,
            pageSize: 0,
            orderField: 'id'
        };
        this.stateService.getAllStateDetails(this.districtPaginationObj).subscribe(successResponse => {
            this.spinner.hide();
            if (successResponse !== null) {
                this.spinner.hide();
                console.log(successResponse);
                this.state = successResponse['data'];
                console.log('All State List:----', this.state);
            } else {
                this.state = [];
                this.spinner.hide();
            }

        }, errorResponse => {
            this.spinner.hide();
            // this.error.showMessage(errorResponse);
        });
    }

    public addDistrict(data: object) {
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
                this.districtService.addDistrictDetails(data).subscribe(successResponse => {
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
                        this.router.navigate(['../'], { relativeTo: this.districtActiveRoute });
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

    public updateDistrict(data: object) {
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
                this.districtService.editDistrictDetails(data).subscribe(successResponse => {
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
                        this.router.navigate(['../'], { relativeTo: this.districtActiveRoute });
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
    submitDistrictDetails(data){
        console.log(data);
        if(this.pathType === 'create'){
            this.addDistrict(data);
        } else if(this.pathType === 'edit'){
            this.updateDistrict(data);
        }
    }
    backButton() {
        this.router.navigate(['../'], { relativeTo: this.districtActiveRoute });
    }
    public resetButton() {
        if (this.pathType === 'create') {
            this.createDistrictForm();   
        } else if (this.pathType === 'edit') {
            this.setPageData();
        }
    }
    enableEdit(){
        this.districtForm.enable();
    }

}
