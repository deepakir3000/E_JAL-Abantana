import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@app/services/admin/login.service';
import { AppealLoginService } from '@app/services/appeal/appeal.service';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-integrated',
  templateUrl: './integrated.component.html',
  styleUrls: ['./integrated.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class IntegratedComponent implements OnInit {
  rolename: string | undefined;
  role_id: string | null | undefined;

  constructor(private login: LoginService,private appealLogin : AppealLoginService
        ,private spinner :NgxSpinnerService,
        private toastr : ToastrClientService,
        private router : Router,
        private appealService : AppealLoginService
    ) { }

  ngOnInit() {
     this.rolename = (localStorage.getItem('role_name') || '').trim();
     this.role_id = localStorage.getItem('role_id');
  }

      appealLogout() {
    this.spinner.show();
    this.appealLogin.getAppealLogoutDetails().subscribe(
      (response) => {
        this.spinner.hide();
        this.toastr.successToastr('Successfully Logged out');
        localStorage.clear();
        this.router.navigateByUrl('/login');
      },
      (errorResponse) => {
        this.spinner.hide();
        this.toastr.successToastr('Unable to logout');
        // NOTE: original code shows successToastr even on error — kept consistent,
        // though dangerToastr may be more correct here. Flag if you want this changed.
      }
    );
  }

}
