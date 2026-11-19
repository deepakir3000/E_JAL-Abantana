import { Component, OnInit, ViewEncapsulation, AfterViewInit,TemplateRef } from '@angular/core';
import { CommonFormService } from '@app/modules/common-form/common-form.service';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup,FormsModule,FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PaymentComponent implements OnInit, AfterViewInit {
  public quantity: number;
  public pendingAmount: number;
  public pendingQuantity: number;
  public finalQuantity: number;
  public applicationId;
  public paymentData = [];
  public declarationAccepted = false;
  public appType;
  public type: any;
  public totalQuant = 0;
  registerForm: FormGroup;
  modalRef: BsModalRef;
  public treasuryData : any;
  public deptcode:any;
  public msg: any;
  public url: any;
  ud:any;
  checkbox1 = false;
  access_token: any;
  constructor(
    private service: CommonFormService,
    private toastr: ToastrClientService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient
  ) {

  }

  ngOnInit() {
    this.appType = localStorage.getItem('app_type');
    console.log(this.appType);
    this.type = localStorage.getItem('type');
    console.log('TYPE=>', this.type);
    this.quantity = (isNaN(Number(localStorage.getItem('waterQuantity'))) ? 0 : Number(localStorage.getItem('waterQuantity')) * 100000) / 100000;
    console.log('ALL QAUNTITY', this.quantity, ((this.quantity * 150000) + 1000));
    this.totalQuant = Number(((isNaN(this.quantity) ? 0 : this.quantity * 150000) + 1000).toFixed(2));
    console.log('****************', this.quantity, ((this.quantity * 150000) * 100000) / 100000, (this.quantity * 150000) + 1000, this.totalQuant);
    this.pendingAmount = (isNaN(Number(localStorage.getItem('pendingAmount'))) ? 0 : Number(localStorage.getItem('pendingAmount')) * 150000);
    console.log('PENDING AMOUNT', Number(localStorage.getItem('pendingAmount')));
    const QUANT = Number(localStorage.getItem('pendingAmount'));
    console.log(QUANT);
    this.pendingQuantity = Math.round((isNaN(QUANT) ? 0 : QUANT + Number.EPSILON) * 100) / 100;
    this.finalQuantity = (Number(localStorage.getItem('DIFF')) * 100000) / 100000;
    console.log('***************************************@', this.quantity);
    this.applicationId = this.route.snapshot.paramMap.get('applId');
    console.log(this.quantity, this.applicationId);
    console.log('*************', localStorage.getItem('appId'));
    localStorage.removeItem('waterQuantity');


    this.registerForm = this.formBuilder.group({
      appNo: ['', Validators.required],
    })
  }

  ngAfterViewInit() {
    console.log('gg', this.httpClient.head);
  }

  public submitPayment() {
    console.log('Getting the Value===>>', localStorage.getItem('trs_response'));
    if (this.declarationAccepted) {
      // this.service.updateFormStatus(this.applicationId).subscribe(response => {
      //   console.log(response);
      //   if (response !== null) {
      //     this.toastr.successToastr(response['message']);
      //     this.router.navigateByUrl('pages/citizen/proposal/p4');
      //   } else {
      //     this.toastr.dangerToastr('Something Went Wrong');
      //   }
      // });
      // this.updateStatus();
      let data = JSON.parse(localStorage.getItem('trs_response'));
      // var dataResp =  encodeURIComponent(localStorage.getItem('trs_response'));
      console.log('Payment-component-----------------------',data);
      data.applicationid = this.applicationId;
      console.log('AppID-------------',localStorage.getItem('appId'));
      console.log('token-------------',localStorage.getItem('access_token'));
      // window.location.href = 'https://industrialwaterod.nic.in/Est_Pay/JForm_Treasury?strobj=' + encodeURIComponent(localStorage.getItem('trs_response')) + '&appId=' + this.applicationId + '&jtoken=' + localStorage.getItem('access_token');
      console.log(data,"768789");
      // this.service.postPaymentData(data).subscribe(res => {
      //   console.log(res,"res");
      //   this.treasuryData = res;
      // console.log(this.treasuryData, 'payment response');
      // localStorage.setItem('treasuryData1',JSON.stringify(res))
      //   // window.location.href = 'https://industrialwaterod.nic.in/Est_Pay/JForm_Treasury?strobj=' + encodeURIComponent(localStorage.getItem('trs_response')) + '&appId=' + this.applicationId + '&jtoken=' + localStorage.getItem('access_token');
      //   // this.router.navigateByUrl('/pages/citizen/proposal/p4');
      // });
      this.service.postPaymentData(data).subscribe(res => {
        console.log(res,"res");
      this.service.sendPaymentResponseData(data).subscribe(res=>{
        console.log(res, 'payment response');
        this.treasuryData = res;
        console.log(this.treasuryData, 'payment response');
        localStorage.setItem('treasuryData1',JSON.stringify(res))
      })
      });
      // this.router.navigateByUrl('pages/citizen/proposal/p4');
      localStorage.removeItem('app_type');
      localStorage.removeItem('type');
      localStorage.removeItem('waterQuantity');
      localStorage.removeItem('pendingAmount');
      localStorage.removeItem('DIFF');

    } else {
      this.toastr.warningToastr('Please accept the declaration to proceed');
    }
    // this.service.updateFormStatus(this.applicationId).subscribe(response => {
    //   console.log(response);
    //   if (response !== null) {
    //     this.toastr.successToastr(response['message']);
    //     this.router.navigateByUrl('pages/citizen/proposal/p4');
    //   }
    //   else {
    //     this.toastr.dangerToastr('Something Went Wrong');
    //   }
    // });
    // window.location.href =  "http://industrialwaterod.nic.in/Est_Pay/JForm_Treasury?strobj=" + localStorage.getItem('trs_response');

  }
  public disableBtn(event) {
    console.log(event);
    if (event.target.checked) {
      this.declarationAccepted = true;
      this.test();
    } else {
      this.declarationAccepted = false;
    }
  }

  public test(){
    console.log('Getting the Value===>>', localStorage.getItem('trs_response'));
    let data1 = JSON.parse(localStorage.getItem('trs_response'));
    // // var dataResp =  encodeURIComponent(localStorage.getItem('trs_response'));
    // console.log('Payment-component-----------------------',data1);
    data1.applicationid = this.applicationId;
    data1.jtoken = localStorage.getItem('access_token');
    console.log('AppID-------------',localStorage.getItem('appId'));
    console.log('token-------------',localStorage.getItem('access_token'));
    this.service.postPaymentData(data1).subscribe(res => {
      console.log(res,"res");
    this.service.sendPaymentResponseData(data1).subscribe(res=>{
      console.log(res, 'payment response');
      this.treasuryData = res;
      console.log(this.treasuryData, 'payment response');
      localStorage.setItem('treasuryData1',JSON.stringify(res))
    })
    });

    // let redirect_url ='/pages/citizen/proposal/p4';
    // console.log('AppID-------------',localStorage.getItem('appId'));
    // console.log('token-------------',localStorage.getItem('access_token'));
    // let data = 'WAR|WAR-55101|0700-08-103-0128-02063-000|Payment|0||||||||||||||||0|Jindal Steel Power Ltd, Nisha, Angul|Nisha, Angul. Ph-06761-25419-95 Fax-67||Odisha|ANUGUL|759111|9777443282|sspati@angul.jspl.com|Head Works Division, Samal|INDWAT00656|55101||||http://industrialwaterod.nic.in/';
    // let data = 'WAR|WAR-55101|0700-08-103-0128-02063-000|Payment|0||||||||||||||||0|Jindal Steel Power Ltd, Nisha, Angul|Nisha, Angul. Ph-06761-25419-95 Fax-67||Odisha|ANUGUL|759111|9777443282|sspati@angul.jspl.com|Head Works Division, Samal|INDWAT00656|55101||||http://industrialwaterod.nic.in/'
    // var message = "WAR" + "|" + "WAR-"+ + "|" + data1.Trs_Head_Proces + "|" + data1.desc + "|" + data1.Amount + "|" + "|" + "|" + "|" + "|" + "|" + "|" + "|" + "|" + "|" + "|" + "|" + "|" + "|" + "|" + "|" + data1.Amount + "|" + data1.formtIndName + "|" + data1.FrmtdAddress + "|" + "|" + "Odisha" + "|" + data1.district + "|" + data1.pin + "|" + data1.mob + "|" + data1.email + "|" + data1.offnm + "|" + data1.code + "|" + data1.TrsID + "|" + "|" + "|" + "|" + redirect_url;
  }

  public openFeedBackModal(id: TemplateRef<any>) {
    if (this.declarationAccepted) {
    this.modalRef = this.modalService.show(id);
    console.log('deptcode', this.treasuryData.deptCode,'msg', this.treasuryData.msg);
    }else{
      this.toastr.warningToastr('Please accept the declaration to proceed');
    }
}
  ngOnDestroy() {
    localStorage.removeItem('app_type');
    localStorage.removeItem('type');
    localStorage.removeItem('waterQuantity');
    localStorage.removeItem('pendingAmount');
    localStorage.removeItem('DIFF');
  }

  onSubmit() {
     this.ud = JSON.parse(localStorage.getItem('treasuryData1'));
     console.log(this.ud, '---------ud---------------');
         
    const form = document.getElementById('payForm') as HTMLFormElement;
    const formData = new FormData(form);
    console.log(this.treasuryData);
    
    console.log('deptcode', this.treasuryData.deptCode,'msg', this.treasuryData.msg,123456);
    if (!this.treasuryData.deptCode || !this.treasuryData.msg) {
      console.error('Validation failed: deptCode or msg is missing or invalid.');
      this.toastr.warningToastr('Please ensure all required fields are properly filled before proceeding.');
      return; 
  }

    formData.append('deptcode', this.treasuryData.deptCode);
    formData.append('msg', this.treasuryData.msg);
   
    form.submit();
      
  }

  // submitForm() {
  //   const formData = new FormData(document.getElementById('payForm') as HTMLFormElement);
  //   // console.log(this.treasuryData.deptcode, this.treasuryData.msg);
  //   let data = {
  //     deptcode : this.treasuryData.deptcode,
  //     msg : this.treasuryData.msg
  //   }
  //   // console.log(formData, "formData");
  //   this.url = 'https://uat.odishatreasury.gov.in/echallan/dept-intg';
  //   this.httpClient.post(this.url, data)
  //     .subscribe(
  //       response => {
  //         console.log('Form submitted successfully:', response);
  //       },
  //       error => {
  //         console.error('Error submitting form:', error);
  //       }
  //     );
  // }
}
