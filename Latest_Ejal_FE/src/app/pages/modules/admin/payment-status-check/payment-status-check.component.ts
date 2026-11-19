import { ChangeDetectorRef, Component, ElementRef, TemplateRef } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ResourceService } from '@app/services/admin/resource.service';
@Component({
  selector: 'app-payment-status-check',
  templateUrl: './payment-status-check.component.html',
  styleUrls: ['./payment-status-check.component.css']
})

export class PaymentStatusCheckComponent {
  transactionData: any;
  searchTerm: string = '';
  filteredTransactionData: any[] = [];

  constructor(private httpClient: HttpClient, private ResourceService: ResourceService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    console.log(this.searchTerm);
    this.getTransaction();
    // this.getScroll();
  }
  public getTransaction() {
    this.ResourceService.getTransaction().subscribe(res => {
      console.log(res, 'akjgdagdsads');
      this.transactionData = res;
      this.filteredTransactionData = res;
      console.log(this.filteredTransactionData, 'this.filteredTransactionData');

    })
  }
  /**
   * getScroll
   */
  public getScroll() {
    console.log('getscroll');
    let scrollDate = "2024-09-23"
    this.ResourceService.getScroll(scrollDate).subscribe(res => {
      console.log(res, 'getScroll');

    })
  }

  logSearchTerm(e: any): void {
    this.searchTerm = e.target.value;
    this.filteredData();  // Apply filter as you type
  }

  filteredData(): void {
    const lower = this.searchTerm.toLowerCase() || '';
    console.log(lower, 'lower');

    // Filter data by name
    this.filteredTransactionData = this.transactionData.filter(data =>
      (data.appId && data.appId.toString().toLowerCase().includes(lower)) ||
      (data.name && data.name.toLowerCase().includes(lower)) ||
      (data.industry_name && data.industry_name.toLowerCase().includes(lower)) ||
      (data.deptRefId && data.deptRefId.toLowerCase().includes(lower)) ||
      (data.TrsID && data.TrsID.toString().toLowerCase().includes(lower)) ||
      (data.Ref_No && data.Ref_No.toLowerCase().includes(lower)) ||
      (data.challan_no_Proces && data.challan_no_Proces.toLowerCase().includes(lower)) ||
      (this.getDisplayValue(data.challan_no_Proces).toLowerCase().includes(lower)) ||
      (this.getDisplayValue(data.date_Proces).toLowerCase().includes(lower)) ||
      (data.BankName && data.BankName.toLowerCase().includes(lower)) ||
      (data.BankTransactionId && data.BankTransactionId.toLowerCase().includes(lower)) ||
      (data.status && data.status.toString().toLowerCase().includes(lower))
    );

    console.log(this.filteredTransactionData, 'this.filteredTransactionData12');

  }
  // Helper function to handle fallback values like 'Not generated'
getDisplayValue(value: any): string {
  return value ? value.toString() : 'Not generated';
}
}