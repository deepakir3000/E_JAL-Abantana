import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PaginationModel } from '@app/model/pagination-model';
import { Router, ActivatedRoute } from '@angular/router';
import { BasinService } from '../basin.service';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-basin-view',
  templateUrl: './basin-view.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class BasinViewComponent implements OnInit {

  public basin =  [];
  private basinPaginationObj: PaginationModel;
  public basinPageNo = 0;
  public basinPageSize = 10;
  public basinTotalElements = 0;
  public selectedPageSize = 10;
  public selectedName;
  public selectedBasin;

  constructor(
    private router: Router,
    private basinActiveRoute: ActivatedRoute,
    private service: BasinService,
    private toastr: ToastrClientService, 
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.setPageDetails(0, 1);
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
    this.getbasinDetails(this.basinPaginationObj);
  }
  public getbasinDetails(data: PaginationModel){
    this.spinner.show();
    this.service.getAllBasinDetails(data).subscribe(response=>{
      console.log(response);
      if(typeof response !== null){
        this.basin = response['data'];
        this.basinTotalElements = response['totalElements'];
        this.spinner.hide();
      }else{
        this.toastr.dangerToastr('Something Went Wrong..!!')
      }
    })
  }
  public selectTableData(data){
    // console.group('select');
    this.selectedName = data['basin_name'];
    this.selectedBasin = data;
    console.log(this.selectedBasin);
  }
  public goToEditPage(){
    console.log(this.selectedBasin);
    if(typeof this.selectedBasin !== 'undefined'){
      this.service.setData(this.selectedBasin);
      this.router.navigate(['./edit'], { relativeTo: this.basinActiveRoute });
    }
  }
  public goToPage(){
    this.router.navigate(['./create'], { relativeTo: this.basinActiveRoute });
   }

}
