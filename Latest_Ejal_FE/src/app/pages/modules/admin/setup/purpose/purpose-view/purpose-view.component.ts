import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationModel } from '@app/model/pagination-model';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { PurposeService } from '../purpose.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-purpose-view',
  templateUrl: './purpose-view.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class PurposeViewComponent implements OnInit {
  public purpose=[];
  private purposePaginationObj: PaginationModel;
  // pagination data controls
  public purposePageNo = 0;
  public purposePageSize = 10;
  public purposeTotalElements = 0;
  public selectedPageSize = 10;
  public selectedName;
  public selectedPurpose;
  constructor(
    private router: Router,
    private purposeActiveRoute: ActivatedRoute,
    private toastr: ToastrClientService, 
    private service: PurposeService, 
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.setPageDetails(0, 1);
  }

  public setPageDetails(currentPage, pageNoToGo: any) {
    // console.log(currentPage, pageNoToGo);
    this.purposePageNo = pageNoToGo;
    this.purposePaginationObj = {
        isActiveDataRequired: false,
        isPaginationRequired: true,
        isOrderRequired: false,
        isAscending: false,
        pageNumber: this.purposePageNo - 1,
        pageSize: this.purposePageSize,
        orderField: 'id'
    };
    this.getAllPurposeDetails(this.purposePaginationObj);
  }
  public getAllPurposeDetails(data: PaginationModel){
    this.spinner.show();
    this.service.getAllPurposeDetails(data).subscribe(response=>{
      console.log(response);
      if(typeof response !== null){
        this.purpose = response['data'];
        this.purposeTotalElements = response['totalElements'];
        this.spinner.hide();
      }else{
        this.toastr.dangerToastr('Something Went Wrong..!!')
      }
    })
  }
  public selectTableData(data){
    // console.group('select');
    this.selectedName = data['purpose_name'];
    this.selectedPurpose = data;
    console.log(this.selectedPurpose);
  }
  public goToEditPage(){
    console.log(this.selectedPurpose);
    if(typeof this.selectedPurpose !== 'undefined'){
      this.service.setData(this.selectedPurpose);
      this.router.navigate(['./edit'], { relativeTo: this.purposeActiveRoute });
    }
  }

public changePageSize() {
    this.purposePageSize = this.selectedPageSize;
    this.setPageDetails(0, 1);
}
  public goToPage(){
    this.router.navigate(['./create'], { relativeTo: this.purposeActiveRoute });
   }
}
