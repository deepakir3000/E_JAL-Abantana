import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardService } from './../../../../services/admin/dashboard.service'
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrClientService } from '@app/services/toastr/toastr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DashboardComponent implements OnInit {

  public allDashBoardData;
  modalRef: BsModalRef;
  public showMapBtn = true;
  public basinName = 'NA';
  public totalQuantity;
  public allocatedQuantity = 0;
  public availableQuantity = 0;
  public extConApplied = 0;
  public extConApproved = 0;
  public extConPending = 0;
  public extConRejected = 0;
  public newConApplied = 0;
  public newConApproved = 0;
  public newConPending = 0;
  public newConRejected = 0;
  constructor(
    private service: DashboardService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrClientService,
  ) { }

  ngOnInit() {
    this.getAllDashBoard();
    const ROLE_ID = localStorage.getItem('role_id');
    ROLE_ID === '5' || ROLE_ID === '2' ? this.showMapBtn = true : this.showMapBtn = false;
  }

  public getAllDashBoard() {
    this.service.getDashBoardDetails().subscribe(response => {
      console.log(response);
      this.allDashBoardData = response;
      this.extConApplied = this.allDashBoardData.extConnection;
      this.extConApproved = this.allDashBoardData.extConnectionApp;
      this.extConPending = this.allDashBoardData.extConnectionPen;
      this.extConRejected = this.allDashBoardData.extConnectionRej;
      this.newConApplied = this.allDashBoardData.newConnection;
      this.newConApproved = this.allDashBoardData.newConnectionApp;
      this.newConPending = this.allDashBoardData.newConnectionPen;
      this.newConRejected = this.allDashBoardData.newConnectionRej;
    });
  }
  public openBasinModal(id) {
    this.modalRef = this.modalService.show(id, { class: 'customModalSize' });
  }
  public getBasinDeatilsMap(basinId) {
    this.spinner.show();
    this.service.getBasinDetails(basinId).subscribe(response => {
      if (response !== null) {
        this.spinner.hide();
        console.log(response);
        this.basinName = response['data'][0].name_of_river_basin;
        this.totalQuantity = response['data'][0].avg_non_monsoon_flow_in_cusec;
        this.allocatedQuantity = response['data'][0].water_allocation_qty;
        this.availableQuantity = Number(this.totalQuantity) - Number(this.allocatedQuantity);
        console.log(this.basinName, this.totalQuantity, this.allocatedQuantity, this.availableQuantity);
      } else {
        this.spinner.hide();
        this.toastr.warningToastr('Please select a valid Basin');
      }
    }, errorResponse => {
      this.spinner.hide();
      this.toastr.dangerToastr('Something went wrong!!!');
    });
  }
}
