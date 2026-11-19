import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { AppConstants } from '@app/app.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '@app/services/common/common.service';
import { CommonFormService } from '@app/modules/common-form/common-form.service';
import { ToastrClientService } from '@app/services/toastr/toastr.service';

@Component({
  selector: 'app-payment-response',
  templateUrl: './payment-response.component.html',
  styleUrls: ['./payment-response.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PaymentResponseComponent implements OnInit {
  public data: any;
  public applicationId;
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private service: CommonFormService,
    private toastr: ToastrClientService,
  ) { }

  ngOnInit() {
    /*  this.route.params.subscribe(response => {
       console.log('Data', response);
       // this.getPaymentData(response);
     }); */
    this.route.queryParams.subscribe(response => {
      console.log((response.data));
      const DATA = response.data;
      const N_DATA = String(DATA).replace(' ', '+');
      // console.log(N_DATA);
      this.getPaymentData(N_DATA);
    });
    // this.getPaymentData(ID);
  }
  public getPaymentData(id:any) {
    const data = { 'id': String(id) };
    // console.log(data, 'data');
    this.commonService.GettransactionDetails(data.id).subscribe(res =>{
      // console.log(res, 'response-payment status');
      this.commonService.storeDetails(res[0]);
      // this.applicationId = res['appId'];
      this.applicationId = res && res[0] ? res[0].appId : null;
      localStorage.setItem('access_token', res['jtoken']);
      if(res[0].status === 'S'){
        this.updateStatus();
      }
      this.router.navigateByUrl('pages/citizen/proposal/p4');
    })

    // this.httpClient.post('http://localhost:4200/index.html#/payment-status', data).subscribe(response => {
    //   console.log(response);
    //   this.commonService.storeDetails(response);
    //   this.applicationId = response['appId'];
    //   localStorage.setItem('access_token', response['jtoken']);
    //   if(response['status'] === 'S'){
    //     this.updateStatus();
    //   }
    //   this.router.navigateByUrl('pages/citizen/proposal/p4');
    // }, errorResponse => {
    //   console.log(errorResponse);
    // });
  }
  public updateStatus() {
    this.service.updateFormStatus(this.applicationId).subscribe(response => {
      console.log(response);
      if (response !== null) {
        // this.status = response;
        // console.log(this.status);
        // this.router.navigateByUrl('pages/citizen/status');
        this.toastr.successToastr(response['message']);
      } else {
        this.toastr.dangerToastr('Something Went Wrong');
      }
    });
  }
}
