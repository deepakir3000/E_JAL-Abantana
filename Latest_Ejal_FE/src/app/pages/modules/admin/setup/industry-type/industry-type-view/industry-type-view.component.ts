import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { PaginationModel } from '@app/model/pagination-model';
import { IndustryTypeService } from './../../../../../../services/admin/industry-type.service'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-industry-type-view',
  templateUrl: './industry-type-view.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class IndustryTypeViewComponent implements OnInit {

  public industryForm: FormGroup;
  public industryDetails: [];
  private industryPaginationObj: PaginationModel;
  // pagination data controls
  public industryPageNo = 0;
  public industryPageSize = 10;
  public industryTotalElements = 0;
  public selectedPageSize = 10;
  public selectedName;
  public selectedindustryType;
  constructor(
    private router: Router,
    private industryActiveRoute: ActivatedRoute,
    private service: IndustryTypeService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.setPageDetails(0, 1)
  }
  public setPageDetails(currentPage, pageNoToGo: any) {
    console.log(currentPage, pageNoToGo);
    this.industryPageNo = pageNoToGo;
    this.industryPaginationObj = {
      isActiveDataRequired: false,
      isPaginationRequired: true,
      isOrderRequired: false,
      isAscending: false,
      pageNumber: this.industryPageNo - 1,
      pageSize: this.industryPageSize,
      orderField: 'id'
    };
    this.getAllindusrtyDetails(this.industryPaginationObj);
  }
  public getAllindusrtyDetails(data: PaginationModel) {
    this.spinner.show();
    this.service.getAllIndTypeDetails(data).subscribe(response => {
      // console.log(response);
      if (response !== null) {
        this.spinner.hide();
        // console.log(successResponse);
        this.industryDetails = response['data'];
        this.industryTotalElements = response['totalElements'];
        //  console.log('All District Details:----', this.district);
      } else {
        this.industryDetails = [];
        this.spinner.hide();
      }
    }, errorResponse => {
      this.spinner.hide();
      // this.error.showMessage(errorResponse);
    });
  }
  public selectTableData(data){
    // console.group('select');
    this.selectedName = data['industry_name'];
    this.selectedindustryType = data;
    console.log(this.selectedindustryType);
  }
  public goToEditPage(){
    console.log(this.selectedindustryType);
    if(typeof this.selectedindustryType !== 'undefined'){
      this.service.setdata(this.selectedindustryType);
      this.router.navigate(['./edit'], { relativeTo: this.industryActiveRoute });
    }
  }

public changePageSize() {
    this.industryPageSize = this.selectedPageSize;
    this.setPageDetails(0, 1);
}
  public goToPage() {
    this.router.navigate(['./create'], { relativeTo: this.industryActiveRoute });
  }
}
