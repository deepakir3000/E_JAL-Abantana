import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Block, State, District } from '../block.model';
import { PaginationModel } from '@app/model/pagination-model';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockService } from '../block.service';
import { CommonService } from '@app/services/common/common.service';
import { nameValidator, comboboxValidator } from '@app/validators/custom.validators';
import { DistrictService } from '../../district/district.service';
import { StateService } from '../../state/state.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-block-create',
  templateUrl: './block-create.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
  providers: []
})
export class BlockCreateComponent implements OnInit {

   public blockForm: FormGroup; // block form group
    public block: Block; // Block details
    public state = [];
    public district = [];
    // public status: Status[];
    // used for pagination object
    private statePaginationModel: PaginationModel;
    public blockModType = '';
    // Routing path name
    private pathType = '';
    // Stored block details
    private storedBlockDetails;

    constructor(
        private userFB: FormBuilder, // FormBuilder Instance
        private router: Router, // Router Instance
        private toastr: ToastrClientService, // toastr instance
        private blockActiveRoute: ActivatedRoute, // Active Router Instance
        private spinner: NgxSpinnerService, // Spinner Service Instance
        private blockService: BlockService, // Block Instance
        private districtService: DistrictService, // district Instance
        private stateService: StateService,
        // private error: ErrorResponseService, // error response Instance
        private commonService: CommonService,
    ) {
        this.createBlockForm(); // Used to block form instance
    }

    ngOnInit() {
        this.getStateDetails();
        this.getDistrictDetails();
        this.blockActiveRoute.url.subscribe(params => {
            this.getModificationType((params[2].path));
        });
    }
    private createBlockForm() {
        this.blockForm = this.userFB.group({
            blockName: ['', Validators.compose([nameValidator, Validators.required])],
            districtId: ['', Validators.compose([comboboxValidator, Validators.required])],
            stateId: ['', Validators.compose([comboboxValidator, Validators.required])],
            blockId: '0',
        });
    } 
    private getModificationType(params) {
        this.pathType = params;
        console.log(this.pathType);
        if(this.pathType === 'edit'){
            this.blockModType = 'Edit';
          this.setPageData();
        }else{
            this.blockModType = 'Create';
        }
    }
    public setPageData(){
        this.storedBlockDetails = this.blockService.getdata();
        console.log(this.storedBlockDetails);
        this.blockForm.controls.blockId.patchValue(this.storedBlockDetails.id);
        this.blockForm.controls.blockName.patchValue(this.storedBlockDetails.block_name);
        this.blockForm.controls.districtId.patchValue(this.storedBlockDetails.district_id);
        this.blockForm.controls.stateId.patchValue(this.storedBlockDetails.state_id);
        this.blockForm.disable();
        // this.resourceForm.patchValue(this.getStoredDetails);
      }
      private getStateDetails() {
        this.spinner.show();
        this.statePaginationModel = {
            isActiveDataRequired: false,
            isPaginationRequired: false,
            isOrderRequired: false,
            isAscending: false,
            pageNumber: 0,
            pageSize: 0,
            orderField: 'id'
        };
        this.stateService.getAllStateDetails(this.statePaginationModel).subscribe(successResponse => {
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
    private getDistrictDetails() {
        this.spinner.show();
        this.statePaginationModel = {
            isActiveDataRequired: false,
            isPaginationRequired: false,
            isOrderRequired: false,
            isAscending: false,
            pageNumber: 0,
            pageSize: 0,
            orderField: 'id'
        };
        this.districtService.getAllDistrictDetails(this.statePaginationModel).subscribe(successResponse => {
            this.spinner.hide();
            if (successResponse !== null) {
                this.spinner.hide();
                console.log(successResponse);
                this.district = successResponse['data'];
                console.log('All District List:----', this.district);
            } else {
                this.district = [];
                this.spinner.hide();
            }

        }, errorResponse => {
            this.spinner.hide();
            // this.error.showMessage(errorResponse);
        });
    }
    public addBlock(data: object) {
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
                this.blockService.addBlockDetails(data).subscribe(successResponse => {
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
                        this.router.navigate(['../'], { relativeTo: this.blockActiveRoute });
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

    public updateBlock(data: object) {
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
                this.blockService.editBlockDetails(data).subscribe(successResponse => {
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
                        this.router.navigate(['../'], { relativeTo: this.blockActiveRoute });
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
    public submitBlockDetails(data){
        console.log(data);
        if(this.pathType === 'create'){
            this.addBlock(data);
        }else if(this.pathType === 'edit'){
            this.updateBlock(data);
        }
    }
    public resetButton() {
        if (this.pathType === 'create') {
            this.createBlockForm();   
        } else if (this.pathType === 'edit') {
            this.setPageData();
        }
    }
    enableEdit(){
        this.blockForm.enable();
    }
    backButton() {
        this.router.navigate(['../'], { relativeTo: this.blockActiveRoute });
    }
}
