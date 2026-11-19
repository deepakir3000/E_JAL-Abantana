import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import * as CryptoJS from 'crypto-js';
import { LoginService } from '@app/services/admin/login.service';
import { AuthService } from '@app/services/authentication/auth.service';
// import { ToastrService } from 'ngx-toastr';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { AppealLoginService } from '@app/services/appeal/appeal.service';


// ---- Local validators (kept inside this component per request) ----
function appealUserIdValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null; // required validator handles empty case separately
  }
  const valid = /^[a-zA-Z0-9._@-]{3,100}$/.test(value);
  return valid ? null : { invalidUserId: true };
}

function appealPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (!value) {
    return null;
  }
  const valid = value.length >= 4; // minimal sanity check; real strength is server-validated
  return valid ? null : { invalidPassword: true };
}

@Component({
  selector: 'app-appeal-login',
  templateUrl: './appeal-login.component.html',
  styleUrls: ['./appeal-login.component.scss']
})
export class AppealLoginComponent implements OnInit, AfterViewInit {

  @ViewChild('captcha', { static: false }) captcha: ElementRef;

  public loginForm: FormGroup;
  public captchaImg: string;
  public captchaValue: string;
  public submitted = false;

  private noOfTimes = 2; // same double-hash count as old login

  constructor(
    private formFB: FormBuilder,
    private login: LoginService,
    private authService: AuthService,
    private toastr: ToastrClientService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private appealLogin: AppealLoginService
  ) { }

  ngOnInit() {
    this.createLoginFormInstance();
    this.getCaptcha();
  }

  ngAfterViewInit(): void {
    this.authService.removeStorageDetails();
  }

  private createLoginFormInstance() {
    this.loginForm = this.formFB.group({
      userName: ['', Validators.compose([Validators.required, appealUserIdValidator])],
      password: ['', Validators.compose([Validators.required, appealPasswordValidator])],
      captchaId: ['', Validators.compose([Validators.required])]
    });
  }

  public getCaptcha() {
    this.login.getCaptchaImage().subscribe((response: any) => {
      this.captchaImg = response;
      if (this.captcha) {
        this.captcha.nativeElement.innerHTML = this.captchaImg;
      }
    });
  }

  public getCaptchaValue(event) {
    this.captchaValue = event.target.value;
  }

  // ---- Encryption (same scheme as old login) ----
  private encSaltedPassword(data: string, noOfTimes: number, salt: string) {
    const PASSWORD = this.encodePassword(data, noOfTimes);
    return this.sha512Hash(PASSWORD + '#' + salt);
  }

  private encodePassword(data: string, noOfTimes: number) {
    let password = data;
    while (noOfTimes > 0) {
      password = this.sha512Hash(password);
      noOfTimes--;
    }
    return password;
  }

  private sha512Hash(data: string) {
    try {
      return CryptoJS.SHA512(data).toString();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  public onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.getAppealLoginData(this.loginForm.value);
  }

  public getAppealLoginData(data) {
    const ENC_PASSWORD = this.encSaltedPassword(data.password, this.noOfTimes, this.captchaValue);
    const LOGIN_DATA = {
      userName: data.userName,
      password: ENC_PASSWORD,
      captchaId: this.captchaValue
    };

    this.spinner.show();
    this.appealLogin.getAppealLoginDetails(LOGIN_DATA).subscribe(
      (successResponse: any) => {
        this.spinner.hide();

        if (successResponse.status === 'SUCCESS') {
          localStorage.setItem('access_token', successResponse.token);
          sessionStorage.setItem('access_token', successResponse.token);
          localStorage.setItem('role_id', successResponse.user.role_id);
          localStorage.setItem('role_name', successResponse.user.role_name);
          localStorage.setItem('user_Name', successResponse.user.user_name);
          localStorage.setItem('hrms_id', successResponse.user.hrms_id);
          localStorage.setItem('id', successResponse.user.id);
          localStorage.setItem('is_new_user', successResponse.user.is_new_user);

          // Single dashboard for all 3 roles
          if (successResponse.user.role_id == 4) {
            this.router.navigateByUrl('/e-appeal-admin');
          }
          else if (successResponse.user.is_new_user) {
            this.router.navigate(['/e-appeal/appeal-profile']);
          } else {
            this.router.navigateByUrl('/e-appeal');
          }


        } else {
          this.toastr.dangerToastr('Invalid user or password');
          this.getCaptcha();
        }
      },
      (errorResponse) => {
        this.spinner.hide();
        this.getCaptcha();
        this.toastr.dangerToastr(
          (errorResponse.statusText || 'Login failed') + ', Please enter valid captcha'
        );
      }
    );
  }

}