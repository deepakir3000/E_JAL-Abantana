import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { District } from '../../block/block.model';
import { PaginationModel } from '@app/model/pagination-model';
import { Subject } from 'rxjs';
import { PAGINATION_LENGTH } from '@app/data/common.data';
import { StorageService } from '@app/services/storage/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { DistrictService } from '../district.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '@app/services/common/common.service';
import { AuthService } from '@app/services/authentication/auth.service';

@Component({
  selector: 'app-district-view',
  templateUrl: './district-view.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
//   providers: [DistrictService]
})
export class DistrictViewComponent implements OnInit {

    public district=[];
    // used to get selected block details
    // private selectedDistrict: District;
    // used for pagination object
    private districtPaginationObj: PaginationModel;
    // pagination data controls
    public districtPageNo = 0;
    public districtPageSize = 10;
    public districtTotalElements = 0;
    // Used for search Division
    public isLookUpBackAllowed = false;
    public searchDistrictText: string;
    searchDistrictText$ = new Subject<string>();
    public pageSize = PAGINATION_LENGTH;
    public selectedPageSize = 10;
    public selectedName;
    public selectedDistrict;

    // public districtData = ['Angul','Baleswar', 'Bhadrak', 'Cuttack', 'Dhenkanal'];
    constructor(
        private appStorage: StorageService,
        private router: Router, // router instance
        private districtActiveRoute: ActivatedRoute, // active route instane
        private toastr: ToastrClientService, // toastr instance
        private districtService: DistrictService, // district service instance
        private spinner: NgxSpinnerService, // spinner instance
        // private error: ErrorResponseService, // error response Instance
        private commonService: CommonService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.setPageDetails(0, 1);
        // this.findDistrict(this.districtPaginationObj);
    }
      ngAfterContentInit(): void {
        // this.isBackButtonRequired();
    }
    public setPageDetails(currentPage, pageNoToGo: any) {
        // console.log(currentPage, pageNoToGo);
        this.districtPageNo = pageNoToGo;
        this.districtPaginationObj = {
            isActiveDataRequired: false,
            isPaginationRequired: true,
            isOrderRequired: false,
            isAscending: false,
            pageNumber: this.districtPageNo - 1,
            pageSize: this.districtPageSize,
            orderField: 'id'
        };
            this.getDistrictDetails(this.districtPaginationObj);
    }
    private getDistrictDetails(data: PaginationModel) {
        this.spinner.show();
        console.log(data);
        this.districtService.getAllDistrictDetails(data).subscribe(successResponse => {
            if (successResponse !== null) {
            this.spinner.hide();
           // console.log(successResponse);
            this.district = successResponse['data'];
            this.districtTotalElements = successResponse['totalElements'];
          //  console.log('All District Details:----', this.district);
            } else {
                this.district = [] ;
                this.spinner.hide();
            }
        }, errorResponse => {
            this.spinner.hide();
            // this.error.showMessage(errorResponse);
        });
    }
    public openCreateDistrictDetailsPage() {
        this.router.navigate(['../district/create'], { relativeTo: this.districtActiveRoute });
    }
    // public openUpdateDistrictDetailsPage() {
    //     if (typeof this.selectedDistrict !== 'undefined') {
    //         console.log(this.selectedDistrict);
    //         this.districtService.storeDistrict(this.selectedDistrict);
    //         this.router.navigate(['../edit'], { relativeTo: this.districtActiveRoute });
    //     } else {
    //         this.toastr.warningToastr('Select any one District details');
    //     }
    // }
    
    public selectTableData(data){
        console.group('select');
        this.selectedName = data['district_name'];
        this.selectedDistrict = data;
        console.log(this.selectedDistrict);
      }
      public goToEditPage(){
        if(typeof this.selectedDistrict !== 'undefined'){
          this.districtService.setdata(this.selectedDistrict);
          this.router.navigate(['./edit'], { relativeTo: this.districtActiveRoute });
        }
      }
      public changePageSize() {
          this.districtPageSize = this.selectedPageSize;
          this.setPageDetails(0,1);
      }
    public goBackToPage() {
        this.router.navigateByUrl('/pages/lookup');
        // this.authService.goBack();
    }


}
