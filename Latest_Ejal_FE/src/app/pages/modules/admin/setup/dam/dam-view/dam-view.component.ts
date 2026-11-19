import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PaginationModel } from '@app/model/pagination-model';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DamService } from '../dam.service';

@Component({
  selector: 'app-dam-view',
  templateUrl: './dam-view.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class DamViewComponent implements OnInit {
  public dam =  [];
  private damPaginationObj: PaginationModel;
  public damPageNo = 0;
  public damPageSize = 10;
  public damTotalElements = 0;
  public selectedPageSize = 10;
  public selectedName;
  public selecteddam;

  constructor(
    private router: Router,
    private damActiveRoute: ActivatedRoute,
    private service: DamService,
    private toastr: ToastrClientService, 
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.setPageDetails(0, 1);
  }
  public setPageDetails(currentPage, pageNoToGo: any) {
    // console.log(currentPage, pageNoToGo);
    this.damPageNo = pageNoToGo;
    this.damPaginationObj = {
        isActiveDataRequired: false,
        isPaginationRequired: true,
        isOrderRequired: false,
        isAscending: false,
        pageNumber: this.damPageNo - 1,
        pageSize: this.damPageSize,
        orderField: 'id'
    };
    this.getDamDetails(this.damPaginationObj);
  }
  public getDamDetails(data: PaginationModel){
    this.spinner.show();
    this.service.getAllDamDetails(data).subscribe(response=>{
      console.log(response);
      if(typeof response !== null){
        this.dam = response['data'];
        this.damTotalElements = response['totalElements'];
        this.spinner.hide();
      }else{
        this.toastr.dangerToastr('Something Went Wrong..!!')
      }
    })
  }
  public selectTableData(data){
    // console.group('select');
    this.selectedName = data['dam_name'];
    this.selecteddam = data;
    console.log(this.selecteddam);
  }
  public goToEditPage(){
    console.log(this.selecteddam);
    if(typeof this.selecteddam !== 'undefined'){
      this.service.setData(this.selecteddam);
      this.router.navigate(['./edit'], { relativeTo: this.damActiveRoute });
    }
  }
  public goToPage(){
    this.router.navigate(['./create'], { relativeTo: this.damActiveRoute });
   }

}
