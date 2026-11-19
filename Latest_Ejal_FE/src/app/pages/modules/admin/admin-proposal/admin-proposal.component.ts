import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { PaginationModel, PaginationModel2 } from './../../../../model/pagination-model';
import { AdminProposalService } from '@app/services/admin/admin-proposal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { NextStepActionTakenService } from '@app/services/admin/next-step-action-taken.service';
import { esLocale } from 'ngx-bootstrap';
import { AppConstants } from '@app/app.constants';
import { CommonFormService } from '@app/modules/common-form/common-form.service';
import { forkJoin } from 'rxjs';
@Component({
    selector: 'app-admin-proposal',
    templateUrl: './admin-proposal.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.Emulated
})
export class AdminProposalComponent implements OnInit {
    modalRef: BsModalRef;
    private applicationPaginationObj: PaginationModel2;
    private riverPagination: PaginationModel;
    // pagination data controls
    public applicationPageNo = 0;
    public applicationPageSize = 10;
    public applicationTotalElements = 0;
    public applicationData: any = [];
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
    public count = 0;
    public firstQuery = false;
    public secondQuery = false;
    public basinList = [];
    public executiveEngineerList = [];
    public industryList;
    public file = null;
    public fileName = '';
    // public roleId;
    /* [
        { 'type': 'SMALL' },
        { 'type': 'MEDIUM' },
        { 'type': 'LARGE' },
    ]; */
    isEnableScroll: boolean;
    public searchTxt = null;
    public searchType;
    public xAuth;
    public searchId = null;
    responseList: any;
    constructor(
        private router: Router,
        private modalService: BsModalService,
        private service: AdminProposalService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrClientService,
        private activatedRoute: ActivatedRoute,
        private nextStepService: NextStepActionTakenService,
        private nextService: NextStepActionTakenService,
        private CommonFormService: CommonFormService
    ) { }

    ngOnInit() {
        this.loginType = localStorage.getItem('isApprover');
        console.log('Login Type', this.loginType);
        this.roleID = localStorage.getItem('role_id');
        // console.log('ROLEID',this.roleID);
        this.setPageDetails(0, 1, this.searchTxt);
        if (this.roleID === '4' || this.roleID === '2' || this.roleID === '5') {
            this.getAllRiverAndEE();
        }
        this.xAuth = localStorage.getItem('access_token');
        // this.getStatusCount();
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
        this.riverPagination = {
            isActiveDataRequired: false,
            isPaginationRequired: true,
            isOrderRequired: false,
            isAscending: false,
            pageNumber: this.applicationPageNo,
            pageSize: this.applicationPageSize,
            orderField: 'id'
        };
        this.getAllApplicationDetails(this.applicationPaginationObj, searchText);
    }
    public getAllApplicationDetails(data: PaginationModel2, searchText) {
        this.spinner.show();
        console.log(data);
        this.service.getAllApplicationDetails(data, searchText).subscribe(response => {
            console.log(response, 45646546546);
            if (typeof response !== null) {
                this.spinner.hide();
                this.applicationData = response['data'];
                this.applicationTotalElements = response['totalElements'];
                console.log('this.applicationData', this.applicationData);
                this.checkAcknowledgements();
            } else {
                this.toastr.dangerToastr('Something Went Wrong..');
                this.spinner.hide();
            }
        }, errorResponse => {
            this.toastr.dangerToastr('Unable to find Data');
            this.spinner.hide();
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
    public getAllApplicationDetailsByID(data: PaginationModel2, searchText, type) {
        this.spinner.show();
        this.service.getAllApplicationDetailsById(data, searchText, type).subscribe(response => {
            console.log(response);
            if (typeof response !== null) {
                this.spinner.hide();
                this.applicationData = response['data'];
                this.applicationTotalElements = response['totalElements'];
            } else {
                this.toastr.dangerToastr('Something Went Wrong..');
                this.spinner.hide();
            }
        }, errorResponse => {
            this.toastr.dangerToastr('Unable to find Data');
            this.spinner.hide();
        });
    }
    public getDataByKeyInput(event) {
        this.searchTxt = event.target.value;
        if (this.searchTxt === '') {
            this.searchTxt = null;
        } else {
            this.searchTxt = event.target.value;
            // console.log(this.searchTxt);
        }
    }
    public getAppDataInput(event) {
        console.log(event);
        let extractedObject: any;
        this.searchId = parseInt(event.target.value);
        console.log(this.searchId);
        this.applicationData.forEach((obj: { id: any; }) => {
            console.log(obj.id, parseInt(this.searchId));
            if (obj.id == this.searchId) {
                extractedObject = obj;
            }
        });

        console.log(extractedObject, 'extractedObject');
        if (extractedObject) {
            this.applicationData = [];
            this.applicationData.push(extractedObject)
        } else {
            this.applicationData;
        }

    }
    public getDataByBasinAndEE(event, type) {
        const DATA = event.target.value;
        this.getAllApplicationDetailsByID(this.applicationPaginationObj, DATA, type);
    }
    getSearchData() {
        if (this.searchTxt === '') {
            this.searchTxt = null;
        } else {
            this.getAllApplicationDetails(this.applicationPaginationObj, this.searchTxt);
        }
    }

    getappData() {

        if (this.searchId === '') {
            this.searchId = null;
            this.applicationData;
        } else {
            console.log('clicked');
            this.getAppDataInput(event);
            // this.getAllApplicationDetails(this.applicationPaginationObj, this.searchId);
        }
    }
    public getAllRiverAndEE() {
        this.service.getAllBasinDetails(this.riverPagination).subscribe(response => {
            if (response !== null) {
                this.basinList = response['data'];
            }
        }, errorResponse => {
            this.toastr.warningToastr('Unable to load river Data');
        });
        this.service.getAllEE().subscribe(response => {
            if (response !== null) {
                this.executiveEngineerList = response['data'];
            }
        }, errorResponse => {
            this.toastr.warningToastr('Unable to load EE Data');
        });
    }
    // public getDataByRiverID($event){

    // }

    public openViewForm(appNo) {
        // window.open('/pages/admin/view/' + appNo, 'winname', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=350');
        this.router.navigateByUrl('/pages/admin/view/' + appNo);
    }
    // public openEditForm(formId) {
    //     this.router.navigateByUrl('/pages/admin/approval/' + formId);
    // }

    public openViewFormacknowledgement(appNo) {
        console.log(appNo, 'appNo');

        // window.open('/pages/admin/view/' + appNo, 'winname', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=350');
        this.router.navigateByUrl('/pages/approver/acknowledgement/' + appNo);
    }


    public openApprovalForm(form) {
        console.log('Application ID**', form);
        localStorage.setItem('indusId', form.industries_id);
        localStorage.setItem('appType', form.application_type);
        if (this.roleID === '4') {
            this.router.navigateByUrl('/pages/admin/approval/' + form.id);
        } else {
            this.router.navigateByUrl('/pages/admin/approval/' + form.id);
        }
    }
    setApproverSts(event) {
        console.log(event.target.value);
        this.appSts1Check = event.target.value;
        if (this.appSts1Check === 'Y') {
            this.appSts1 = false;
        } else {
            this.appSts1 = true;
        }
        console.log(this.appSts1);
    }
    public openActionModal(actionModal, data) {
        console.log('Selected Data:--', data);
        this.file = null;
        this.fileName = '';
        this.isGovernment = false;
        this.desc = '';
        this.applicationDt = data;
        this.getNextStepData(data);
        this.modalRef = this.modalService.show(actionModal, { class: 'modal-lg' });
        this.IndustryNaame = data.indName;
    }
    // openStatusModal(appID) {
    //     this.router.navigateByUrl('/pages/approver/status/' + appID);
    //     // this.spinner.show();
    //     // this.service.getStatusDetails(appID).subscribe(response => {
    //     //     // console.log('Status Data', response, typeof (response['data'][1].wac_date));
    //     //     if (typeof response !== null) {
    //     //         this.spinner.hide();
    //     //         this.statusDetails = response['data'].map(ele => {
    //     //             ele['type'] = ele['wac_date'] === null ? 'NA' : (ele['wac_date'] === 'null' ? 'NA' : ele['wac_date']);
    //     //             return ele;
    //     //         });
    //     //         console.log('this.statusDetails', this.statusDetails);
    //     //         this.modalRef = this.modalService.show(statusModal, { class: 'customModalSize' });
    //     //         // this.getStatusCount();
    //     //     } else {
    //     //         this.toastr.warningToastr('Couldnot found Data');
    //     //         this.spinner.hide();
    //     //     }
    //     // });
    // }
    openStatusModal(statusModal, appID) {
        this.spinner.show();
        this.service.getStatusDetails(appID).subscribe(response => {
            // console.log('Status Data', response, typeof (response['data'][1].wac_date),'openStatusModal');
            if (typeof response !== null) {
                this.spinner.hide();
                this.statusDetails = response['data'].map(ele => {
                    ele['type'] = ele['wac_date'] === null ? 'NA' : (ele['wac_date'] === 'null' ? 'NA' : ele['wac_date']);
                    return ele;
                });
                console.log('this.statusDetails', this.statusDetails);
                this.modalRef = this.modalService.show(statusModal, { class: 'customModalSize' });
                // this.getStatusCount();
            } else {
                this.toastr.warningToastr('Couldnot found Data');
                this.spinner.hide();
            }
        });
    }
    downloadFile(id, hasFile) {
        // const url = AppConstants.BASE_API_URL + 'api/mediaDownload/' + 'wfAllocation_' + id + '?access-token=' + this.xAuth;
        // const win = window.open(url, '_blank');
        // win.focus();
        // window.location.href = AppConstants.BASE_API_URL + 'api/mediaDownload/' + 'wfAllocation_' + id + '?access-token=' + this.xAuth;
        // if(hasFile !== null){
        return AppConstants.BASE_API_URL + 'api/mediaDownload/' + 'wfAllocation_' + id + '?access-token=' + this.xAuth;
        // }else{
        //     this.toastr.warningToastr('No files available');
        // }

    }
    public getNextStepData(data) {
        this.nextService.getNextStepActionDetails(data.id).subscribe(successResponse => {
            if (successResponse !== null) {
                this.nextStepData = successResponse['data'];
                console.log(this.nextStepData);
                console.log(this.nextStepData.steps.trans.length);
                if (this.nextStepData.steps.trans.length === 3) {
                    console.log('GOV');
                    this.isGovernment = true;
                    this.tranGID = this.nextStepData.steps.trans.filter(ele => ele.transition_desc === 'FORWARD_TO_GOVT');
                }
                // this.tranFID = this.nextStepData.steps.trans.filter(ele => ele.transition_desc === 'APPROVE');
                this.tranRID = this.nextStepData.steps.trans.filter(ele => ele.transition_desc === 'REJECT');
                this.tranAID = this.nextStepData.steps.trans.filter(ele => ele.transition_desc === 'ISSUE_ALLOCATION_ORDER');
                console.log('*************', this.tranAID.length);
                // this.toastr.successToastr(successResponse['message']);
                console.log(successResponse);
                // this.router.navigate(["../"], { relativeTo: this.resourceActiveRoute });
            } else {
                this.toastr.dangerToastr('Something went wrong..!!');
            }
        });
    }
    public submitApplicationDetails() {
        const FORM_DATA = new FormData();
        if (this.appSts2Check === 'G') {
            this.SUBMIT_DETAILS = {
                'appId': Number(this.applicationDt.id),
                'wfId': Number(this.nextStepData.wf_id),
                'stId': Number(this.nextStepData.steps.id),
                'trId': this.tranGID !== undefined ? this.tranGID[0].id : null,
                'toId': this.tranGID !== undefined ? this.tranGID[0].wf_step_to_id : null,
                'remarks': this.desc
            };
        } else {
            this.SUBMIT_DETAILS = {
                'appId': Number(this.applicationDt.id),
                'wfId': Number(this.nextStepData.wf_id),
                'stId': Number(this.nextStepData.steps.id),
                'trId': this.appSts2Check === 'Y' ? this.tranAID[0].id : this.tranRID[0].id,
                'toId': this.appSts2Check === 'Y' ? this.tranAID[0].wf_step_to_id : this.tranRID[0].wf_step_to_id,
                'remarks': this.desc
            };
        }
        console.log('DATA:----', this.SUBMIT_DETAILS, typeof (this.SUBMIT_DETAILS.wfId));
        FORM_DATA.append('appId', this.SUBMIT_DETAILS.appId);
        FORM_DATA.append('wfId', (this.SUBMIT_DETAILS.wfId));
        FORM_DATA.append('stId', this.SUBMIT_DETAILS.stId);
        FORM_DATA.append('trId', this.SUBMIT_DETAILS.trId);
        FORM_DATA.append('toId', this.SUBMIT_DETAILS.toId);
        FORM_DATA.append('remarks', this.SUBMIT_DETAILS.remarks);
        const FILE = this.file !== null ? this.file : null;
        if (this.file !== null) {
            FORM_DATA.append("allocation_order", FILE, FILE.fileName);
        } else {
            FORM_DATA.append("allocation_order", FILE);
        }

        this.spinner.show();
        this.nextService.submitWorkflow(FORM_DATA).subscribe(successResponse => {
            console.log(successResponse);
            console.log('DATA:----', this.SUBMIT_DETAILS);
            if (successResponse !== null) {
                this.spinner.hide();
                this.setPageDetails(0, 1, null);
                this.modalRef.hide();
                this.toastr.successToastr(successResponse.message);
            } else {
                this.toastr.warningToastr('Something went wrong');
            }
        }, errorResponse => {
            this.toastr.warningToastr('Something went wrong');
        });
    }

    public getQueryData(ind) {
        console.log('Data', ind, 'Count', this.count);
        if (ind < 2) {
            return '1st Query Raised';
        } else if (ind > 2) {
            return '2nd Query Raised';
        }
    }

    fileChange(event) {
        console.log(event);
        if (event.target.files.length > 0) {
            const file = event.target.files[0] as File;
            console.log(file);
            if (file.size <= 4000000) {
                this.file = file;
                this.fileName = file.name.includes(',') ? file.name.replace(',', ' ') : file.name;
            } else {
                this.toastr.warningToastr('File size must be less than 4MB');
            }
        }
    }

}
