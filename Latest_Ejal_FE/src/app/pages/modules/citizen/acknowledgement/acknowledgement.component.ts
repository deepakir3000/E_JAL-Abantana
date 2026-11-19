import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonFormService } from '@app/modules/common-form/common-form.service';
import { NgxSpinnerService } from 'ngx-spinner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
export interface AcknowledgementRow {
  slNo: number;
  detail: string;
  value: string;
  subLabel?: string;       // e.g. "App No:" / "Date of Receipt:" inline label
  subValue?: string;       // e.g. the italic note under Sl No 3
  isItalic?: boolean;
  isMultiLine?: boolean;   // true if value should render as separate <p> lines
  lines?: string[];        // used when isMultiLine = true
}

@Component({
  selector: 'app-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AcknowledgementComponent implements OnInit {
  // ---- Header fields (dynamic) ----
  @Input() place: string = 'Bhubaneswar, Odisha';
  @Input() date: string = '';

  // ---- Table rows (dynamic) ----
  @Input() rows: AcknowledgementRow[] = [];
  ApplicationId: string | null = null;
  pathType: string = '';
  pageDetails: any = {};
  isView: boolean = true;
  xAuth: string | null = null;
  citizenForm: any = null;
  isEdit: boolean = false;
  lastDateOfTimeLimit: any;
  responseList: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CommonFormService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.route.snapshot.paramMap.get('id');
    this.ApplicationId = this.route.snapshot.paramMap.get('applId');
    console.log('Application ID', this.ApplicationId);
    // If no data passed in via @Input, populate from API response shape (example)
    // if (!this.rows || this.rows.length === 0) {
    //   this.rows = this.buildDefaultRows();
    // }
    this.route.url.subscribe(params => {
      this.pathType = params[0].path;
    });
    console.log(this.pathType, ' this.pathType')
    if (this.pathType === 'acknowledgement') {
      console.log('this.pathType acknowledgement')
      this.pathType = 'acknowledgement';
      this.getacknowledgementDetails(this.route.snapshot.paramMap.get('applId'));
    }
    this.xAuth = localStorage.getItem('access_token');
  }


  public getacknowledgementDetails(ApplicationId: string | null) {
    this.spinner.show();
    this.service.getacknowledgementDetails(ApplicationId).subscribe(response => {
      this.responseList = response.data[0];
      console.log(this.responseList, 'getacknowledgementDetails');
      if (this.responseList && this.responseList.current_submit_date != null) {
        this.populateAcknowledgement(this.responseList);
      }

      this.spinner.hide();
    });
    this.spinner.hide();
  }


  private formatDate(dateStr: string): string {
    if (!dateStr) {
      return '';
    }
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private getWorkingDaysText(dueDate: string, allocationTypeId: number): string {
    const days = allocationTypeId === 1 ? 30 : 90;
     const formattedDate = this.formatDate(dueDate);
    return `${formattedDate} which is ${days} working days from the date of receiving of the application in the o/o the Designated Officer`;
  }
  private populateAcknowledgement(data: any): void {
    if (!data) {
      return;
    }

    // Header fields
    this.place = data.district_name || this.place;
    this.date = this.formatDate(data.acknowledge_date);

    // Footer / row-6 field
    this.lastDateOfTimeLimit = data.dueDate
      ? this.formatDate(data.dueDate)
      : 'Not specified (documents pending)';

    // Table rows (Sl No 1-5; Sl No 6 is hardcoded in the template separately)
    this.rows = [
      {
        slNo: 1,
        detail: 'Name of the Designated Officer and Office Address',
        value: `Deputy Director, Industrial Water Cell, Rajiv Bhawan, Bhubaneswar`,              // ✅ put actual data here
        // subLabel: 'App No:',
        // subValue: `Date of Receipt: ${this.formatDate(data.current_submit_date)}`
      } as any,
      {
        slNo: 2,
        detail: 'Name and Address of the Applicant',
        value: '',
        isMultiLine: true,
        lines: [
          data.name,
          data.address,
          `PIN: ${data.pin_code}`
        ]
      },
      // {
      //   slNo: 3,
      //   detail: 'No. and Date of receiving application in the office of Designated Officer ',
      //   value: `${data.id},${data.application_type}`,
      //   subValue: `Date of receiving application : ${this.formatDate(data.current_submit_date)}`,
      //   isItalic: true
      // },
      {
        slNo: 3,
        detail: 'No. and Date of receiving application in the office of Designated Officer',
        subLabel: 'App No:',
        value: `${data.id}`,
        subValue: `Date of receiving application : ${this.formatDate(data.current_submit_date)}`,
        isItalic: true
      },
      {
        slNo: 4,
        detail: 'Name of the service for which the application is given',
        value: `Permission to draw water for Industrial/commercial and other establishment for ${data.application_type.toLowerCase()} purpose.`
        // value: `${data.application_type} Purpose,${this.formatDate(data.dueDate)} which is ${data.allocation_type_id === 1 ? 30 : 90} working days from the date of receiving of the application in the o/o the Designated Officer`,
      },
      {
        slNo: 5,
        detail: 'Particulars of the documents which are essential for receiving service, but are not enclosed with the application',
        value: `N/A`
      }
    ];
  }





  onPrint(): void {
    window.print();
  }

  onBack(): void {
    this.router.navigate(['/pages/citizen/status'], { relativeTo: this.route });
    // or simply: this.location.back();  (needs Location injected from '@angular/common')
  }
onDownload(): void {
  const element = document.querySelector('.ack-container') as HTMLElement;

  if (!element) {
    console.error('Acknowledgement container not found');
    return;
  }

  const images = Array.from(element.querySelectorAll('img'));
  const imagePromises = images.map(img => {
    if (img.complete) {
      return Promise.resolve();
    }
    return new Promise<void>(resolve => {
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });
  });

  Promise.all(imagePromises).then(() => {
    html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false
      // NOTE: no width/height/windowWidth/windowHeight overrides —
      // let html2canvas read the element's real rendered size
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      // Use the canvas's own aspect ratio to size the PDF page,
      // instead of forcing a fixed A4 width that can crop content
      const imgWidthPx = canvas.width;
      const imgHeightPx = canvas.height;

      const pdf = new jsPDF({
        orientation: imgWidthPx > imgHeightPx ? 'landscape' : 'portrait',
        unit: 'px',
        format: [imgWidthPx, imgHeightPx]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidthPx, imgHeightPx);
      pdf.save(`Acknowledgement_${this.place || 'Form'}.pdf`);
    }).catch(err => {
      console.error('Error generating PDF:', err);
    });
  });
}
}
