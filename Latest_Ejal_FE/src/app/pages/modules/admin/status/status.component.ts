import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConstants } from '@app/app.constants';
import { AdminProposalService } from '@app/services/admin/admin-proposal.service';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { BsModalService } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppStatusComponent implements OnInit {

  public xAuth;
  public statusDetails = [];

  constructor(
    private router: Router,
    private modalService: BsModalService,
    private service: AdminProposalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrClientService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    const ID = this.activatedRoute.snapshot.paramMap.get('appId');
    this.xAuth = localStorage.getItem('access_token');
    this.getStatusDetails(ID);
  }

  getStatusDetails(appID) {
    this.spinner.show();
    this.service.getStatusDetails(appID).subscribe(response => {
        console.log('Status Data', response, typeof (response['data'][1].wac_date));
        if (typeof response !== null) {
            this.spinner.hide();
            this.statusDetails = response['data'].map(ele => {
                ele['type'] = ele['wac_date'] === null ? 'NA' : (ele['wac_date'] === 'null' ? 'NA' : ele['wac_date']);
                return ele;
            });
            console.log('this.statusDetails', this.statusDetails);
        } else {
            this.toastr.warningToastr('Couldnot found Data');
            this.spinner.hide();
        }
    });
}
downloadFile(id) {
    const url = AppConstants.BASE_API_URL + 'api/mediaDownload/' + 'wfAllocation_' + id + '?access-token=' + this.xAuth;
    console.log(url);
    const win = window.open(url, '_blank');
    win.focus();
    // if(hasFile !== null){
      // console.log('Working');
    // return AppConstants.BASE_API_URL + 'api/mediaDownload/' + 'wfAllocation_' + id + '?access-token=' + this.xAuth;
    // }else{
    //     this.toastr.warningToastr('No files available');
    // }

}

}
