import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaginationModel } from '@app/model/pagination-model';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FeedbackService } from '../feedback.service';

@Component({
  selector: 'app-feedback-view',
  templateUrl: './feedback-view.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class FeedbackViewComponent implements OnInit {

  public feedback =  [];
  private feedbackPaginationObj: PaginationModel;
  public feedbackPageNo = 0;
  public feedbackPageSize = 10;
  public feedbackTotalElements = 0;
  public selectedPageSize = 10;
  public selectedName;
  public selectedfeedback;

  constructor(
    private router: Router,
    private feedbackActiveRoute: ActivatedRoute,
    private service: FeedbackService,
    private toastr: ToastrClientService, 
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit() {
    this.setPageDetails(0, 1);
  }
  public setPageDetails(currentPage, pageNoToGo: any) {
    // console.log(currentPage, pageNoToGo);
    this.feedbackPageNo = pageNoToGo;
    this.feedbackPaginationObj = {
        isActiveDataRequired: false,
        isPaginationRequired: true,
        isOrderRequired: false,
        isAscending: false,
        pageNumber: this.feedbackPageNo - 1,
        pageSize: this.feedbackPageSize,
        orderField: 'id'
    };
    this.getfeedbackDetails();
  }

  public getfeedbackDetails(){
    this.spinner.show();
    this.service.getAllFeedbackDetails().subscribe(response=>{
      console.log(response);
      if(typeof response !== null){
        this.feedback = response['data'];
        this.feedbackTotalElements = response['totalElements'];
        this.spinner.hide();
      }else{
        this.toastr.dangerToastr('Something Went Wrong..!!')
      }
    });
  }
  public selectTableData(data){
    console.group('select');
    this.selectedName = data['id'];
    this.selectedfeedback = data;
    console.log(this.selectedfeedback);
  }
  public goToEditPage(){
    console.log(this.selectedfeedback);
    if(typeof this.selectedfeedback !== 'undefined'){
      this.service.setData(this.selectedfeedback);
      this.router.navigate(['./edit'], { relativeTo: this.feedbackActiveRoute });
    }
  }
  public goToPage(){
    this.router.navigate(['./create'], { relativeTo: this.feedbackActiveRoute });
   }

}
