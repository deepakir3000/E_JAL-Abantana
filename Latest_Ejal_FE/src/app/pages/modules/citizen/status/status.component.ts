import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PaginationModel2 } from '@app/model/pagination-model';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import { AdminProposalService } from '@app/services/admin/admin-proposal.service';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { Router } from '@angular/router';
import { AppConstants } from '@app/app.constants';
import Swal from 'sweetalert2';
import { CommonFormService } from '@app/modules/common-form/common-form.service';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class StatusComponent implements OnInit {
  modalRef: BsModalRef;
  public selectedDistrictText = 'Select District';
  public selectedBlockText = 'Select Block';
  public selectedCircleText = 'Select Block';
  public selectedSocietyText = 'Select PG/SHG';

  public applicationPageNo = 0;
  public applicationPageSize = 3;
  public applicationTotalElements = 0;
  public applicationData = [];
  public statusDetails = [];
  public count = 0;
  private applicationPaginationObj: PaginationModel2;
  public xAuth;

  constructor(
    private service: AdminProposalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrClientService,
    private router: Router,
    private modalService: BsModalService,
     private CommonFormService: CommonFormService

  ) { }

  ngOnInit() {
    this.setPageDetails(0, 1, null);
    this.xAuth = localStorage.getItem('access_token');
  }
  public setPageDetails(currentPage, pageNoToGo: any, searchText) {
    // console.log(currentPage, pageNoToGo);
    this.applicationPageNo = pageNoToGo;
    this.applicationPaginationObj = {
      isActiveDataRequired: false,
      isPaginationRequired: true,
      isOrderRequired: false,
      isAscending: false,
      pageNumber: this.applicationPageNo,
      pageSize: this.applicationPageSize,
      order: 'id'
    };
    this.getAllApplicationDetails(this.applicationPaginationObj, searchText);
  }
  public getAllApplicationDetails(data: PaginationModel2, searchText) {
    this.spinner.show();
    this.service.getAllApplicationDetails(data, searchText).subscribe(response => {
      console.log(response);
      if (typeof response !== null) {
        this.spinner.hide();
        this.applicationData = response['data'];
        console.log( this.applicationData,' this.applicationData')
        this.applicationTotalElements = response['totalElements'];
         this.checkAcknowledgements();
      } else {
        this.toastr.dangerToastr('Something Went Wrong..');
      }
    });
  }

    public checkAcknowledgements(): void {
          if (!this.applicationData || this.applicationData.length === 0) {
              return;
          }
  
          const ids = this.applicationData.map((item: { id: any; }) => item.id);
  
          const requests = ids.map((id: { toString: () => any; }) =>
              this.CommonFormService.getacknowledgementDetails(id.toString())
          );
  
          this.spinner.show();
          forkJoin(requests).subscribe(
              (responses: any[]) => {
                  responses.forEach((res, index) => {
                      var ackData = res && res.data && res.data.length > 0 ? res.data[0] : null;
                      var ackDate = ackData && ackData.acknowledge_date != null ? ackData.acknowledge_date : null;
                      this.applicationData[index].acknowledge_date = ackDate;
                  });
                  this.spinner.hide();
              },
              () => {
                  this.spinner.hide();
              }
          );
      }


  public goToPage(type, id) {
    console.log(type, id);
    switch (type) {
      case 'View':
        this.router.navigateByUrl('/pages/citizen/view-form/' + id);
        break;
      case 'Edit':
        this.router.navigateByUrl('/pages/citizen/edit-form/' + id);
        break;
      case 'Status':
        this.router.navigateByUrl('/pages/citizen/application-status');
        break;
        case 'Acknowledgement':
        this.router.navigateByUrl('/pages/citizen/acknowledgement/'  + id);
        break;
    }
  }
  downloadFile(id, hasFile) {
    // if(hasFile !== null){
    return AppConstants.BASE_API_URL + 'api/mediaDownload/' + 'wfAllocation_' + id + '?access-token=' + this.xAuth;
    // }else{
    //     this.toastr.warningToastr('No files available');
    // }

}
  // openStatusModal(statusModal, appID) {
  //   this.spinner.show();
  //   this.service.getStatusDetails(appID).subscribe(response => {
  //     console.log('Status Data', response);
  //     if (typeof response !== null) {
  //       this.statusDetails = response['data'];
  //       this.statusDetails = response['data'].map(ele => {
  //         ele['type'] = ele['wac_date'] === null ? 'NA' : (ele['wac_date'] === 'null' ? 'NA' : ele['wac_date']);
  //         return ele;
  //     });
  //       this.spinner.hide();
  //       this.modalRef = this.modalService.show(statusModal, { class: 'customModalSize' });
  //     } else {
  //       this.toastr.warningToastr('Couldnot found Data');
  //       this.spinner.hide();
  //     }
  //   });
  // }

  openStatusModal(statusModal, appID) {
  this.spinner.show();
  this.service.getStatusDetails(appID).subscribe(
    response => {
      console.log('Status Data', response);

//       if (response['status'] === 'NOT_INITIALIZED') {
//         this.spinner.hide();
//        Swal.fire({
//   type: 'warning',
//   title: 'Application Not Submitted',
//   text: 'The application has not been submitted yet.'
// });
//         return;
//       }

      if (response !== null) {
        this.statusDetails = response['data'];
        this.statusDetails = response['data'].map(ele => {
          ele['type'] =
            ele['wac_date'] === null || ele['wac_date'] === 'null'
              ? 'NA'
              : ele['wac_date'];
          return ele;
        });

        this.spinner.hide();
        this.modalRef = this.modalService.show(statusModal, { class: 'customModalSize' });
      } else {
        this.toastr.warningToastr('Couldnot found Data');
        this.spinner.hide();
      }
    },
    error => {
  this.spinner.hide();

  if (error.error && error.error.status === 'NOT_INITIALIZED') {
    Swal.fire({
      type: 'warning',
      title: 'Application Not Submitted',
      text: 'The application has not been submitted yet.'
    });
    return;
  }

  console.error(error);
  this.toastr.dangerToastr('Something went wrong.');
}
  );
}

    openStatus(statusModal, appID) {
  this.spinner.show();
console.log(appID,'appID')
  this.service.getAckDetails(appID).subscribe(
    response => {

      if (response && response.data) {

        // valid response
        this.statusDetails = response.data.map(ele => {
          ele.type = ele.wac_date ? ele.wac_date : 'NA';
          return ele;
        });

        this.spinner.hide();
        this.modalRef = this.modalService.show(statusModal, { class: 'customModalSize' });

      } else {

        // response is undefined or empty
        this.spinner.hide();
        this.toastr.warningToastr('Could not find Data');

      }

    },
    error => {
      // API error handling
      this.spinner.hide();
      this.toastr.dangerToastr('Something went wrong');
    }
  );
}

  public getQueryData(ind) {
    // console.log( 'Count', this.count);
    if (ind < 2) {
      return '1st Query Raised';
    } else if (ind > 2) {
      return '2nd Query Raised';
    }
  }
}
