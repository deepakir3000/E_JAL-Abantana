import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationModel } from '@app/model/pagination-model';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApplicationForService } from '../application-for.service';

@Component({
  selector: 'app-application-for',
  templateUrl: './application-for.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class ApplicationForComponent implements OnInit {

  public appFor =  [];
  private appForPaginationObj: PaginationModel;
  public appForPageNo = 0;
  public appForPageSize = 10;
  public appForTotalElements = 0;
  public selectedPageSize = 10;
  public selectedName;
  public selectedApplicationType;
  constructor(
    private router: Router,
    private applicationActiveRoute: ActivatedRoute,
    private toastr: ToastrClientService, 
    private service: ApplicationForService, 
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.setPageDetails(0, 1);
  }

  public setPageDetails(currentPage, pageNoToGo: any) {
    // console.log(currentPage, pageNoToGo);
    this.appForPageNo = pageNoToGo;
    this.appForPaginationObj = {
        isActiveDataRequired: false,
        isPaginationRequired: true,
        isOrderRequired: false,
        isAscending: false,
        pageNumber: this.appForPageNo - 1,
        pageSize: this.appForPageSize,
        orderField: 'id'
    };
    this.getAllAppForDetails(this.appForPaginationObj);
  }
  public getAllAppForDetails(data: PaginationModel){
    this.spinner.show();
    this.service.getAllAppForDetails(data).subscribe(response=>{
      console.log(response);
      if(typeof response !== null){
        this.appFor = response['data'];
        this.appForTotalElements = response['totalElements'];
        this.spinner.hide();
      }else{
        this.toastr.dangerToastr('Something Went Wrong..!!')
      }
    })
  }
  public selectTableData(data){
    // console.group('select');
    this.selectedName = data['application_type'];
    this.selectedApplicationType = data;
    console.log(this.selectedApplicationType);
  }
  public goToEditPage(){
    console.log(this.selectedApplicationType);
    if(typeof this.selectedApplicationType !== 'undefined'){
      this.service.setData(this.selectedApplicationType);
      this.router.navigate(['./edit'], { relativeTo: this.applicationActiveRoute });
    }
  }

public changePageSize() {
    this.appForPageSize = this.selectedPageSize;
    this.setPageDetails(0, 1);
}
  public goToPage(){
    this.router.navigate(['./create'], { relativeTo: this.applicationActiveRoute });
   }
}
