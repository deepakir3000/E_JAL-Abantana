import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { State } from '../../block/block.model';
import { Country } from '../state.model';
import { PaginationModel, PaginationModel2 } from '@app/model/pagination-model';
import { Subject } from 'rxjs';
import { PAGINATION_LENGTH } from '@app/data/common.data';
import { StorageService } from '@app/services/storage/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { StateService } from '../state.service';
import { CommonService } from '@app/services/common/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '@app/services/authentication/auth.service';
import { nameValidator } from '@app/validators/custom.validators';

@Component({
  selector: 'app-state-view',
  templateUrl: './state-view.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
//   providers:[StateService]
})
export class StateViewComponent implements OnInit {

  
    // show state details in data
    public state = [];
    public id;
    // show country details in data
    public country: Country[];
    // used to get selected state details
    private selectedState: State;
    // used for pagination object
    private statePaginationObj: PaginationModel;
    // Routing path name
    public pathType = '';
    public updateDetails;
    public isUpdate = false;
    public isCreate = false;

    // pagination data controls
    public statePageNo = 0;
    public statePageSize = 10;
    public stateTotalElements = 0;
    // Used for search Division
    public searchStateText: string;
    searchStateText$ = new Subject<string>();
    public isLookUpBackAllowed = false;
    public pageSize = PAGINATION_LENGTH;
    public selectedPageSize = 10;
    public selectedName;
    public selectedstate;
    constructor(
        private appStorage: StorageService,
        private router: Router, // router instance
        private stateFB: FormBuilder, // FormBuilder Instance
        private stateActiveRoute: ActivatedRoute, // active route instane
        private toastr: ToastrClientService, // toastr instance
        private stateService: StateService, // state service instance
        private commonService: CommonService, // common service instance
        private spinner: NgxSpinnerService, // spinner instance
        // private error: ErrorResponseService, // error response Instance
        private authService: AuthService
    ) {
         // Used to state form instance
    }

    ngOnInit() {
        this.setPageDetails(1);
        // this.getCountry();
        // this.findState(this.statePaginationObj);
    }
    ngAfterContentInit(): void {
        // this.isBackButtonRequired();
    }
    
    public setPageDetails(pageNoToGo: any) {
        console.log(pageNoToGo);
        this.statePageNo = pageNoToGo;
        this.statePaginationObj = {
            isActiveDataRequired: true,
            isPaginationRequired: false,
            isOrderRequired: true,
            isAscending: true,
            pageNumber: this.statePageNo,
            pageSize: this.statePageSize,
            orderField: 'id'
        };
        this.getStateDetails(this.statePaginationObj);
    }
    private getStateDetails(data:PaginationModel) {
        this.spinner.show();
        // console.log(data);
        this.stateService.getAllStateDetails(data).subscribe(successResponse => {
            // console.log('All State Details:----', successResponse);
            if (successResponse !== null) {
                this.spinner.hide();
                this.state = successResponse['data'];
                // console.log('this.state', this.state);
                this.stateTotalElements = successResponse['totalElements'];
                // console.log('this.state', this.state);
            } else {
                this.state = [];
                this.spinner.hide();
                this.stateTotalElements = 0;
            }
        }, errorResponse => {
            this.spinner.hide();
            // this.error.showMessage(errorResponse);
        });
    }
    // public openUpdateStateDetailsForm() {
    //     if (typeof this.selectedState !== 'undefined') {
    //         this.isUpdate = true;
    //         this.pathType = 'Update';
    //         console.log('this.selectedState', this.selectedState);
    //         this.stateForm.patchValue(this.selectedState);
    //     } else {
    //         this.toastr.warningToastr('Select any one State details');
    //     }
    // }
    public selectTableData(data){
        console.group('select');
        this.selectedName = data['state_name'];
        this.selectedstate = data;
        console.log(this.selectedstate);
      }
    public goToPage(){
        this.router.navigate(['./create'], { relativeTo: this.stateActiveRoute });
    }
    public goToEditPage(){
      if(typeof this.selectedstate !== 'undefined'){
        this.stateService.getStoredData(this.selectedstate);
        this.router.navigate(['./edit'], { relativeTo: this.stateActiveRoute });
      }
    }
    public changePageSize() {
        this.statePageSize = this.selectedPageSize;
        this.setPageDetails(1);
    }
    public goBackToPage() {
        this.router.navigateByUrl('/pages/lookup');
    }

}
