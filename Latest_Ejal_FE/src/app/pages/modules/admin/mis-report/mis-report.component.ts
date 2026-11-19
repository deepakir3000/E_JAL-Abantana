import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PaginationModel, PaginationModel2 } from '@app/model/pagination-model';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MisReportService } from '@app/services/admin/mis-report.service';
import { DatePipe } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-mis-report',
  templateUrl: './mis-report.component.html',
  styleUrls: ['./mis-report.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MisReportComponent implements OnInit {
  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';
  isFinancial = true;
  isPaymentStatus = false;
  public year = [{ date: '2019' }, { date: '2020' }, { date: '2021' }, { date: '2022' }, { date: '2023' }, { date: '2024' }, { date: '2025' }];
  public todayDate = new Date();
  private misPaginationObj: PaginationModel2;
  public misPageNo = 0;
  public misPageSize = 10;
  public misTotalElements = 0;
  public selectedPageSize = 10;
  public type = null;
  public status = null;
  public selectedYear = this.todayDate.getFullYear();
  public reportDetails = [];
  public trigger = false;
  constructor(
    private service: MisReportService,
    private toastr: ToastrClientService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    /*  console.log(this.todayDate.getFullYear().toString());
     console.log(this.year[this.year.length - 1]);
     console.log(Number(this.year[this.year.length - 1].date) < this.todayDate.getFullYear());
     if (Number(this.year[this.year.length - 1].date) < this.todayDate.getFullYear()) {
       const DATE = {
         date: this.todayDate.getFullYear().toString()
       };
       this.year.push(DATE);
       console.log(this.year);
     } */
    this.setPageDetails(0, 1);
  }
  public setPageDetails(currentPage, pageNoToGo: any) {
    // console.log(currentPage, pageNoToGo);
    this.misPageNo = pageNoToGo;
    this.misPaginationObj = {
      isActiveDataRequired: false,
      isPaginationRequired: false,
      isOrderRequired: false,
      isAscending: false,
      pageNumber: this.misPageNo,
      pageSize: this.misPageSize,
      order: 'id'
    };
    this.getAllReport(this.misPaginationObj, this.type, this.status, this.selectedYear);
  }
  public getAllReport(pagination: PaginationModel2, type, status, year) {
    this.spinner.show();
    this.service.getAllReportDetails(pagination, type, status, year).subscribe(response => {
      if (response !== null) {
        this.spinner.hide();
        this.reportDetails = JSON.parse(this.cipherTextDecrypt(response['data']));
        // console.log(this.reportDetails);
        this.misTotalElements = this.reportDetails.length;
        // console.log('Total Element======>', this.reportDetails.length);
        // if (pagination.isPaginationRequired === false) {
        //   this.exportExcel();
        // }
      } else {
        this.spinner.hide();
        this.toastr.warningToastr('Something Went Wrong');
        this.reportDetails = [];
      }
    }, errorResponse => {
      this.spinner.hide();
      this.toastr.dangerToastr('Unable to load data');
    });
  }

  public getFilterData(event, type) {
    this.misPaginationObj = {
      isActiveDataRequired: false,
      isPaginationRequired: false,
      isOrderRequired: false,
      isAscending: false,
      pageNumber: this.misPageNo,
      pageSize: this.misPageSize,
      order: 'id'
    };
    const VALUE = event.target.value;
    console.log(VALUE);
    if (type === 'status') {
      this.status = VALUE === '' ? null : VALUE;
    } else if (type === 'year') {
      this.selectedYear = VALUE === '' ? null : VALUE;
    } else if (type === 'type') {
      this.type = VALUE === '' ? null : VALUE;
    } else {
      this.status = null;
      this.type = null;
      this.selectedYear = this.todayDate.getFullYear();
    }
    this.getAllReport(this.misPaginationObj, this.type, this.status, this.selectedYear);
  }
  public downloadReportFile() {
    console.log('working');
    this.exportExcel();
    /*  this.misPaginationObj = {
       isActiveDataRequired: false,
       isPaginationRequired: false,
       isOrderRequired: false,
       isAscending: false,
       pageNumber: this.misPageNo,
       pageSize: this.misPageSize,
       order: 'id'
     };
     // this.reportDetails = [];
     this.getAllReport(this.misPaginationObj, this.type, this.status, this.selectedYear);
     // if (this.reportDetails !== null) {
     //   console.log(this.reportDetails);
     //   this.exportExcel();
     // } */
  }
  public exportExcel(): void {
    console.log('working');
    console.log(this.reportDetails);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.reportDetails);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, this.transformDate(this.todayDate) + 'Report');
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    console.log('working');
    const data: Blob = new Blob([buffer], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }
  private cipherTextDecrypt(data) {
    let key = CryptoJS.enc.Utf8.parse('6A80FD8D38D579D1090F6CDB62CA34CA');
    let iv = CryptoJS.enc.Utf8.parse('79b67e539e7fcadf');
    let decrypted  = CryptoJS.AES.decrypt(data, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  transformDate(date) {
    // console.log(date);
    return this.datePipe.transform(date, 'dd-MM-yyyy'); // whatever format you need.
  }

}
