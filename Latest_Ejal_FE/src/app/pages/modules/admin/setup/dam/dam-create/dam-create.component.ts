import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PaginationModel } from '@app/model/pagination-model';
import { DamService } from '../dam.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dam-create',
  templateUrl: './dam-create.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class DamCreateComponent implements OnInit {

  public damForm: FormGroup;
  private pathType = '';
  public operationModType = '';
  public storedOperationDetails;
  
  public basinList=[];
  private basinPaginationObj: PaginationModel;
  public basinPageNo = 0;
  public basinPageSize = 10;
  public basinTotalElements = 0;
  public selectedPageSize = 10;

  constructor(
    private service: DamService,
    private router: Router,
    private damActiveRoute: ActivatedRoute,
    private toastr: ToastrClientService,
    private spinner: NgxSpinnerService,
    private damFB: FormBuilder,
  ) { 
    this.createRiverForm();
  }

  ngOnInit() {
    this.setPageDetails(0,1)
    this.damActiveRoute.url.subscribe(params => {
      this.getModificationType((params[2].path));
    });
  }
  private createRiverForm() {
    this.damForm = this.damFB.group({
      id: '',
      basinId:['', Validators.compose([Validators.required])],
      damName: ['', Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
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
    this.damForm.controls.id.patchValue(this.storedOperationDetails.id);
    this.damForm.controls.damName.patchValue(this.storedOperationDetails.dam_name);
    this.damForm.controls.basinId.patchValue(this.storedOperationDetails.basin_id);
  }

  public addDam(data: object) {
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
            this.service.addDamDetails(data).subscribe(successResponse => {
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
                    this.router.navigate(['../'], { relativeTo: this.damActiveRoute });
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
  
  public updateDam(data: object) {
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
            this.service.updateDamDetails(data).subscribe(successResponse => {
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
                    this.router.navigate(['../'], { relativeTo: this.damActiveRoute });
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
        this.addDam(data);
    }else if(this.pathType === 'edit'){
        this.updateDam(data);
    }
  }
  public resetButton() {
    if (this.pathType === 'create') {
        this.createRiverForm();   
    } else if (this.pathType === 'edit') {
        this.setPageData();
    }
  }
  enableEdit(){
    this.damForm.enable();
  }

  public setPageDetails(currentPage, pageNoToGo: any) {
    // console.log(currentPage, pageNoToGo);
    this.basinPageNo = pageNoToGo;
    this.basinPaginationObj = {
        isActiveDataRequired: false,
        isPaginationRequired: true,
        isOrderRequired: false,
        isAscending: false,
        pageNumber: this.basinPageNo - 1,
        pageSize: this.basinPageSize,
        orderField: 'id'
    };
    this.getAllbasin(this.basinPaginationObj);
  }

  public getAllbasin(data){
    this.service.getAllBasinDetails(data).subscribe(response =>{
      this.basinList = response['data']
    })
  }
  backButton() {
    this.router.navigate(["../"], { relativeTo: this.damActiveRoute });
  }

}
