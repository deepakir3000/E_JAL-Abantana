import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { ChangePasswordService } from './change-password.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('captcha', { static: true }) captchat: ElementRef;

  public changePassForm: FormGroup;
  public captchaImg: any;
  public noOfTimes = 2;
  public captchaValue;
  constructor(
    private service: ChangePasswordService,
    private router: Router,
    private changePasswordActiveRoute: ActivatedRoute,
    private toastr: ToastrClientService,
    private spinner: NgxSpinnerService,
    private changePasswordFB: FormBuilder,
  ) {
    this.createChangeForm()
  }

  ngOnInit() {
    this.getCaptcha();
  }
  private createChangeForm() {
    this.changePassForm = this.changePasswordFB.group({
      oldPassword: ['', Validators.compose([Validators.required,Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
      password: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(.{6,})')])],
      confirmPass: ['', Validators.compose([Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(.{6,})')])],
      // captchaVal: ['', Validators.compose([Validators.required])]
    });
  }
  public getCaptcha() {
    this.service.getCaptchaImage().subscribe(response => {
      // console.log(response);
      this.captchaImg = response;
      // console.log(this.captchaImg.type);
      // console.log(this.captchat);
      this.captchat.nativeElement.innerHTML = this.captchaImg;
    });
  }
  /* Encription Methods */
  // private encSaltedPassword(data: string, noOfTimes: number, salt: string) {
  //   // console.log('SALT: ', salt);
  //   const PASSWORD = this.encodePassword(data, noOfTimes);
  //   const ENC_PASS = this.sha512Hash(PASSWORD + '#' + salt);
  //   console.log('ENCODED PASS: ', ENC_PASS);
  //   return ENC_PASS;
  // }
  private encodePassword(data: string, noOfTimes: number) {
    let password = data;
    while (noOfTimes > 0) {
      // console.log('BEFORE ENCODING: ' + password);
      password = this.sha512Hash(password);
      // console.log('AFTER ENCODING: ' + password);
      noOfTimes--;
    }
    return password;
  }
  private sha512Hash(data) {
    try {
      return CryptoJS.SHA512(data).toString();
    } catch (error) {
      console.log(error);
    }
  }
  /* Encription Methods Ends Here*/
  public checkPassword(data) {
    if (data.password !== data.confirmPass && data.password !== null && data.confirmPass !== null) {
      this.toastr.warningToastr('Confirm password does not match..!!!')
    } else {
      this.submitChangePassword(data);
    }
  }
  public submitChangePassword(data) {
    const OLD_PASSWORD = this.encodePassword(data.oldPassword, this.noOfTimes);
    const NEW_PASSWORD = this.encodePassword(data.password, this.noOfTimes);
    const CFM_PASSWORD = this.encodePassword(data.confirmPass,this.noOfTimes);
    console.log(NEW_PASSWORD)
    const DATA = {
      oldPassword: OLD_PASSWORD,
      password: NEW_PASSWORD,
      confmpassword: CFM_PASSWORD
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will Save this data!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Submit it!',
      cancelButtonText: 'No, keep it'
    }).then((resultdata) => {
      if (resultdata.value) {

        this.spinner.show();
        this.service.changePasword(DATA).subscribe(successResponse => {
          if (successResponse !== null) {
            this.spinner.hide();
            // console.log('result:----', successResponse);
            // console.log('statusDesc:-----', successResponse.statusDesc);
            this.toastr.successToastr(successResponse.message);
            Swal.fire(
              'Submit!',
              'Your Data has been Submittted .',
              'success'
            );
            this.changePassForm.reset();
            console.log('settting');
            
            this.router.navigate(['../'], { relativeTo: this.changePasswordActiveRoute });
            console.log(this.router.navigate(['../']),'settting');
          } else {
            this.spinner.hide();
            this.toastr.warningToastr('Something went wrong');
          }

        }, errorResponse => {
          this.spinner.hide();
          //  this.error.showMessage(errorResponse);
          // console.log(error);
          Swal.fire(
            'Cancelled',
            'Oops... Wrong Password',
            'error'
          );
        });
      }
    });
  }
}
