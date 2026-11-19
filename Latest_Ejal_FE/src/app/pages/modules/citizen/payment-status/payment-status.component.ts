import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '@app/services/common/common.service';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PaymentStatusComponent implements OnInit {

  public paymentStatus = '';
  public amount;
  public bankName;
  public bankTransactionId;
  public bnkTranMsg;
  public dtTime;
  public refNo;
  public appId;
  public data: any;

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    window.scroll(200, 80);
    this.getStoredData();
  }
  public getStoredData() {
    this.data = this.commonService.getStoredDetails();
    console.log(this.data,'data');
    this.paymentStatus = this.data.status;
    this.amount = this.data.Amount;
    this.bankName = this.data.BankName;
    this.bankTransactionId = this.data.BankTransactionId;
    this.bnkTranMsg = this.data.BnkTranMsg;
    this.dtTime = this.data.Dt_Time;
    this.refNo = this.data.Ref_No;
    this.appId = this.data.appId;
  }
}
