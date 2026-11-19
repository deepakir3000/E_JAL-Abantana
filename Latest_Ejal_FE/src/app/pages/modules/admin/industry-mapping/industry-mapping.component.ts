import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdminProposalService } from '@app/services/admin/admin-proposal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { PaginationModel2 } from '@app/model/pagination-model';
import { NextStepActionTakenService } from '@app/services/admin/next-step-action-taken.service';

@Component({
  selector: 'app-industry-mapping',
  templateUrl: './industry-mapping.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class IndustryMappingComponent implements OnInit {
  private industryPaginationObj: PaginationModel2;
  public industryPageNo = 0;
  public industryPageSize = 10;
  public industryTotalElements = 0;
  public industryData = [];
  public selectedDistrictText = 'Select District';
  public selectedBlockText = 'Select Block';
  public selectedCircleText = 'Select Block';
  public selectedSocietyText = 'Select Type';
  public isDivisionClicked = false;
  public isCircleClicked = false;
  public isSocietyClicked = false;
  public district: any[];
  public block: any[];
  public loginType;
  public roleID;
  public appSts1Check = 'Y';
  public appSts1 = false;
  public appSts2Check = 'Y';
  public appSts2 = false;
  public IndustryNaame;
  public statusDetails = [];
  public nextStepData;
  public tranAID: any = [];
  public tranRID: any = [];
  public tranGID: any = [];
  public applicationDt;
  public desc = '';
  public SUBMIT_DETAILS;
  public isGovernment = false;
  public type = 'Pending';
  public actionValue = 0;
  public isSubmit = false;
  public divisionList = [
    { 'divisionName': 'ANGUL' },
    { 'divisionName': 'BALASORE' },
    { 'divisionName': 'BARAGARH' },
    { 'divisionName': 'BARIPADA' },
    { 'divisionName': 'BERHAMPUR' },
    { 'divisionName': 'BOLANGIR' },
    { 'divisionName': 'CUTTACK' },
    { 'divisionName': 'CUTTACK-II' },
    { 'divisionName': 'DHENKANAL' },
    { 'divisionName': 'JEYPORE' },
  ];
  public blockList = [
    { 'blockName': 'ANUGUL SADAR' },
    { 'blockName': 'ATHAMALIK SADAR' },
    { 'blockName': 'CHHENDIPADA' },
    { 'blockName': 'TALCHER SADAR' },
    { 'blockName': 'PALLAHDA SADAR' },
    { 'blockName': 'BANARPAL' },
    { 'blockName': 'KISHORENAGAR' },
    { 'blockName': 'KANIHA' },
  ];
  public industryList = [
    { 'type': 'SMALL' },
    { 'type': 'MEDIUM' },
    { 'type': 'LARGE' },
  ];
  public actionDt;
  isEnableScroll: boolean;
  public selectedIndData = undefined;
  constructor(
    private service: AdminProposalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrClientService,
    private eeService: NextStepActionTakenService,
  ) { }

  ngOnInit() {
    this.getEEData();
    this.setPageDetails(0, 1);
  } public setPageDetails(currentPage, pageNoToGo: any) {
    // console.log(currentPage, pageNoToGo);
    this.industryPageNo = pageNoToGo;
    this.industryPaginationObj = {
      isActiveDataRequired: false,
      isPaginationRequired: true,
      isOrderRequired: false,
      isAscending: false,
      pageNumber: this.industryPageNo,
      pageSize: this.industryPageSize,
      order: 'id'
    };
    this.getAllDetailsForMapping(this.industryPaginationObj);
  }
  public getAllDetailsForMapping(data: PaginationModel2) {
    this.spinner.show();
    this.service.getAllDetailsForMapping(this.type, data).subscribe(response => {
      console.log(response);
      if (typeof response !== null) {
        this.spinner.hide();
        this.industryData = response['data'];
        this.industryTotalElements = response['totalElements'];
      } else {
        this.toastr.dangerToastr('Something Went Wrong..');
      }
    });
  }
  public openTab(data) {
    this.type = data;
    this.setPageDetails(0, 1);
  }
  public selectedData(data) {
    this.selectedIndData = data;
    console.log(data);
  }
  public getEEData() {
    this.eeService.getAllEEDetails(null, 0).subscribe(successResponse => {
      if (successResponse !== null) {
        this.actionDt = successResponse['data'];
        // this.toastr.successToastr(successResponse['message']);
        console.log(successResponse);
        // this.router.navigate(["../"], { relativeTo: this.resourceActiveRoute });
      } else {
        this.toastr.dangerToastr('Something went wrong..!!');
      }
    });
  }
  public mapEEToIndustry() {
    const DATA = {
      'id': this.selectedIndData.serial_no,
      'userId': this.actionValue
    };
    console.log(DATA);
    this.eeService.submitActionForIndustrie(DATA).subscribe(successResponse => {
      if (successResponse !== null) {
        // this.actionDt = successResponse['data'];
        this.toastr.successToastr(successResponse['message']);
        this.setPageDetails(0, 1);
        console.log(successResponse);
      } else {
        this.toastr.dangerToastr('Something went wrong..!!');
      }
    });

  }
  public actionChange() {
    console.log(this.actionValue);
    if (Number(this.actionValue) === 0) {
      console.log('if');
      this.isSubmit = false;
    } else {
      console.log('else');
      this.isSubmit = true;
    }
  }

}
