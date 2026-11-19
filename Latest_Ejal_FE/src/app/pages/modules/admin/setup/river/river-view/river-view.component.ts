import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PaginationModel } from '@app/model/pagination-model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RiverService } from '../river.service';

@Component({
  selector: 'app-river-view',
  templateUrl: './river-view.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class RiverViewComponent implements OnInit {

  public river =  [];
  private riverPaginationObj: PaginationModel;
  public riverPageNo = 0;
  public riverPageSize = 10;
  public riverTotalElements = 0;
  public selectedPageSize = 10;
  public selectedName;
  public selectedriver;

  constructor(
    private router: Router,
    private operationalActiveRoute: ActivatedRoute,
    private service: RiverService,
    private toastr: ToastrClientService, 
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.setPageDetails(0, 1);
  }

  public setPageDetails(currentPage, pageNoToGo: any) {
    // console.log(currentPage, pageNoToGo);
    this.riverPageNo = pageNoToGo;
    this.riverPaginationObj = {
        isActiveDataRequired: false,
        isPaginationRequired: true,
        isOrderRequired: false,
        isAscending: false,
        pageNumber: this.riverPageNo - 1,
        pageSize: this.riverPageSize,
        orderField: 'id'
    };
    this.getRiverDetails(this.riverPaginationObj);
  }

  public getRiverDetails(data: PaginationModel){
    this.spinner.show();
    this.service.getAllRiverDetails(data).subscribe(response=>{
      console.log(response);
      if(typeof response !== null){
        this.river = response['data'];
        this.riverTotalElements = response['totalElements'];
        this.spinner.hide();
      }else{
        this.toastr.dangerToastr('Something Went Wrong..!!')
      }
    })
  }
  public selectTableData(data){
    // console.group('select');
    this.selectedName = data['river_name'];
    this.selectedriver = data;
    console.log(this.selectedriver);
  }
  public goToEditPage(){
    console.log(this.selectedriver);
    if(typeof this.selectedriver !== 'undefined'){
      this.service.setData(this.selectedriver);
      this.router.navigate(['./edit'], { relativeTo: this.operationalActiveRoute });
    }
  }
  public goToPage(){
    this.router.navigate(['./create'], { relativeTo: this.operationalActiveRoute });
   }

}
