import { Component, OnInit, ViewEncapsulation, ElementRef, HostListener } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { AppConstants } from '@app/app.constants';
import { citizenModel, paymentDetails } from './../citizenSubmit';
import { CommonFormService } from './../common-form.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { nameValidator, ceNameValidator, comboboxValidator, emailValidator, panCardValidator, numberValidator, pinNumberValidator, dateValidator } from '@app/validators/custom.validators';
import { filter, finalize } from 'rxjs/operators';
import { threadId } from 'worker_threads';
import Swal from 'sweetalert2';
import { CommonService } from '@app/services/common/common.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { DatePipe } from '@angular/common';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import html2PDF from 'jspdf-html2canvas';
import { EncryptdecryptService } from '@app/services/encryption/encryptdecrypt.service';
//import{ EncryptdecryptService } from '../../../services/encryption/encryptdecrypt.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RegistrationFormComponent implements OnInit {

  modalRef: BsModalRef;
  public hasSelected = false;
  public citizenForm: FormGroup;
  public isUpdate = false;
  public isEdit = false;
  public loginType;
  public isApproverLogin = false;
  public hasError1;
  public hasError2;
  public hasError3;
  public hasError4;
  public hasError5;
  public hasError6;
  public hasError7;
  public hasError8;
  public hasError9;
  public phaseReq: FormArray = this.citizenFB.array([]);
  public purpose = [];
  public application = [];
  public industry = [];
  public district: any = [];
  public block = [];
  public operational = [];
  public river = [];
  public dam = [];
  public getIndex = '';
  public temp = '';
  public pageDetails:any= [];
  public isView = true;
  public ApplicationId = '';
  public xAuth;
  public riverSelected = true;
  public damSelected = true;
  public paymentDetails: paymentDetails;
  public isConstructional = false;
  public isOperational = true;
  public hasAllocation = false;
  public noOfPhase = 0;
  public isGround = false;
  public isGround2 = false;
  public hasCGWA = false;
  public otherPurpose = false;
  public bothPurpose = false;
  public isOtherIndustry = false;
  public exstData = [];
  public exstData2 = [];
  public allocatedRiver = 'NA';
  public allocatedDam = 'NA';
  public allocatedQuantity: any;
  public showPaymentDeatils = false;
  public showPhasing = false;
  public phasingDetails = [];
  public extraValueEn =0;
  public extraValueRed;
  public fromDate;
  public toDate = new Date();
  public resDate = new Date();
  public DATA: any = [];
  public phaseVal = [];
  public phaseVal1;
  public editStatus;
  public editAppId = 0;
  public indName = false;
  // public startDate = new Date();
  public data = [];
  public pathType = '';
  public file1: any;
  public file2: any;
  public file3: any;
  public file4: any;
  public file5: any;
  public file6: any;
  public file7: any;
  public file8: any;
  public file9: any;
  public file10: any;
  public file11: any;
  public isDam = true;
  public isRiver = true;
  public industryID = 0;
  private status: any;
  public applyingForVal = '';
  public isNew = true;
  public appId = 0;
  public isPhasing = true;
  public existing = 'New';
  public minDate: Date;
  public i = 0;
  public singleRecord = false;
  public multipleRecord = false;
  public isDrinking;
  public totalPhases = 0;
  public idDate = '';
  public appDate = '';
  public paymentData = [];
  phaseDocPath: any;
  constructor(
    private el: ElementRef,
    private modalService: BsModalService,
    private citizenFB: FormBuilder,
    private service: CommonFormService,
    private toastr: ToastrClientService,
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClientService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService,
    private datePipe: DatePipe,
    private encryptDecrypt: EncryptdecryptService
  ) {
    this.createForm();
  }

  //pdf Download form
  public pdfDwn() {
    var data = document.getElementById('contentToConvert');
    html2PDF(data, {
      jsPDF: {
        format: 'a4',
      },
      imageType: 'image/jpeg',
      imageQuality: 1,
      margin: {
        top: 40,
        right: 0,
        bottom: 20,
        left: 0
      },
      output: 'Application.pdf'
    });
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.loginType = false;
    // this.isDrinking = true;
    this.route.snapshot.paramMap.get('id');
    this.ApplicationId = this.route.snapshot.paramMap.get('applId');
    this.route.url.subscribe(params => {
      this.pathType = params[0].path;
    });
    if (this.pathType === 'edit-form') {
      this.isView = true;
      this.isEdit = true;
      this.setPageDetails(this.route.snapshot.paramMap.get('applId'));
    } else if (this.pathType === 'view-form') {
      this.pathType = 'View';
      this.isView = true;
      this.citizenForm.disable();
      this.setPageDetails(this.route.snapshot.paramMap.get('applId'));
    } else if (this.pathType === 'p2') {
      this.pathType = 'Create';
    } else if (this.pathType === 'view') {
      this.pathType = 'View';
      this.citizenForm.disable();
      this.getPaymentData(this.route.snapshot.paramMap.get('applId'));
      this.setPageDetails(this.route.snapshot.paramMap.get('applId'));
    }
    this.xAuth = localStorage.getItem('access_token');
    // console.log(this.xAuth);
    //  //console.log('LOGIN TYPE>>>>', this.loginType);
    // this.addPhase();
    /*     this.phaseReq.push(this.citizenFB.group({
          id: 0,
          phaseWise: '',
          from_date: '',
          to_date: '',
          unit: '',
        })); */
    this.getAllApplicationData();
  }
  // @HostListener('input', ['$event']) onInputChange(event) {
  //   const initalValue = this.el.nativeElement.value;

  //   this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
  //   if ( initalValue !== this.el.nativeElement.value) {
  //     event.stopPropagation();
  //   }
  // }
  public createForm() {
    this.citizenForm = this.citizenFB.group({
      appType: 'DOWR',
      email: ['', Validators.compose([emailValidator, Validators.required])],
      name: ['', Validators.compose([Validators.required, Validators.pattern('[0-9a-zA-Z ]+')])],
      purpose: [1, Validators.compose([Validators.required])],
      purOthers: null,
      bulkPrecent: 0,
      industryPercent: 0,
      ceName: ['', Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
      appFor: [2, Validators.compose([Validators.required])],
      ce_phone: ['', Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])],
      indType: ['', Validators.compose([comboboxValidator, Validators.required])],
      indOters: null,
      distId: ['', Validators.compose([comboboxValidator, Validators.required])],
      blockId: ['', Validators.compose([comboboxValidator, Validators.required])],
      address: ['', Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
      panNo: ['', Validators.compose([panCardValidator, Validators.required])],
      pinCode: ['', Validators.compose([pinNumberValidator, Validators.required])],
      presentCap: ['', Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
      futureCap: ['', Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
      quanIntended: 0,
      opQuant: ['', Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
      latitude: ['', Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
      longitude: ['', Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
      riverId: 0,
      damId: 0,
      sourceRiverId: 0,
      sourceDamId: 0,
      surfaceId: 0,
      opQuantSur: 0,
      presentUnit: [null, Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/),Validators.pattern(/^[a-zA-Z]+$/) ])],
      futureUnit: [null, Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/),Validators.pattern(/^[a-zA-Z]+$/) ])],
      cgwa: null,
      cgwaFileDocName: '',
      cgwaCertificate: null,
      cgwaCertificateDocFileName: '',
      industryLatitude: ['', Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/) ])],
      industryLongtitude: ['', Validators.compose([Validators.required, Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
      indId: 0,
      phaseReq: this.citizenFB.array([]),
      intake: null,
      intakeFileDocName: '',
      industry: null,
      industryDocFileName: '',
      recomendation: null,
      recomendationDocFileName: '',
      mou: null,
      mouDocFileName: '',
      certificate: null,
      certificateDocFileName: '',
      quantity: null,
      quantityDocFileName: '',
      jointReport: null,
      jointReportDocFileName: '',
      layout: null,
      layoutDocFileName: '',
      disposal: null,
      disposalDocFileName: '',
      scheme: null,
      schemeDocFileName: '',
      waterMgmt: null,
      waterMgmtDocFileName: '',
      allocationOrder: null,
      allocationOrderDocFileName: '',
      payDocProof: null,
      payDocProofDocFileName: '',
      currAllocDoc: null,
      currAllocDocFileName: '',
      recFromIPCOLDoc: null,
      recFromIPCOLDocFileName: '',
      indDetails: null,
      indDetailsDocFileName: '',
      paidAmount: '',
      currentAllocQnty: '',
      applyFor: '',
    }, {
      validator: this.unitValidatorArray('phaseReq')
    });
  }

  unitValidatorArray(unit: string) {
    //console.log(unit);
    return (group: FormGroup) => {
      const unitVal = group.controls[unit];
      this.phaseVal = unitVal.value;
      const LAST_INDEX_VAL = this.phaseVal[this.phaseVal.length - 1];
      for (this.i = 0; this.i < this.phaseVal.length - 1; this.i++) {
        // //console.log(this.phaseVal[this.i]);
        if (Number(this.phaseVal[0].unit) >= Number(LAST_INDEX_VAL.unit) && (this.phaseVal[1].unit === '')) {
          return this.phaseVal1.setErrors({ invalid: true });
        } else if ((Number(this.phaseVal[this.i + 1].unit) > Number(LAST_INDEX_VAL.unit))) {
          return this.phaseVal1.setErrors({ invalid: true });
        } else if ((Number(this.phaseVal[this.i + 1].unit) <= Number(this.phaseVal[this.i].unit)) && (this.phaseVal[this.i + 1].unit !== '')) {
          return this.phaseVal1.setErrors({ invalid: true });
        }
      }
    };
  }
  unitValidator(unit: string, quant: string) {
    //console.log(unit, quant);
    return (group: FormGroup) => {
      const unitVal = group.controls[unit];
      this.phaseVal1 = unitVal;
      //console.log('this.phaseVal********', this.phaseVal, this.phaseVal1);
    };
  }
  public setPageDetails(applicationNo) {
    this.spinner.show();
    this.service.getApplicationViewdata(applicationNo).subscribe(response => {
      console.log(response);
      this.editStatus = response.data.applicationDetails.status_id;
      this.editAppId = response.data.applicationDetails.id;
      if (response !== null) {
        this.spinner.hide();
        this.pageDetails = response['data'];
        // console.log('  this.pageDetails ', this.pageDetails);
        this.setFormData(this.pageDetails);

        //set the phase doc path
        // this.phaseDocPath = this.pageDetails['phaseReq'][0].cgwa_certificate;
        this.phaseDocPath = this.pageDetails['phaseReq'][0].id;
        // console.log('this.phaseDocPath', this.phaseDocPath);
      }
      this.spinner.hide();
    });
    this.spinner.hide();
  }

  public setFormData(pageDetails) {
    if (this.isUpdate) {
      this.getBlockByDistId(this.exstData['industriesDetails'] === undefined ? 0 : this.exstData['industriesDetails'].district_id);
    } else {
      this.getBlockByDistId(this.pageDetails['industriesDetails'].district_id);
    }

    this.citizenForm.controls.appType.patchValue(pageDetails['applicationDetails'] !== undefined ? pageDetails['applicationDetails'].app_type : '');
    this.citizenForm.controls.email.patchValue(pageDetails['applicationDetails'].email);
    this.citizenForm.controls.purpose.patchValue(pageDetails['applicationDetails'].purpose_id);
    this.addOtherPurpose(pageDetails['applicationDetails'].purpose_id);
    if (this.bothPurpose === true) {
      this.citizenForm.controls.bulkPercent.patchValue(pageDetails['applicationDetails'].bulk_percent !== null || pageDetails['applicationDetails'].bulk_percent !== undefined ? pageDetails['applicationDetails'].bulk_percent : 0);
      this.citizenForm.controls.industryPercent.patchValue(pageDetails['applicationDetails'].industrial_percent !== null || pageDetails['applicationDetails'].bulk_percent !== undefined ? pageDetails['applicationDetails'].bulk_percent : 0);
    }
    this.citizenForm.controls.ceName.patchValue(pageDetails['applicationDetails'].ce_name);
    this.citizenForm.controls.appFor.patchValue(pageDetails['applicationDetails'].allocation_type_id);
    this.citizenForm.controls.name.patchValue(pageDetails['applicationDetails'].name);
    this.citizenForm.controls.ce_phone.patchValue(pageDetails['applicationDetails'].mob);

    this.citizenForm.controls.applyFor.patchValue(pageDetails['applicationDetails'].app_for);
    this.idDate = pageDetails['applicationDetails'].id + '/' + this.commonService.transformDate(pageDetails['applicationDetails'].created_on).split('-')[2];
    this.appDate = this.commonService.transformDate(pageDetails['applicationDetails'].created_on);
    this.citizenForm.controls.opQuant.patchValue(Number(pageDetails['waterReq'].op_quantity) / 2500);

    this.selectTypeOfaction(null, pageDetails['applicationDetails'].app_for);
    this.citizenForm.controls.payDocProofDocFileName.patchValue(pageDetails['applicationDetails'].payment_doc);
    this.citizenForm.controls.currentAllocQnty.patchValue(pageDetails['waterReq'].op_quantity / 2500);
    this.citizenForm.controls.paidAmount.patchValue((pageDetails['waterReq'].op_quantity / 2500) * 150000);

    this.citizenForm.controls.indType.patchValue(pageDetails['industriesDetails'].industry_id);
    this.citizenForm.controls.distId.patchValue(pageDetails['industriesDetails'].district_id);
    this.getBlockByDistId(pageDetails['industriesDetails'].district_id);
    this.citizenForm.controls.blockId.patchValue(pageDetails['industriesDetails'].block_id);
    this.citizenForm.controls.address.patchValue(pageDetails['industriesDetails'].address);
    const decrypted = this.encryptDecrypt.decryptionAES(pageDetails['industriesDetails'].pan_no);

    this.citizenForm.controls.panNo.patchValue(decrypted);
    this.citizenForm.controls.pinCode.patchValue(pageDetails['industriesDetails'].pin_code);

    this.citizenForm.controls.presentCap.patchValue(pageDetails['capacities'].present_capacity_in_kld);
    this.citizenForm.controls.futureCap.patchValue(pageDetails['capacities'].future_capacity_in_kld);
    this.citizenForm.controls.presentUnit.patchValue(pageDetails['capacities'].present_capacity_unit);
    this.citizenForm.controls.futureUnit.patchValue(pageDetails['capacities'].future_capacity_unit);



    this.citizenForm.controls.intakeFileDocName.patchValue(pageDetails['locationDetails'].intake_loc);
   
    this.citizenForm.controls.industryDocFileName.patchValue(pageDetails['locationDetails'].industry_loc);
    this.citizenForm.controls.recomendationDocFileName.patchValue(pageDetails['locationDetails'].recomend_letter);
    this.citizenForm.controls.mouDocFileName.patchValue(pageDetails['locationDetails'].mou_signed);

    this.citizenForm.controls.latitude.patchValue(pageDetails['locationDetails'].intake_latitude);
    this.citizenForm.controls.longitude.patchValue(pageDetails['locationDetails'].intake_longitude);
    this.citizenForm.controls.industryLatitude.patchValue(pageDetails['locationDetails'].industry_latitude);
    this.citizenForm.controls.industryLongtitude.patchValue(pageDetails['locationDetails'].industry_longitude);

    this.citizenForm.controls.riverId.patchValue(pageDetails['waterReq'].river_id);
    this.citizenForm.controls.damId.patchValue(pageDetails['waterReq'].dam_id);

    this.validate();
    this.citizenForm.controls.cgwaCertificateDocFileName.patchValue(pageDetails['waterReq'].cgwa_certificate);
   
    this.addPhase(null, pageDetails['phaseReq']);
    this.totalPhases = pageDetails['phaseReq'].length === 0 ? 0 : pageDetails['phaseReq'].length;
    this.citizenForm.controls.jointReportDocFileName.patchValue(pageDetails['waterReq'].joint_report);
    this.citizenForm.controls.cgwaFileDocName.patchValue(pageDetails['phaseReq'].length === 0 ? null : pageDetails['phaseReq'][0].cgwa_certificate);

    this.citizenForm.controls.certificateDocFileName.patchValue(pageDetails['waterReq'].certificate);
   
    this.citizenForm.controls.quanIntended.patchValue(pageDetails['waterReq'].operational_source_id);
    if (pageDetails['waterReq'].operational_source_id === 1) {
      this.isGround2 = true;
      this.isGround = true;
    }
    this.citizenForm.controls.surfaceId.patchValue(pageDetails['waterReq'].source_id);
    this.citizenForm.controls.quantityDocFileName.patchValue(pageDetails['waterReq'].cal_of_quantity);

    this.citizenForm.controls.layoutDocFileName.patchValue(pageDetails['watermgmt'] !== null ? pageDetails['watermgmt'].layout_drawal : null);
    this.citizenForm.controls.disposalDocFileName.patchValue(pageDetails['watermgmt'] !== null ? pageDetails['watermgmt'].disposal_method : null);

    this.citizenForm.controls.schemeDocFileName.patchValue(pageDetails['watermgmt'] !== null ? pageDetails['watermgmt'].drawal_water : null);
    this.citizenForm.controls.waterMgmtDocFileName.patchValue(pageDetails['watermgmt'] !== null ? pageDetails['watermgmt'].water_mgmt : null);
    this.citizenForm.controls.allocationOrderDocFileName.patchValue(pageDetails['watermgmt'] !== null ? pageDetails['watermgmt'].allocation_order : null);
    this.citizenForm.controls.indDetailsDocFileName.patchValue(pageDetails['watermgmt'] !== null ? pageDetails['watermgmt'].industry_details : null);

    this.citizenForm.controls.opQuantSur.patchValue(Number(pageDetails['waterReq'].op_quantity_sur) / 2500);

 
  }
  public fileDownload(fileKey, appID) {
    return AppConstants.BASE_API_URL + 'api/mediaDownload/' + fileKey + '_' + appID + '?access-token=' + this.xAuth;
  }

// public phaseFileDownload(fileKey: string, appID: any) {
//     const url =
//         AppConstants.BASE_API_URL +
//         'api/mediaDownload/' +
//         fileKey + '_' +
//         appID +
//         '?access-token=' +
//         this.xAuth;

//     console.log('Generated URL:', url);

//     return url;
// }
  public setpPaymentDetails(data) {

   
    const PAID_MONEY = Number(this.citizenForm.controls.paidAmount.value); /* Number(this.exstData['applicationDetails'].paid_amount); */
    const ENHANCEMENT_MONEY = Number(data.opQuant * 150000);
  
    if (PAID_MONEY < ENHANCEMENT_MONEY) {
      this.extraValueEn = ENHANCEMENT_MONEY - PAID_MONEY;
    }
    const DIST_NAME = this.district.filter(ele => ele.id === Number(data.distId))[0].district_name;
    const SECURITY_MONEY = this.isDrinking ? 0 : this.isOperational ? (data.opQuant * 150000) : (data.opQuantSur * 150000);
    const PIN = Number(this.citizenForm.controls.pinCode.value);
    const ENH_VAL = this.applyingForVal === 'Enhancement' || this.applyingForVal === 'Enhancement with Phasing' || this.applyingForVal === 'Enhancement with Rephasing';
    const RED_VAL = this.applyingForVal === 'Reduction' || this.applyingForVal === 'Reduction with Phasing' || this.applyingForVal === 'Reduction with Rephasing';
    const NO_VAL = this.applyingForVal === 'Phasing' || this.applyingForVal === 'Rephasing';
    const RENEWAL_VAL = this.applyingForVal === 'Renewal';
    const REGULARISATION_VAL = this.applyingForVal === 'Regularisation';
    const DIFF_AMOUNT = ENH_VAL && PAID_MONEY < ENHANCEMENT_MONEY ? this.allocatedQuantity > data.opQuant ? (((Number(this.allocatedQuantity) * 100000) - (Number(data.opQuant) * 100000)) / 100000) : (((Number(data.opQuant) * 100000) - (Number(this.allocatedQuantity) * 100000)) / 100000) : 0;
   
    localStorage.setItem('DIFF', (DIFF_AMOUNT).toString());
    localStorage.setItem('diffValue', DIFF_AMOUNT.toString());
   
    this.paymentDetails = {
      IndustryName: data.ceName,
      Industry_Code: null,
      Contact: data.ce_phone,
      Address: data.address,
      Pin: PIN,
      EmailID: data.email,
      District: DIST_NAME,
      PaymentTowards: data.quanIntended,
      Trs_Head_Proces: '0700-80-800-0097-02240-000',
      Trs_Head_Secu: '8443-00-116-1677-91333-000',
      Application_Typ: ENH_VAL ? 'Enhancement' : this.applyingForVal,
      Amount_Proces: 1000,
      Amount_Secu: ((ENH_VAL || RED_VAL) && PAID_MONEY < ENHANCEMENT_MONEY) ? this.extraValueEn : RED_VAL && PAID_MONEY >= ENHANCEMENT_MONEY ? 0 : NO_VAL ? 0 : RENEWAL_VAL || REGULARISATION_VAL ? 0 : SECURITY_MONEY
      // Amount_Secu:((ENH_VAL || RED_VAL) && PAID_MONEY < ENHANCEMENT_MONEY) ? this.extraValueEn : RED_VAL && PAID_MONEY >= ENHANCEMENT_MONEY ? 0 : NO_VAL ? 0 : SECURITY_MONEY
    };
    console.log(this.paymentDetails, 'show payment details');
    var responseString = JSON.stringify(this.paymentDetails);
    console.log(responseString);

    localStorage.setItem('trs_response', responseString);
    // this.service.postPaymentData(this.paymentDetails).subscribe(response => {
    //   console.log('GetRESP___________________________________',response);
    //   // localStorage.setItem('trs_response', response);
    // });
    // this.spinner.hide();
    // //console.log(this.paymentDetails);
  }
  public setValueApp(event) {
    // console.log('%THIS', this.industryID, 'color: green;',event);
    this.indName = false;
    this.createForm();
    if (event.target.id === 'existCon') {
      this.existing = event.target.id;
      // console.log(this.existing,'existing');
      localStorage.setItem('app_type', this.existing);
      this.isUpdate = true;
      this.isNew = false;
      this.citizenForm.controls['paidAmount'].setValidators([Validators.compose([Validators.required])]);
      this.citizenForm.controls['currentAllocQnty'].setValidators([Validators.compose([Validators.required])]);
      this.citizenForm.controls['applyFor'].setValidators([Validators.compose([Validators.required])]);
      this.getAllIndusrtyData();
      this.getAllApplicationData();
    } else if (event.target.id === 'newCon') {
      //console.log('**********************************');
      this.existing = 'New';
      localStorage.setItem('app_type', this.existing);
      localStorage.setItem('indusId', '0');
      this.phaseReq = this.citizenForm.controls['phaseReq'] as FormArray;
      this.phaseReq.clear();
      this.industryID = 0;
      this.getAllApplicationData();
      this.isUpdate = false;
      this.hasSelected = false;
      this.isNew = true;
      this.citizenForm.get('paidAmount').clearValidators();
      this.citizenForm.get('paidAmount').updateValueAndValidity();

      this.citizenForm.get('currentAllocQnty').clearValidators();
      this.citizenForm.get('currentAllocQnty').updateValueAndValidity();

      this.citizenForm.get('applyFor').clearValidators();
      this.citizenForm.get('applyFor').updateValueAndValidity();

    }
    // //console.log(this.isUpdate);
  }
  public showDetails(event) {
    this.phaseReq.clear();
    // console.log(event,event.industry_name,'eve');
    this.indName = true;
    const IND_NAME = event.industry_name;
    // this.citizenForm.controls.ceName.setValue(IND_NAME);
    // this.citizenForm.controls.ceName.setValue(IND_NAME);
    if (event !== undefined) {
      this.industryID = event.serial_no;
      //console.log(event, this.industryID);
    }
    if (typeof event === 'undefined') {
      this.hasSelected = false;
    } else {
      this.hasSelected = true;
    }
    this.spinner.show();
    this.service.getExistingApplicationdata(this.industryID).subscribe(successResponse => {
      console.log(successResponse,'successResponse');
      if (successResponse !== undefined) {
        this.exstData = successResponse['data'];
        this.phasingDetails = this.exstData['phaseReq'] === undefined ? '' : this.exstData['phaseReq'];
        //console.log(this.phasingDetails);
        //console.log('DATA LENGTH', Object.keys(this.exstData).length);
        //console.log('DATA LENGTH', this.exstData);
        if (Object.keys(this.exstData).length > 1) {
          this.setFormData(this.exstData);
          this.citizenForm.controls.ceName.setValue(IND_NAME);
          this.appId = this.exstData['applicationDetails'].id;
          //console.log('this.appId**************************', this.appId);
          // this.addPhase(this.exstData['phaseReq'].length);
          // //console.log('this.dam', this.dam, this.exstData['waterReq'].dam_id, this.dam.find(res => res.id === this.exstData['waterReq'].dam_id));
          this.spinner.hide();
          this.allocatedQuantity = this.exstData['waterReq'].op_quantity / 2500;
          this.citizenForm.controls.opQuant.setValue(this.allocatedQuantity);
          //console.log(this.river, this.exstData['waterReq'].river_id);
          this.allocatedRiver = this.exstData['waterReq'].river_id === null ? '' : this.exstData['waterReq'].river_id === 0 ? '' : (this.exstData['waterReq'].river_id !== 0 || this.exstData['waterReq'].river_id !== null) ? this.river.find(res => res.id === this.exstData['waterReq'].river_id).river_name : '';
          this.allocatedDam = this.exstData['waterReq'].dam_id === null ? '' : this.exstData['waterReq'].dam_id === 0 ? '' : (this.exstData['waterReq'].dam_id !== 0 || this.exstData['waterReq'].dam_id !== null) && this.exstData['waterReq'].dam_id !== undefined ? this.dam.find(res => res.id === this.exstData['waterReq'].dam_id).dam_name : 0;
          // //console.log(this.allocatedQuantity);
        } else {
          this.spinner.hide();
          // //console.log(this.dam);
          this.citizenForm.reset();
          // this.citizenForm.controls.opQuant.patchValue(Number(this.exstData['waterReq'].op_quantity));
          // this.citizenForm.controls.riverId.patchValue(this.exstData['waterReq'].river_id);
          // this.citizenForm.controls.damId.patchValue(this.exstData['waterReq'].dam_id);
          this.citizenForm.controls.ceName.setValue(IND_NAME);
          if (this.exstData['waterReq'].length > 1) {
            this.multipleRecord = true;
            this.singleRecord = false;
            this.exstData2 = this.exstData['waterReq'];
            //console.log(this.exstData2)
            // this.exstData2.forEach(i => {
            //   this.exstData2[i].river_name = (this.exstData2[i].river_id === undefined || this.exstData2[i].river_id === null) ? '' : this.exstData2[i].river_id === 0 ? '' : (this.exstData2[i].river_id !== 0 || this.exstData2[i].river_id !== null) && this.exstData2[i].river_id !== undefined ? this.river.find(res => res.id === this.exstData2[i].river_id).river_name : 0;
            //   this.exstData2[i].dam_name = this.exstData2[i].dam_id === null ? '' : this.exstData2[i].dam_id === 0 ? '' : (this.exstData2[i].dam_id !== 0 || this.exstData2[i].dam_id !== null) && this.exstData2[i].dam_id !== undefined && this.dam !== undefined ? this.dam.find(res => res.id === this.exstData2[i].dam_id).dam_name : 0;
            // });
            for (let i = 0; i <= this.exstData2.length - 1; i++) {
              //console.log(this.exstData2,'exstData2');
              this.exstData2[i].river_name = (this.exstData2[i].river_id === undefined || this.exstData2[i].river_id === null) ? '' : this.exstData2[i].river_id === 0 ? '' : (this.exstData2[i].river_id !== 0 || this.exstData2[i].river_id !== null) && this.exstData2[i].river_id !== undefined ? this.river.find(res => res.id === this.exstData2[i].river_id).river_name : 0;
              this.exstData2[i].dam_name = this.exstData2[i].dam_id === null ? '' : this.exstData2[i].dam_id === 0 ? '' : (this.exstData2[i].dam_id !== 0 || this.exstData2[i].dam_id !== null) && this.exstData2[i].dam_id !== undefined && this.dam !== undefined ? this.dam.find(res => res.id === this.exstData2[i].dam_id).dam_name : 0;
            }
          } else {
            this.multipleRecord = false;
            this.singleRecord = true;
            this.allocatedQuantity = this.exstData['waterReq'][0].op_quantity;
            this.citizenForm.controls.opQuant.setValue(this.allocatedQuantity);
            this.allocatedRiver = this.exstData['waterReq'][0].river_id === null ? '' : this.exstData['waterReq'][0].river_id === 0 ? '' : (this.exstData['waterReq'][0].river_id !== 0 || this.exstData['waterReq'][0].river_id !== null) && this.exstData['waterReq'][0].river_id !== undefined ? this.river.find(res => res.id === this.exstData['waterReq'][0].river_id).river_name : 0;
            this.allocatedDam = this.exstData['waterReq'][0].dam_id === null ? '' : this.exstData['waterReq'][0].dam_id === 0 ? '' : (this.exstData['waterReq'][0].dam_id !== 0 || this.exstData['waterReq'][0].dam_id !== null) && this.exstData['waterReq'][0].dam_id !== undefined && this.dam !== undefined ? this.dam.find(res => res.id === this.exstData['waterReq'][0].dam_id).dam_name : 0;
            this.citizenForm.controls.currentAllocQnty.setValue(this.allocatedQuantity);
            this.citizenForm.controls.paidAmount.setValue(Math.round(((Number(this.allocatedQuantity) * 150000) + Number.EPSILON) * 100) / 100);
          }
        }
      }
    }, errResponse => {
      this.spinner.hide();
      this.hasSelected = false;
      this.citizenForm.reset();
      this.toastr.dangerToastr(errResponse['error'].message);
    });
    // this.spinner.hide();
  }
  public setAppVale(data) {
    const DATA = data;
    // //console.log(DATA);
    this.allocatedQuantity = DATA.op_quantity;
    this.citizenForm.controls.currentAllocQnty.setValue(this.allocatedQuantity);
    this.citizenForm.controls.paidAmount.setValue(Math.round(((Number(this.allocatedQuantity) * 150000) + Number.EPSILON) * 100) / 100);
  }

  hchange() {
    // console.log('dasdghasd');

  }

  //   handleDateChange(enteredDate: string | Date, i: number) {
  //     console.log(enteredDate,i,'handleDateChange');

  //     const phaseReqArray = this.citizenForm.get('phaseReq') as FormArray;

  //     // Ensure phaseReqArray is initialized and the specific form group exists
  //     if (!phaseReqArray || !phaseReqArray.at(i)) {
  //         console.warn('FormArray or specific FormGroup not initialized');
  //         return; // Exit early if the form is not initialized
  //     }

  //     let specificFormGroup = phaseReqArray.at(i) as FormGroup;

  //     const phaseFromDateValue = specificFormGroup.get('from_date') ? specificFormGroup.get('from_date').value : null;
  //     const phaseToDateValue = enteredDate ? new Date(enteredDate) : new Date(phaseFromDateValue);

  //     // Ensure from_date and to_date are valid
  //     if (!phaseFromDateValue || !phaseToDateValue) {
  //         console.warn('from_date or to_date is not set');
  //         return; // Exit if either date is not set
  //     }

  //     const fromDate = new Date(phaseFromDateValue);
  //     const toDate = new Date(phaseToDateValue);

  //     // Check if the date range is valid
  //     if (fromDate < toDate) {
  //         console.log('Valid Date Range');
  //         specificFormGroup.get('to_date').setValue('');
  //         // Increment the next phase's "from_date" by 1 day, if it exists
  //         if (i + 1 < phaseReqArray.length) {
  //             specificFormGroup = phaseReqArray.at(i + 1) as FormGroup;
  //             toDate.setDate(toDate.getDate() + 1); // Increment by 1 day
  //             if (specificFormGroup.get('from_date')) {
  //                 specificFormGroup.get('from_date').setValue(toDate);
  //             }
  //         }
  //     } else {
  //       specificFormGroup.get('to_date').setValue('');
  //         console.log("Invalid Date Range");
  //         if (specificFormGroup.get('to_date')) {
  //           let totalValue = specificFormGroup.get('to_date')
  //         console.log( 'else1',totalValue);

  //             specificFormGroup.get('to_date').setValue(''); // Reset to_date if invalid
  //         }
  //         console.log(specificFormGroup.get('to_date'),'hello');

  //         specificFormGroup.get('to_date').setValue('');
  //         this.toastr.warningToastr("To Date can't be less than or equal to From Date");
  //     }
  // }


  //   ChangeDate(i: number) {
  //     console.log('ChangeDate');

  //     // Get the FormArray
  //     const phaseReqArray = this.citizenForm.get('phaseReq') as FormArray;
  //     // Get the FormGroup at the specific index (e.g., index 'i')
  //     let specificFormGroup: any = phaseReqArray.at(i) as FormGroup;
  //     const phaseFromDateValue = specificFormGroup.get('from_date').value;
  //     const phaseValue = specificFormGroup.get('to_date').value;
  //     // Convert the string to a Date object
  //     const dateObject2 = new Date(phaseValue);
  //     const dateObject1 = new Date(phaseFromDateValue);
  //     // Increase the date by one day
  //     dateObject2.setDate(dateObject2.getDate() + 1);
  //     // Convert the updated date back to a string in the desired format (YYYY-MM-DD)
  //     const updatedDateString = dateObject2;
  // console.log(11111111);

  //     if (dateObject1 < dateObject2) {
  //       console.log(22222222);

  //       // Get the FormGroup at the specific next index (e.g., index 'i + 1')
  //       specificFormGroup = phaseReqArray.at(i + 1) as FormGroup;
  //       //Assisnig the value at the specific next index 
  //       specificFormGroup.get('from_date').setValue(updatedDateString);

  //     } else {
  //       //Assisnig the value at the specific next index 
  //       console.log(33333333333);

  //       specificFormGroup.get('to_date').setValue('');
  //       this.toastr.warningToastr("To Date can't be less than or equal to From Date");
  //     }
  //   }
  // //maual Date Change
  //   manualDateChange(manualDate: string, i: number) {
  //     const phaseReqArray = this.citizenForm.get('phaseReq') as FormArray;
  //     const specificFormGroup = phaseReqArray.at(i) as FormGroup;

  //     const phaseFromDateValue = specificFormGroup.get('from_date').value;
  //     const fromDate = new Date(phaseFromDateValue);
  //     const toDate = new Date(manualDate);

  //     if (fromDate < toDate) {
  //         this.ChangeDate(i);
  //     } else {
  //         specificFormGroup.get('to_date').setValue('');
  //         this.toastr.warningToastr("To Date can't be less than or equal to From Date");
  //     }
  // }
sample = 1
  // handleDateChange(enteredDate: string | Date, i: number) {
  //   console.log(enteredDate, i, 'handleDateChange');

  //   const phaseReqArray = this.citizenForm.get('phaseReq') as FormArray;

  //   if (!phaseReqArray || !phaseReqArray.at(i)) {
  //     console.warn('FormArray or specific FormGroup not initialized');
  //     return;
  //   }

  //   let specificFormGroup = phaseReqArray.at(i) as FormGroup;

  //   const phaseFromDateValue = specificFormGroup.get('from_date') ? specificFormGroup.get('from_date').value : null;
  //   const phaseToDateValue = enteredDate ? new Date(enteredDate) : null;

  //   if (!phaseFromDateValue || !phaseToDateValue) {
  //     console.warn('from_date or enteredDate is not valid');
  //     return;
  //   }

  //   const fromDate = new Date(phaseFromDateValue);
  //   const toDate = new Date(phaseToDateValue);

  //   if (fromDate < toDate) {
  //     console.log('Valid Date Range');
  //     if (i + 1 < phaseReqArray.length) {
  //       const nextFormGroup = phaseReqArray.at(i + 1) as FormGroup;
  //       toDate.setDate(toDate.getDate() + 1);
  //       if (nextFormGroup.get('from_date')) {
  //         nextFormGroup.get('from_date').setValue(toDate);
  //       }
  //     }
  //   } else {
  //     console.warn('Invalid Date Range');
  //     const toDateControl = specificFormGroup.get('to_date');
  //     console.log(toDateControl,"toDateControl");
      
  //     if (toDateControl) {
  //       toDateControl.enable();
  //       toDateControl.setValue('');
  //       console.log('Reset to_date to empty string',toDateControl.setValue(''));
  //     } else {
  //       console.error('to_date control not found in the form');
  //     }
  //     specificFormGroup.get('to_date').setValue('');
  //     this.toastr.warningToastr("To Date can't be less than or equal to From Date");
  //     console.log('Form structure:', this.citizenForm.value);
  //   }
  // }






  addPhase(phases, data?) {
    // console.log('phase details:---', data);
    if (data !== undefined) {
      this.phaseReq = this.citizenForm.controls['phaseReq'] as FormArray;
      console.log(this.phaseReq);
      // for (let i = 0; i < data.length ; i++) {
      // while(this.phaseReq.length < this.noOfPhase){
      data.forEach(element => {
        this.phaseReq.push(this.citizenFB.group({
          id: element.id,
          phaseWise: '',
          // from_date: this.commonService.transformDate(element.from_date),
          // to_date: this.commonService.transformDate(element.to_date),
          from_date: element.from_date ? new Date(element.from_date) : null,
          to_date: element.to_date ? new Date(element.to_date) : null,
          unit: (element.unit) / 2500,
          disable: true,
        }));
      });
    }
    if (Number(phases) !== 0) {
      this.phaseReq = this.citizenForm.controls['phaseReq'] as FormArray;
      // //console.log(this.phaseReq);
      for (let i = this.phaseReq.length; i < phases; i++) {
        // while(this.phaseReq.length < this.noOfPhase){
        // console.log(this.phaseReq.length + 1, this.noOfPhase, typeof (this.phaseReq.controls.length), 'no of phases');
        this.citizenForm.controls.opQuant.value === null ? this.citizenForm.controls.opQuant.setValue(this.allocatedQuantity) : this.citizenForm.controls.opQuant.value
        this.phaseReq.push(this.citizenFB.group({
          id: 0,
          phaseWise: '',
          from_date: '',
          to_date: '',
          unit: Number(this.noOfPhase) === (this.phaseReq.length + 1) ? (this.citizenForm.controls.opQuant.value) : '', // this.citizenForm.controls.opQuant.value ['', Validators.compose([Validators.max(this.citizenForm.controls.opQuant.value)])]
          disable: Number(this.noOfPhase) === (this.phaseReq.length + 1) ? true : false,
        }, {
          validator: this.unitValidator('unit', this.citizenForm.controls.opQuant.value)
        }));
        // }
      }
    } /* else {
      //console.log('else......', this.phaseReq);
      //console.log(this.phaseReq.length + 1, this.noOfPhase);
      this.phaseReq.push(this.citizenFB.group({
        id: 0,
        phaseWise: '',
        from_date: '',
        to_date: '',
        unit: Number(this.noOfPhase) === (this.phaseReq.length) ? this.citizenForm.controls.opQuant.value : '',
        disable: Number(this.noOfPhase) === (this.phaseReq.length) ? true : false,
      }));
    } */
  }
  removePhase(index) {
    const pahsea = this.citizenForm.controls['phaseReq'] as FormArray;
    pahsea.removeAt(index);
  }

  // validatePDF(file: File): Promise<boolean> {

  //   console.log(file,88888);

  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     console.log(fileReader,"fileReader");

  //     fileReader.onloadend = (e) => {


  //       const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
  //       let header = '';
  //       for (let i = 0; i < arr.length; i++) {
  //         header += arr[i].toString(16);
  //       }

  //       // PDF files have a header starting with "25504446" in hexadecimal (which is "%PDF" in ASCII)
  //       const isPDF = header === '25504446';
  //       console.log("this is proper pdf ");

  //       resolve(isPDF);
  //     };

  //     fileReader.onerror = (e) => {
  //       reject(e);
  //     };

  //     fileReader.readAsArrayBuffer(file);
  //   });
  // }

  // // ---------------------------------------------------

  //   fileChange(event, type) {
  //     // console.log(type,'HDFGFKM');
  //     console.log(event.target.value,'TYPE PLEASE');
  //    const checkPdf =  this.validatePDF(event.target.value)
  //   //  console.log(checkPdf,"checkPdf");

  //     if (event.target.files.length > 0) {
  //       const file = event.target.files[0] as File;
  //       // console.log(file,"FILES");
  //       switch (type) {
  //         case 'intake': {
  //           const fileType = file.type;
  //           if (file.size <= 4000000 && fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'application/pdf') {
  //             this.citizenForm.controls.intake.setValue(file);
  //             this.citizenForm.controls.intakeFileDocName.setValue(file.name);
  //             //console.log(this.citizenForm.controls.intakeFileDocName.value);
  //           } else {
  //             // this.citizenForm.controls.intake.setErrors({invalidFile: true});
  //             this.toastr.warningToastr('File size must be less than 4MB');
  //             // //console.log('Method Working', this.citizenForm.controls.intake.errors.invalidFile);
  //           }
  //           break;
  //         }
  //         case 'recomendation': {
  //           const fileType = file.type;
  //           if (file.size <= 4000000 && fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'application/pdf') {
  //             this.citizenForm.controls.recomendation.setValue(file);
  //             this.citizenForm.controls.recomendationDocFileName.setValue(file.name);
  //             this.file2 = file.name;
  //           } else {
  //             this.toastr.warningToastr('File size must be less than 4MB');
  //           }
  //           break;
  //         }
  //         case 'mou': {
  //           const fileType = file.type;
  //           if (file.size <= 4000000 && fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'application/pdf'){
  //             this.citizenForm.controls.mou.setValue(file);
  //             this.citizenForm.controls.mouDocFileName.setValue(file.name);
  //           } else {
  //             this.toastr.warningToastr('File size must be less than 4MB');
  //           }
  //           break;
  //         }
  //         // case 'recomendation': {
  //         //   this.citizenForm.controls.recomendation.setValue(file);
  //         //   this.file4 = file.name;
  //         //   break;
  //         // }
  //         case 'certificate': {
  //           const fileType = file.type;
  //           if (file.size <= 4000000 && fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'application/pdf') {
  //             this.citizenForm.controls.certificate.setValue(file);
  //             this.citizenForm.controls.certificateDocFileName.setValue(file.name);
  //           } else {
  //             this.toastr.warningToastr('File size must be less than 4MB');
  //           }
  //           break;
  //         }
  //         case 'industry': {
  //           const fileType = file.type;
  //           if (file.size <= 4000000 && fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'application/pdf') {
  //             this.citizenForm.controls.industry.setValue(file);
  //             this.citizenForm.controls.industryDocFileName.setValue(file.name);
  //           } else {
  //             this.toastr.warningToastr('File size must be less than 4MB');
  //           }
  //           break;
  //         }
  //         case 'quantity': {
  //           const fileType = file.type;
  //           if (file.size <= 4000000 && fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'application/pdf') {
  //             this.citizenForm.controls.quantity.setValue(file);
  //             this.citizenForm.controls.quantityDocFileName.setValue(file.name);
  //           } else {
  //             this.toastr.warningToastr('File size must be less than 4MB');
  //           }
  //           break;
  //         }
  //         case 'jointReport': {
  //           const fileType = file.type;
  //           if (file.size <= 4000000 && fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'application/pdf') {
  //             this.citizenForm.controls.jointReport.setValue(file);
  //             this.citizenForm.controls.jointReportDocFileName.setValue(file.name);
  //           } else {
  //             this.toastr.warningToastr('File size must be less than 4MB');
  //           }
  //           break;
  //         }
  //         case 'cgwa': {
  //           const fileType = file.type;
  //           if (file.size <= 4000000 && fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'application/pdf') {
  //             this.citizenForm.controls.cgwa.setValue(file);
  //             this.citizenForm.controls.cgwaFileDocName.setValue(file.name);
  //           } else {
  //             this.toastr.warningToastr('File size must be less than 4MB');
  //           }
  //           break;
  //         }
  //         case 'cgwaCertificate': {
  //           const fileType = file.type;
  //           if (file.size <= 4000000 && fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'application/pdf') {
  //             this.citizenForm.controls.cgwaCertificate.setValue(file);
  //             this.citizenForm.controls.cgwaCertificateDocFileName.setValue(file.name);
  //           } else {
  //             this.toastr.warningToastr('File size must be less than 4MB');
  //           }
  //           break;
  //         }
  //         case 'layout': {
  //           const fileType = file.type;
  //           if (file.size <= 4000000 && fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'application/pdf') {
  //             this.citizenForm.controls.layout.setValue(file);
  //             this.citizenForm.controls.layoutDocFileName.setValue(file.name);
  //           } else {
  //             this.toastr.warningToastr('File size must be less than 4MB');
  //           }
  //           break;
  //         }
  //         case 'disposal': {
  //           const fileType = file.type;
  //           if (file.size <= 4000000 && fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'application/pdf') {
  //             this.citizenForm.controls.disposal.setValue(file);
  //             this.citizenForm.controls.disposalDocFileName.setValue(file.name);
  //           } else {
  //             this.toastr.warningToastr('File size must be less than 4MB');
  //           }
  //           break;
  //         }
  //         case 'scheme': {
  //           const fileType = file.type;
  //           if (file.size <= 4000000 && fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'application/pdf') {
  //             this.citizenForm.controls.scheme.setValue(file);
  //             this.citizenForm.controls.schemeDocFileName.setValue(file.name);
  //           } else {
  //             this.toastr.warningToastr('File size must be less than 4MB');
  //           }
  //           break;
  //         }
  //         case 'waterMgmt': {
  //           const fileType = file.type;
  //           if (file.size <= 4000000 && fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'application/pdf') {
  //             this.citizenForm.controls.waterMgmt.setValue(file);
  //             this.citizenForm.controls.waterMgmtDocFileName.setValue(file.name);
  //           } else {
  //             this.toastr.warningToastr('File size must be less than 4MB');
  //           }
  //           break;
  //         }
  //         case 'allocationOrder': {
  //           const fileType = file.type;
  //           if (file.size <= 4000000 && fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'application/pdf') {
  //             this.citizenForm.controls.allocationOrder.setValue(file);
  //             this.citizenForm.controls.allocationOrderDocFileName.setValue(file.name);
  //           } else {
  //             this.toastr.warningToastr('File size must be less than 4MB');
  //           }
  //           break;
  //         }
  //         case 'payDocProof': {
  //           const fileType = file.type;
  //           if (file.size <= 4000000 && fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'application/pdf') {
  //             this.citizenForm.controls.payDocProof.setValue(file);
  //             this.citizenForm.controls.payDocProofDocFileName.setValue(file.name);
  //           } else {
  //             this.toastr.warningToastr('File size must be less than 4MB');
  //           }
  //           break;
  //         }
  //         case 'currAllocDoc': {
  //           const fileType = file.type;
  //           if (file.size <= 4000000 && fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'application/pdf') {
  //             this.citizenForm.controls.currAllocDoc.setValue(file);
  //             this.citizenForm.controls.currAllocDocFileName.setValue(file.name);
  //           } else {
  //             this.toastr.warningToastr('File size must be less than 4MB');
  //           }
  //           break;
  //         }
  //         case 'recFromIPCOLDoc': {
  //           const fileType = file.type;
  //           if (file.size <= 4000000 && fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'application/pdf') {
  //             this.citizenForm.controls.recFromIPCOLDoc.setValue(file);
  //             this.citizenForm.controls.recFromIPCOLDocFileName.setValue(file.name);
  //           } else {
  //             this.toastr.warningToastr('File size must be less than 4MB');
  //           }
  //           break;
  //         }
  //         case 'indDetails': {
  //           const fileType = file.type;
  //           if (file.size <= 4000000 && fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'application/pdf') {
  //             this.citizenForm.controls.indDetails.setValue(file);
  //             this.citizenForm.controls.indDetailsDocFileName.setValue(file.name);
  //           } else {
  //             this.toastr.warningToastr('File size must be less than 4MB');
  //           }
  //           break;
  //         }
  //       }
  //     }
  //   }




// ----------------------------------test----------------------------
validatePDF(file: File): Promise<boolean> {
  return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onloadend = () => {
          try {
              const fileBuffer = fileReader.result as ArrayBuffer;
              const arr = new Uint8Array(fileBuffer).subarray(0, 4);
              let header = '';

              for (let i = 0; i < arr.length; i++) {
                  header += arr[i].toString(16);
              }

              const isPDF = header === '25504446';
              const text = new TextDecoder().decode(new Uint8Array(fileBuffer));
              const hasJavaScript = /\/JS|\/JavaScript/.test(text);
              const hasEmbeddedFiles = /\/EmbeddedFile/.test(text);
              const hasAction = /\/AA|\/OpenAction|\/Action/.test(text);

              resolve(isPDF && !hasJavaScript && !hasEmbeddedFiles && !hasAction);
          } catch (error) {
              reject(new Error('Error processing the file: ' + error.message));
          }
      };

      fileReader.onerror = (e) => {
          reject(new Error('Error reading file: ' + e));
      };

      fileReader.readAsArrayBuffer(file);
  });
}

  fileChange(event: Event, type: string) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0] as File;
      const fileName = file.name;

      // Validate file name: no multiple extensions or invalid patterns
      // const validFileNamePattern = /^[a-zA-Z0-9_\-]+\.[a-zA-Z0-9]+$/;
      const validFileNamePattern = /^[a-zA-Z0-9_\-()\s]+\.[a-zA-Z0-9]+$/;
      const doubleExtensionPattern = /\.[^.]+(\.[^.]+)$/;
      const nullBytePattern = /\0/;
      if (doubleExtensionPattern.test(file.name) || !validFileNamePattern.test(file.name) || nullBytePattern.test(file.name)) {
          this.toastr.warningToastr('Invalid file name. Ensure the file does not contain multiple extensions or invalid characters.');
          return;
      }

      this.validatePDF(file).then(isSafePDF => {
        if (!isSafePDF) {
          this.toastr.warningToastr('The selected PDF contains unsafe elements and cannot be uploaded.');
          return;
      }

        const fileType = file.type;
        if (file.size <= 4000000 && (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'application/pdf')) {
          switch (type) {
            case 'intake':
              this.citizenForm.controls.intake.setValue(file);
              this.citizenForm.controls.intakeFileDocName.setValue(file.name);
              break;
            case 'recomendation':
              this.citizenForm.controls.recomendation.setValue(file);
              this.citizenForm.controls.recomendationDocFileName.setValue(file.name);
              this.file2 = file.name;
              break;
            case 'mou':
              this.citizenForm.controls.mou.setValue(file);
              this.citizenForm.controls.mouDocFileName.setValue(file.name);
              break;
            case 'certificate':
              this.citizenForm.controls.certificate.setValue(file);
              this.citizenForm.controls.certificateDocFileName.setValue(file.name);
              break;
            case 'industry':
              this.citizenForm.controls.industry.setValue(file);
              this.citizenForm.controls.industryDocFileName.setValue(file.name);
              break;
            case 'quantity':
              this.citizenForm.controls.quantity.setValue(file);
              this.citizenForm.controls.quantityDocFileName.setValue(file.name);
              break;
            case 'jointReport':
              this.citizenForm.controls.jointReport.setValue(file);
              this.citizenForm.controls.jointReportDocFileName.setValue(file.name);
              break;
            case 'cgwa':
              this.citizenForm.controls.cgwa.setValue(file);
              this.citizenForm.controls.cgwaFileDocName.setValue(file.name);
              break;
            case 'cgwaCertificate':
              this.citizenForm.controls.cgwaCertificate.setValue(file);
              this.citizenForm.controls.cgwaCertificateDocFileName.setValue(file.name);
              break;
            case 'layout':
              this.citizenForm.controls.layout.setValue(file);
              this.citizenForm.controls.layoutDocFileName.setValue(file.name);
              break;
            case 'disposal':
              this.citizenForm.controls.disposal.setValue(file);
              this.citizenForm.controls.disposalDocFileName.setValue(file.name);
              break;
            case 'scheme':
              this.citizenForm.controls.scheme.setValue(file);
              this.citizenForm.controls.schemeDocFileName.setValue(file.name);
              break;
            case 'waterMgmt':
              this.citizenForm.controls.waterMgmt.setValue(file);
              this.citizenForm.controls.waterMgmtDocFileName.setValue(file.name);
              break;
            case 'allocationOrder':
              this.citizenForm.controls.allocationOrder.setValue(file);
              this.citizenForm.controls.allocationOrderDocFileName.setValue(file.name);
              break;
            case 'payDocProof':
              this.citizenForm.controls.payDocProof.setValue(file);
              this.citizenForm.controls.payDocProofDocFileName.setValue(file.name);
              break;
            case 'currAllocDoc':
              this.citizenForm.controls.currAllocDoc.setValue(file);
              this.citizenForm.controls.currAllocDocFileName.setValue(file.name);
              break;
            case 'recFromIPCOLDoc':
              this.citizenForm.controls.recFromIPCOLDoc.setValue(file);
              this.citizenForm.controls.recFromIPCOLDocFileName.setValue(file.name);
              break;
            case 'indDetails':
              this.citizenForm.controls.indDetails.setValue(file);
              this.citizenForm.controls.indDetailsDocFileName.setValue(file.name);
              break;
          }
        } else {
          this.toastr.warningToastr('File size must be less than 4MB and must be a valid image or PDF.');
        }
      }).catch(error => {
        console.error('Error validating PDF:', error);
        this.toastr.warningToastr('There was an error validating the file.');
      });
    } else {
      console.log('No file selected');
    }
  }

  



  postFormData(formData) {
    this.spinner.show();
    // console.log('Form Data', formData, Number(formData.opQuantSur) * 2500);
    this.setpPaymentDetails(formData);
    if (Number(this.citizenForm.controls.appFor.value) === 1) {
      if ((Number(formData.opQuantSur) * 2500) > 1250) {
        const msg = 'Quantity indented for operation value should be < ' + (1250 / 2500) + ' in Constructional Application!!!';
        this.toastr.warningToastr(msg);
         this.spinner.hide();
      } else {
        // console.log('else if');
        this.allSubmittedData(formData);
      }
    } else {
      // console.log('else if 1');
      this.allSubmittedData(formData);
       this.spinner.hide();
    }
  }
  public allSubmittedData(formData) {
    //console.log('formData.currentAllocQnty', formData.currentAllocQnty);
    //console.log(formData.phaseReq);
    this.DATA = formData.phaseReq.map(ele => {
      ele['from_date'] = ele.from_date;
      ele['to_date'] = ele.to_date === null ? '' : ele.to_date;
      ele['unit'] = ele.unit * 2500;
      return ele;
    }); /* .forEach(ele => {
      if (ele.unit > this.citizenForm.controls.unit.value) {
        this.toastr.warningToastr('Unit must be greater than Operation Quantity');
      }
    }); */
    console.log(this.DATA,'thsisssssssssssssssss');
    if (this.citizenForm.controls.applyFor.value === 'Reduction' || this.citizenForm.controls.applyFor.value === 'Enhancement') {
      this.DATA = [];
    }
    const FORM_DATA = new FormData();
    FORM_DATA.append('indId', (this.industryID).toString());
    FORM_DATA.append('appType', formData.appType);
    FORM_DATA.append('email', formData.email);
    FORM_DATA.append('name', formData.name);
    FORM_DATA.append('purpose', formData.purpose);
    FORM_DATA.append('purOthers', formData.purOthers);
    FORM_DATA.append('industryPercent', formData.industryPercent !== null ? formData.industryPercent : 0);
    FORM_DATA.append('bulkPrecent', formData.bulkPrecent !== null ? formData.bulkPrecent : 0);
    FORM_DATA.append('ceName', formData.ceName);
    FORM_DATA.append('appFor', formData.appFor);
    FORM_DATA.append('mobile', formData.ce_phone);
    FORM_DATA.append('indType', formData.indType);
    FORM_DATA.append('indOters', formData.indOters);
    FORM_DATA.append('distId', formData.distId);
    FORM_DATA.append('blockId', formData.blockId);
    FORM_DATA.append('address', formData.address);
    const encryptedPAN = this.encryptDecrypt.encryptionAES(formData.panNo);
    FORM_DATA.append('panNo', encryptedPAN);
    FORM_DATA.append('riverId', formData.riverId);
    FORM_DATA.append('damId', formData.damId);
    FORM_DATA.append('sourceRiverId', formData.sourceRiverId === null ? 0 : formData.sourceRiverId);
    FORM_DATA.append('sourceDamId', formData.sourceDamId === null ? 0 : formData.sourceDamId);
    FORM_DATA.append('pinCode', formData.pinCode);
    FORM_DATA.append('presentCap', formData.presentCap === '' ? 0 : formData.presentCap);
    FORM_DATA.append('futureCap', formData.futureCap === '' ? 0 : formData.futureCap);
    FORM_DATA.append('quanIntended', formData.quanIntended);
    FORM_DATA.append('opQuant', ((formData.opQuant) * 2500).toString());
    FORM_DATA.append('latitude', formData.latitude);
    FORM_DATA.append('longtitude', formData.longitude);
    FORM_DATA.append('industryLatitude', formData.industryLatitude);
    FORM_DATA.append('industryLongtitude', formData.industryLongtitude);
    FORM_DATA.append('presentUnit', formData.presentUnit);
    FORM_DATA.append('futureUnit', formData.futureUnit);
    FORM_DATA.append('surfaceId', formData.surfaceId === null ? 0 : formData.surfaceId);
    FORM_DATA.append('opQuantSur', (formData.opQuantSur * 2500).toString());
    FORM_DATA.append('longitude', formData.longitude);
    FORM_DATA.append('paidAmount', formData.paidAmount);
    FORM_DATA.append('curAllocationQt', formData.currentAllocQnty !== undefined ? (formData.currentAllocQnty * 2500).toString() : '0');
    // FORM_DATA.append('curAllocationQt', formData.currentAllocQnty);
    FORM_DATA.append('appExtFor', formData.applyFor);
    // FORM_DATA.append('indId', formData.indId);
    //console.log('@@@@@@@@@@@@@@@######*******', this.paymentDetails.Amount_Secu);
    localStorage.setItem('waterQuantity', (this.paymentDetails.Amount_Secu === 0 ? this.paymentDetails.Amount_Secu : (this.paymentDetails.Amount_Secu / 150000)).toString());

    //console.log('QUANTITY----------------->', localStorage.getItem('waterQuantity'), ((((Number(localStorage.getItem('waterQuantity')) * 100000) - (Number(localStorage.getItem('diffValue')) * 100000)) / 100000)).toString());
    localStorage.setItem('pendingAmount', ((((Number(localStorage.getItem('waterQuantity')) * 100000) - (Number(localStorage.getItem('diffValue')) * 100000)) / 100000)).toString());
    localStorage.setItem('diffAmount', (Math.round((Number(this.citizenForm.controls.opQuant.value) - Number(this.allocatedQuantity) + Number.EPSILON) * 100) / 100).toString());
    //console.log(Number(this.citizenForm.controls.opQuant.value) - Number(this.allocatedQuantity));
    FORM_DATA.append('phaseReq', JSON.stringify(this.DATA));

    if (formData.intake !== null) {
      //console.log(formData.intake);
      FORM_DATA.append('intake', formData.intake, formData.intake.name);
    }
    if (formData.industry !== null) {
      FORM_DATA.append('industry', formData.industry, formData.industry.name);
    }
    if (formData.recomendation !== null) {
      FORM_DATA.append('recomendation', formData.recomendation, formData.recomendation.name);
    }
    if (formData.mou !== null) {
      FORM_DATA.append('mou', formData.mou, formData.mou.name);
    }
    if (formData.certificate !== null) {
      FORM_DATA.append('certificate', formData.certificate, formData.certificate.name);
    }
    if (formData.quantity !== null) {
      FORM_DATA.append('quantity', formData.quantity, formData.quantity.name);
    }
    if (formData.jointReport !== null) {
      FORM_DATA.append('jointReport', formData.jointReport, formData.jointReport.name);
    }
    if (formData.cgwa !== null) {
      FORM_DATA.append('cgwa', formData.cgwa, formData.cgwa.name);
    }
    if (formData.cgwaCertificate !== null) {
      FORM_DATA.append('cgwaCertificate', formData.cgwaCertificate, formData.cgwaCertificate.name);
    }
    if (formData.layout !== null) {
      FORM_DATA.append('layout', formData.layout, formData.layout.name);
    }
    if (formData.disposal !== null) {
      FORM_DATA.append('disposal', formData.disposal, formData.disposal.name);
    }
    if (formData.scheme !== null) {
      FORM_DATA.append('scheme', formData.scheme, formData.scheme.name);
    }
    if (formData.waterMgmt !== null) {
      FORM_DATA.append('waterMgmt', formData.waterMgmt, formData.waterMgmt.name);
    }
    if (formData.allocationOrder !== null) {
      FORM_DATA.append('allocationOrder', formData.allocationOrder, formData.allocationOrder.name);
    }
    if (formData.payDocProof !== null) {
      FORM_DATA.append('paymentDoc', formData.payDocProof, formData.payDocProof.name);
    }
    if (formData.currAllocDoc !== null) {
      FORM_DATA.append('allocation', formData.currAllocDoc, formData.currAllocDoc.name);
    }
    if (formData.recFromIPCOLDoc !== null) {
      FORM_DATA.append('renewal', formData.recFromIPCOLDoc, formData.recFromIPCOLDoc.name);
    }
    if (formData.indDetails !== null) {
      FORM_DATA.append('indDetails', formData.indDetails, formData.indDetails.name);
    }
    //console.log(FORM_DATA, this.ApplicationId);
    //console.log('this.ApplicationId', this.ApplicationId);
    // if (this.ApplicationId === null) {
    //   FORM_DATA.append('applicationId', (this.appId).toString());
    //   this.setpPaymentDetails(formData);
    //   this.service.submitFormDetails(FORM_DATA).subscribe(response => {
    //     console.log(response,'submitFormDetails');
    //     if (response !== null) {
    //       this.spinner.hide();
    //       this.toastr.successToastr(response['message']);
    //       localStorage.setItem('appId', response['data'].id);
    //       this.ApplicationId = response['data'].id;
    //       // this.updateStatus();
    //       // if(!this.isUpdate){
    //       this.router.navigateByUrl('pages/citizen/proposal/p3/' + response['data'].id);
    //       // }else{
    //       //   this.router.navigateByUrl('pages/citizen/status');
    //       // }
    //     } else {
    //       this.spinner.hide();
    //       this.toastr.dangerToastr('Something Went Wrong');
    //     }
    //     this.spinner.hide();
    //   });
    // } else {
    //   FORM_DATA.append('applicationId', this.ApplicationId);
    //   this.service.updateFormDetails(FORM_DATA).subscribe(response => {
    //     console.log(response, 'repo');
    //     if (response !== null) {
    //       this.spinner.hide();
    //       // this.updateStatus();
    //       console.log('editStatus', this.editStatus);
    //       if (this.editStatus === 4) {
    //         this.router.navigateByUrl('pages/citizen/proposal/p3/' + this.editAppId);
    //       } else {
    //         this.spinner.hide();
    //         this.updateStatus();
    //         this.toastr.successToastr(response['message']);
    //         this.router.navigateByUrl('pages/citizen/status');
    //       }
    //     } else {
    //       this.spinner.hide();
    //       this.toastr.dangerToastr('Something Went Wrong');
    //     }
    //     this.spinner.hide();
    //     console.log('spinner1');
    //     // this.toastr.dangerToastr('Something Went Wrong');
    //   });
    //   this.spinner.hide();
    //   console.log('spinner2');
    //   // this.toastr.dangerToastr('Something Went Wrong');
    // }
    // this.spinner.hide();


    if (this.ApplicationId === null) {

  FORM_DATA.append('applicationId', this.appId.toString());
  this.setpPaymentDetails(formData);

  this.spinner.show();

  this.service.submitFormDetails(FORM_DATA)
    .pipe(finalize(() => this.spinner.hide()))
    .subscribe(response => {

      if (response) {
        this.toastr.successToastr(response.message);
        localStorage.setItem('appId', response.data.id);

        this.ApplicationId = response.data.id;

        this.router.navigateByUrl(
          'pages/citizen/proposal/p3/' + response.data.id
        );
      } else {
        this.toastr.dangerToastr('Something Went Wrong');
      }
    }, error => {
      this.toastr.dangerToastr('Something Went Wrong');
    });

} else {

  FORM_DATA.append('applicationId', this.ApplicationId);

  this.spinner.show();

  this.service.updateFormDetails(FORM_DATA)
    .pipe(finalize(() => this.spinner.hide()))
    .subscribe(response => {

      if (response) {

        if (this.editStatus === 4) {
          this.router.navigateByUrl(
            'pages/citizen/proposal/p3/' + this.editAppId
          );
        } else {
          this.updateStatus();
          this.toastr.successToastr(response.message);
          this.router.navigateByUrl('pages/citizen/status');
        }

      } else {
        this.toastr.dangerToastr('Something Went Wrong');
      }
    }, error => {
      this.toastr.dangerToastr('Something Went Wrong');
    });

}
  }

  public updateStatus() {
    this.service.updateFormStatus(this.ApplicationId).subscribe(response => {
      //console.log(response);
      if (response !== null) {
        this.status = response;
        //console.log(this.status);
        // this.router.navigateByUrl('pages/citizen/status');
        this.toastr.successToastr(response['message']);
      } else {
        this.toastr.dangerToastr('Something Went Wrong');
      }
    });
  }
  public getAllIndusrtyData() {
    this.service.getAllIndusrtyDetails().subscribe(response => {
      this.data = response['data'];
    });
  }
  public getPaymentData(id) {
    this.service.getApplicationPaymentDetails(id).subscribe(res => {
      if (res !== null) {
        this.paymentData = res['data'];
      } else {
        this.toastr.dangerToastr('Something Wen Wrong');
      }
    }, err => {
      this.toastr.dangerToastr(err['message']);
    })
  }
  public getBlockByDistId(event) {
    this.spinner.show();
    // const ID = event.target.value;
    const CON_TYPE = this.isNew ? false : true;
    // //console.log(this.route.snapshot.paramMap.get('applId'), this.isUpdate);
    if (((this.route.snapshot.paramMap.get('applId') === null) && !this.isUpdate) || ((this.route.snapshot.paramMap.get('applId') === null) && this.isUpdate)) {
      //console.log('hello', event);
      const ID = typeof (event) === 'number' ? event : event.target.value;
      //console.log(ID);
      if (ID !== '') {
        this.service.getBlockByDistId(ID).subscribe(response => {
          // //console.log(response);
          if (typeof response !== null) {
            this.spinner.hide();
            this.block = response['data'];
          }
        });
      } else {
        this.spinner.hide();
        this.block = [];
      }

    } else {
      //console.log('&&&&&&&&&&&&&&&&&&&&&&', typeof (event));
      const VAL = typeof (event) === 'number' ? event : event.target.value;
      this.service.getBlockByDistId(VAL).subscribe(response => {
        // //console.log(response);
        if (typeof response !== null) {
          this.spinner.hide();
          this.block = response['data'];
        }
      });
    }
  }
  public getDamByRiverId(event) {
    this.spinner.show();
    // console.log(event, 'event');
    const ID = event;
    // console.log(ID);
    this.spinner.show();
    this.service.getAllDamByRiverID(ID).subscribe(response => {
      if (response !== null) {
        this.dam = response['data'];
        this.spinner.hide();
      } else {
        this.dam = [];
        this.spinner.hide();
        this.toastr.dangerToastr('Something Went Wrong..!!');
      }
    }, errorResponse => {
      this.dam = [];
      this.spinner.hide();
      this.toastr.dangerToastr('No Dam Data Found');
    });
  }
  public getAllApplicationData() {
    this.spinner.show();
    const type = 'New';
    this.service.getAllApplicationData(type).subscribe(response => {
      console.log(response,'response');
      if (response !== null) {
        this.spinner.hide();
        this.purpose = response['data'].purpose;
        // console.log('this.purpose', this.purpose)
        if (this.existing === 'existCon') {
          console.log('1', this.application);
          this.application = response['data'].application.filter(ele => ele.application_type === 'OPERATIONAL');
          // console.log('2', this.application);
        } else {
          console.log('3', this.application);
          this.application = response['data'].application;
          // console.log('4', this.application);
        }
        this.industry = response['data'].industries;
        this.district = response['data'].district;
        this.operational = response['data'].operational;
        this.river = response['data'].river;
        this.dam = response['data'].dam;
      }
    });
  }

  public romanize(num) {
    const lookup = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 };
    let roman = '';
    let i;
    for (i in lookup) {
      while (num >= lookup[i]) {
        roman += i;
        num -= lookup[i];
      }
    }
    return roman;
  }
  public toggle(colNo) {
    // //console.log(colNo);
    switch (colNo) {
      case 1: {
        this.hasError1 = !this.hasError1;
        break;
      }
      case 2: {
        this.hasError2 = !this.hasError2;
        break;
      }
      case 3: {
        this.hasError3 = !this.hasError3;
        break;
      }
      case 4: {
        this.hasError4 = !this.hasError4;
        break;
      }
      case 5: {
        this.hasError5 = !this.hasError5;
        break;
      }
      case 6: {
        this.hasError6 = !this.hasError6;
        break;
      }
      case 7: {
        this.hasError7 = !this.hasError7;
        break;
      }
      case 8: {
        this.hasError8 = !this.hasError8;
        break;
      }
      case 9: {
        this.hasError9 = !this.hasError9;
        break;
      }
    }
  }
  public fileValidator(file) {
    //console.log(file.size);
  }
  validate() {
    //console.log('this.citizenForm.controls.riverId.value', this.citizenForm.controls.riverId.value, this.citizenForm.controls.damId.value);
    if (Number(this.citizenForm.controls.riverId.value) !== 0) {
      this.isRiver = true;
      this.isDam = false;
    } else if (Number(this.citizenForm.controls.damId.value) !== 0) {
      this.isDam = true;
      this.isRiver = false;
    } else {
      this.isRiver = true;
      this.isDam = true;
    }
  }

  public checkType(id) {
    //console.log(id);
    if (id === 1) {
      this.isConstructional = true;
      this.isOperational = false;
      this.hasAllocation = true;
    } else if (id === 3) {
      this.isConstructional = true;
      this.isOperational = true;
      this.hasAllocation = false;
      this.citizenForm.controls['quanIntended'].setValidators([numberValidator, Validators.required]);
    } else if (id === 2) {
      this.isOperational = true;
      this.isConstructional = false;
      this.hasAllocation = false;
    }

  }
  public getPhase(event) {
    const VAL = true ? (this.citizenForm.controls.opQuant.value === null ? this.allocatedQuantity : this.citizenForm.controls.opQuant.value) : '';
    //console.log('event.target.value', event.target.value, typeof (event.target.value), '*****', VAL);
    //console.log(this.citizenForm.controls.opQuant.value, this.allocatedQuantity);
    (this.citizenForm.controls['phaseReq'] as FormArray).clear();
    // this.phaseReq.reset();
    this.noOfPhase = 0;
    this.noOfPhase = Number(event.target.value);
    this.addPhase(this.noOfPhase);
  }
  public validate2(event) {
    //console.log(event.target.value);
    if (event.target.value === '1') {
      this.isGround = true;
      this.hasCGWA = true;
    } else {
      this.isGround = false;
      this.hasCGWA = false;
    }
  }
  public validate3(event) {
    //console.log(event.target.value);
    if (event.target.value === '1') {
      this.isGround2 = true;
      this.hasCGWA = true;
    } else {
      this.isGround2 = false;
      this.hasCGWA = false;
    }
  }
  public addOtherPurpose(id) {
    // console.log(id);
    if (id === 4) {
      this.otherPurpose = true;
    } else if (id === 7) {
      this.bothPurpose = true;
      this.citizenForm.controls.industryPercent.patchValue(100);
    } else {
      this.otherPurpose = false;
      this.bothPurpose = false;
      this.citizenForm.controls.industryPercent.patchValue(null);
    }
    if (id === 1) {
      this.isDrinking = true;
    } else {
      this.isDrinking = false;
    }
  }
  public otherIndustry(event) {
    console.log(typeof (event.target.value));
    if (event.target.value === '49') {
      this.isOtherIndustry = true;
    } else {
      this.isOtherIndustry = false;
    }
  }
  public setIndustrialsWater(event) {
    //console.log((event.target.value));
    const BULK_PERCENT = event.target.value;
    const INDUSTRY_PERCENT = 100 - Number(BULK_PERCENT);
    this.citizenForm.controls.industryPercent.patchValue(INDUSTRY_PERCENT);
  }
  public selectTypeOfaction(event, data) {
    this.isPhasing = true;
    this.applyingForVal = event === null ? data : event.target.value;
    localStorage.setItem('type', this.applyingForVal);
    //console.log(this.applyingForVal, this.phasingDetails);
    this.citizenForm.get('opQuant').clearValidators();
    this.citizenForm.get('opQuant').updateValueAndValidity();
    if (this.applyingForVal === 'Renewal') {
      this.showPaymentDeatils = true;
    } else {
      this.showPaymentDeatils = false;
    }
    if ((this.applyingForVal === 'Rephasing' || this.applyingForVal === 'Reduction with Rephasing' || this.applyingForVal === 'Enhancement with Rephasing') && this.phasingDetails.length > 0) {
      this.showPhasing = true;
    } else {
      this.showPhasing = false;
    }
    //console.log('showPhasing', this.showPhasing);
    if (this.applyingForVal === 'Enhancement' || this.applyingForVal === 'Enhancement with Rephasing' || this.applyingForVal === 'Enhancement with Phasing') {
      //console.log('Enhancement', this.allocatedQuantity, this.citizenForm.controls.opQuant.value);
      this.allocatedQuantity = this.allocatedQuantity === undefined ? this.citizenForm.controls.opQuant.value : this.allocatedQuantity;
      //console.log('Enhancement1', this.allocatedQuantity);
      this.citizenForm.controls['opQuant'].setValidators([Validators.compose([Validators.required, Validators.min(Number(this.allocatedQuantity))])]);
    } else if (this.applyingForVal === 'Reduction' || this.applyingForVal === 'Reduction with Phasing' || this.applyingForVal === 'Reduction with Rephasing') {
      //console.log('Reduction', this.allocatedQuantity, '***********', this.citizenForm.controls.opQuant.value);
      this.allocatedQuantity = this.allocatedQuantity === undefined ? this.citizenForm.controls.opQuant.value : this.allocatedQuantity;
      //console.log('Reduction1', this.allocatedQuantity);
      this.citizenForm.controls['opQuant'].setValidators([Validators.compose([Validators.required, Validators.max(Number(this.allocatedQuantity))])]);
    }
    /*    if (this.applyingForVal === 'Regularisation') {
         this.createForm();
         this.citizenForm.controls.applyFor.patchValue('Regularisation');
       } */
  }
  public storedValue() {
    // (this.citizenForm.controls['phaseReq'] as FormArray).clear();
    const DATA = this.citizenForm.controls.opQuant.value;
  }
  decimalFilter(event: any) {
    const reg = /^-?\d*(\.\d{0,4})?$/;
    let input = event.target.value + String.fromCharCode(event.charCode);
    if (!reg.test(input)) {
      event.preventDefault();
    }
  }

  // Function to prevent pasting in the input field
  preventPaste(event: ClipboardEvent) {
    event.preventDefault();  // Prevent the paste action
  }

  // Function to allow only digits input
  allowOnlyDigits(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const currentValue = inputElement.value;

    // Remove non-digit characters
    inputElement.value = currentValue.replace(/\D/g, '');

    // Optionally update the bound value (if using two-way data binding)
    this.totalPhases = Number(inputElement.value) || 0; 
  }
  // public validateDate(date, index) {
  //   const FA = this.citizenForm.controls.phaseReq as FormArray;
  //   if (index + 1 < FA.length) {
  //     console.log(date, 'indexDate' + index);
  //     const FG = FA.at(index + 1) as FormGroup;
  //     console.log(FG.controls, '212313213131');
  //     this.toDate = date;
  //     this.fromDate = new Date(this.toDate);
  //     console.log(new Date(this.fromDate.setDate(this.toDate.getDate() + 1)), 'hdgghasghaghadga');
  //     this.resDate = new Date(this.fromDate.setDate(this.toDate.getDate() === null ? '' : this.toDate.getDate() + 1));
  //     FG.controls.from_date.setValue(this.resDate);
  //   }
  // }

  public validateDate(date, index) {
    const phaseReqArray = this.citizenForm.get('phaseReq') as FormArray;
    const currentFormGroup = phaseReqArray.at(index) as FormGroup;
    const nextFormGroup = phaseReqArray.at(index + 1) as FormGroup;

    const fromDateControl = currentFormGroup.get('from_date');
    const toDate = new Date(date);

    // Ensure from_date control exists and has a valid value
    if (fromDateControl && fromDateControl.value) {
        const fromDate = new Date(fromDateControl.value);

        // Check if from date is greater than or equal to to date
        if (fromDate >= toDate) {
            currentFormGroup.get('to_date').reset();
            nextFormGroup.get('from_date').reset();
            this.toastr.warningToastr("To Date can't be less than or equal to From Date");
        } else {
            nextFormGroup.get('from_date').setValue(new Date(toDate.setDate(toDate.getDate() + 1)));
        }
    }
}


// handleDateChange(enteredDate: string | Date, i: number) {
//   console.log(enteredDate, i, 'handleDateChange');

//   const phaseReqArray = this.citizenForm.get('phaseReq') as FormArray;

//   if (!phaseReqArray || !phaseReqArray.at(i)) {
//       console.warn('FormArray or specific FormGroup not initialized');
//       return;
//   }

//   const specificFormGroup = phaseReqArray.at(i) as FormGroup;

//   const phaseFromDateControl = specificFormGroup.get('from_date');
//   let phaseToDateControl = specificFormGroup.get('to_date');
//   const phaseFromDateValue = phaseFromDateControl ? phaseFromDateControl.value : null;
//   const phaseToDateValue = enteredDate ? new Date(enteredDate) : null;

//   if (!phaseFromDateValue || !phaseToDateValue) {
//       console.warn('from_date or enteredDate is not valid');
//       return;
//   }

//   const fromDate = new Date(phaseFromDateValue);
//   const toDate = new Date(phaseToDateValue);

//   if (fromDate < toDate) {
//       console.log('Valid Date Range');
//       if (i + 1 < phaseReqArray.length) {
//           const nextFormGroup = phaseReqArray.at(i + 1) as FormGroup;
//           toDate.setDate(toDate.getDate() + 1);
//           const nextFromDateControl = nextFormGroup.get('from_date');
//           if (nextFromDateControl) {
//               nextFromDateControl.enable(); // Ensure the next field is enabled before setting a value
//               nextFromDateControl.setValue(toDate);
//           }
//       }
//   } else {
//       console.warn('Invalid Date Range');
//       if (phaseToDateControl) {
//         let entry  = '';
//         phaseToDateControl.disable();
//         phaseToDateControl.setValue(entry);
//       }
//       this.toastr.warningToastr("To Date can't be less than or equal to From Date");

//       if (i + 1 < phaseReqArray.length) {
//           const nextFormGroup = phaseReqArray.at(i + 1) as FormGroup;
//           const nextFromDateControl = nextFormGroup.get('from_date');
//           if (nextFromDateControl) {
//             nextFromDateControl.reset(); // Disable the next phase's from_date field
//           }
//       }
//   }
// }


handleDateChange(enteredDate: string | Date, i: number) {
  const phaseReqArray = this.citizenForm.get('phaseReq') as FormArray;

  if (!phaseReqArray || !phaseReqArray.at(i)) {
      console.warn('FormArray or specific FormGroup not initialized');
      return;
  }

  const specificFormGroup = phaseReqArray.at(i) as FormGroup;

  const phaseFromDateControl = specificFormGroup.get('from_date');
  const phaseToDateControl = specificFormGroup.get('to_date');
  const phaseFromDateValue = phaseFromDateControl ? phaseFromDateControl.value : null;
  const phaseToDateValue = enteredDate ? new Date(enteredDate) : null;

  if (!phaseFromDateValue || !phaseToDateValue) {
      console.warn('from_date or enteredDate is not valid');
      return;
  }

  const fromDate = new Date(phaseFromDateValue);
  const toDate = new Date(phaseToDateValue);

  if (fromDate < toDate) {
      // console.log('Valid Date Range');
      if (i + 1 < phaseReqArray.length) {
          const nextFormGroup = phaseReqArray.at(i + 1) as FormGroup;
          toDate.setDate(toDate.getDate() + 1);
          const nextFromDateControl = nextFormGroup.get('from_date');
          if (nextFromDateControl) {
              nextFromDateControl.setValue(toDate);
          }
      }
  } else {
      console.warn('Invalid Date Range');
      
      // Reset the to_date control
      if (phaseToDateControl) {
        // console.log('Before setting value:', phaseToDateControl.value);
        phaseToDateControl.setValue(null);
        // phaseToDateControl.disable();
        phaseToDateControl.updateValueAndValidity(); // Ensure the control is updated
        // console.log('After setting value:', phaseToDateControl.value);
    }
      
      this.toastr.warningToastr("To Date can't be less than or equal to From Date");

      if (i + 1 < phaseReqArray.length) {
          const nextFormGroup = phaseReqArray.at(i + 1) as FormGroup;
          const nextFromDateControl = nextFormGroup.get('from_date');
          if (nextFromDateControl) {
            // nextFromDateControl.disable();
              nextFromDateControl.setValue(null); // Reset next from_date as well
          }
      }
  }
}



  /* File Validation */
  public requiredFileType(type1: string, type2: string, type3: string, type4: string) {
    return (control: FormControl) => {
      const file = control.value;
      if (file) {
        const extension = file.name.split('.')[1].toLowerCase();
        if (type1.toLowerCase() !== extension.toLowerCase() || type2.toLowerCase() !== extension.toLowerCase()
          || type3.toLowerCase() !== extension.toLowerCase() || type4.toLowerCase() !== extension.toLowerCase()) {
          return {
            requiredFileType: true
          };
        }
        return null;
      }
      return null;
    };
  }


  public isNumberKey(txt, evt) {
    let charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 46) {
      //Check if the text already contains the . character
      if (txt.value.indexOf('.') === -1) {
        return true;
      } else {
        return false;
      }
    } else {
      if (charCode > 31 &&
        (charCode < 48 || charCode > 57))
        return false;
    }
    return true;
  }
  public transformDate(date) {
    //console.log(date);
    return this.datePipe.transform(date, 'dd-MM-yyyy'); // whatever format you need.
  }
  public backButton() {
    const ROLE_ID = localStorage.getItem('role_id');
    if (ROLE_ID === '3') {
      this.router.navigateByUrl('pages/citizen/status');
    } else if (ROLE_ID === '1') {
      this.router.navigateByUrl('pages/admin/proposal');
    } else {
      this.router.navigateByUrl('pages/approver/proposal');
    }
  }
}
