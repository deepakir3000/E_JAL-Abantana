import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationModel } from '@app/model/pagination-model';
import { OperationalSourceService } from '../operational-source.service';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-operational-view',
  templateUrl: './operational-view.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class OperationalViewComponent implements OnInit {

  public operational = [];
  private operationalPaginationObj: PaginationModel;
  public operationalPageNo = 0;
  public operationalPageSize = 10;
  public operationalTotalElements = 0;
  public selectedPageSize = 10;
  public selectedName;
  public selectedOperationType;
  constructor(
    private router: Router,
    private operationalActiveRoute: ActivatedRoute,
    private service: OperationalSourceService,
    private toastr: ToastrClientService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.setPageDetails(0, 1);
  }

  public setPageDetails(currentPage, pageNoToGo: any) {
    // console.log(currentPage, pageNoToGo);
    this.operationalPageNo = pageNoToGo;
    this.operationalPaginationObj = {
      isActiveDataRequired: false,
      isPaginationRequired: true,
      isOrderRequired: false,
      isAscending: false,
      pageNumber: this.operationalPageNo - 1,
      pageSize: this.operationalPageSize,
      orderField: 'id'
    };
    this.getAllOperationalDetails(this.operationalPaginationObj);
  }
  public getAllOperationalDetails(data: PaginationModel) {
    this.spinner.show();
    this.service.getAllOperationalDetails(data).subscribe(response => {
      console.log(response);
      if (typeof response !== null) {
        this.operational = response['data'];
        // this.appForTotalElements = response['totalElements'];
        this.spinner.hide();
      } else {
        this.toastr.dangerToastr('Something Went Wrong..!!')
      }
    })
  }
  public selectTableData(data){
    // console.group('select');
    this.selectedName = data['operational_source'];
    this.selectedOperationType = data;
    console.log(this.selectedOperationType);
  }
  public goToEditPage(){
    console.log(this.selectedOperationType);
    if(typeof this.selectedOperationType !== 'undefined'){
      this.service.setData(this.selectedOperationType);
      this.router.navigate(['./edit'], { relativeTo: this.operationalActiveRoute });
    }
  }
  public goToPage() {
    this.router.navigate(['./create'], { relativeTo: this.operationalActiveRoute });
  }
}
