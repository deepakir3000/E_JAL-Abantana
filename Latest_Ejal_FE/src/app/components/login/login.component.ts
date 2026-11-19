import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginService } from '../../services/admin/login.service';
import { environment } from 'environments/environment';
import { AuthService } from '@app/services/authentication/auth.service';
import { AppSetting } from '@app/app.setting';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { SessionCheckerService } from '@app/services/session/session-checker.service';
import { StorageService } from '@app/services/storage/storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import {
  userIdValidator,
  passwordValidator,
  emailValidator,
  numberValidator,
  nameValidator
} from '@app/validators/custom.validators';
import * as CryptoJS from 'crypto-js';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DateFormatPipe } from '../../pipes/date-now.pipe';
import { HttpParams } from '@angular/common/http';
import { isVector } from 'html2canvas/dist/types/render/vector';
// import { AppConstants } from '@app/app.constants';
// import { LoginService } from '@app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class LoginComponent implements OnInit {
  @ViewChild('captcha', { static: true }) captcha: ElementRef;
  // @ViewChild('frgtCaptcha', { static: true }) frgtCaptcha: ElementRef;
  @ViewChild('regCaptcha', { static: true }) regCaptcha: ElementRef;
  @ViewChild('phCaptcha', {static: true}) phCaptcha: ElementRef;
  @ViewChild('otpCaptcha', {static: true}) otpCaptcha: ElementRef;

  public isChecked = false;
  public isRegister = false;
  public isForgotPass = false;
  public isVerify = false;
  public bVerify = true;
  public isLogin = true;
  loginForm: FormGroup;
  public registerForm: FormGroup;
  public forgotPassForm: FormGroup;
  private env = environment;
  public disableSendReq = false;
  public disableReSendReq = true;
  private resendTimerID: any;
  public captchaImg: any;
  captchaImg1 : any;
  public elem;
  public noOfTimes = 2;
  public captchaValue;
  modalRef: BsModalRef;
  currentDate: number = Date.now();
  captchaSvg:any;
  cValue: any;
  appNum: any;
  appStatus: any;
  median: any;
  dashBoardData : any[]=[];
  startDate: any;
  endDate: any;
  investmentType: any='';
  district: any='';
  riskCategory: any='';
  districtList: any;
  showDetails: boolean = false;  
  // secretKey = '5f2b71a6d4c8e9a5bb9c4e6a88c7956a3e5b2d7f1c9f3a7f5d4e6c8f1b9a7e6d';
  secretKey = '5f2b71a6d4c8e9a5bb9c4e6a88c7956a3e5b2d7f1c9f3a7f5d4e6c8f1b9a7e6d';
  public dateDuration : any;

  constructor(
    private formFB: FormBuilder,
    // private registerFB: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private appSetting: AppSetting,
    private toastr: ToastrClientService,
    // private error: ErrorResponseService,
    private spinner: NgxSpinnerService,
    private sessionCheckerService: SessionCheckerService,
    private appStorage: StorageService,
    private login: LoginService,
    private modalService: BsModalService,
    private sanitizer: DomSanitizer
  ) {
    this.createForgotPassForm();
    this.createLoginFormInstance();
    this.createRegisterForm();
  }

  ngOnInit() {
    // this.getToken();
    this.getCaptcha();
    // console.log(this.currentDate,'asjhdajdhash');
    
  }

  ngAfterViewInit(): void {
    this.authService.removeStorageDetails();
    // this.sessionCheckerService.resetSession();
  }
  public tooggle() {
    this.isChecked = !this.isChecked;
  }
  private createLoginFormInstance() {
    this.loginForm = this.formFB.group({
      userName: [
        '',
        Validators.compose([Validators.required, userIdValidator])
      ],
      password: [
        '',
        Validators.compose([Validators.required, passwordValidator])
      ],
      captchaId: [
        '',
        Validators.compose([Validators.required])
      ]
    });
  }
  private createRegisterForm() {
    this.registerForm = this.formFB.group({
      firstName: ['', Validators.compose([nameValidator, Validators.required])],
      lastName: ['', Validators.compose([nameValidator, Validators.required])],
      email: ['', Validators.compose([emailValidator, Validators.required])],
      phone: ['', Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])]
    });
  }
  public createForgotPassForm() {
    this.forgotPassForm = this.formFB.group({
      userName: ['', Validators.compose([Validators.required])],
      mobileNo: ['', Validators.compose([Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])],
      otp: ['', Validators.compose([Validators.required])],
      password: [{value:'' , disabled: true}, Validators.compose([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(.{6,})')])],
      // captcha: ['', Validators.compose([Validators.required])],
      cnfPass: [{value:'' , disabled: true}, Validators.compose([Validators.required])]
    }, {
      validator: this.matchingPasswords('password', 'cnfPass')
    });
  }
  public getCaptcha() {
    this.login.getCaptchaImage().subscribe(response => {
      // console.log(response);
      this.captchaImg = response;
      // console.log(this.captchaImg.type);
      // console.log(this.captchat);
      if (this.isLogin) {
        this.captcha.nativeElement.innerHTML = this.captchaImg;
      } /* else if (this.isForgotPass) {
        this.frgtCaptcha.nativeElement.innerHTML = this.captchaImg;
      } */ else if (this.isRegister) {
        this.regCaptcha.nativeElement.innerHTML = this.captchaImg;
      }
    });

  }
  public getCaptchaValue(event) {
    this.captchaValue = event.target.value;
    // console.log(this.captchaValue);
  }
  
  public getCaptchaApp() {
    this.login.getCaptchaImage().subscribe(response => {
      this.captchaImg = response; 
        this.captchaSvg=this.sanitizer.bypassSecurityTrustHtml(this.captchaImg);
    });
  }

  public verifyCaptcha(event) {
    this.cValue = event.target.value;
    // console.log(this.cValue, 'cvalue', this.appNum);
  }

  public getApplicationStatus(){
    let data = {
      capValue1: this.cValue,
      appNum: this.appNum
    };
    // console.log(data);
    
    this.login.getApplicationSatus(data).subscribe((res:any) =>{
      console.log(res);
      if (res.Status == false) {
        console.log('mismatch');
        this.toastr.dangerToastr('Invalid Captcha')
        this.appStatus ='not found';
      }else{
        console.log('get status', res.status_name);
        this.appStatus = res.status_name;
      }

    })
}

  /* Encription Methods */
  private encSaltedPassword(data: string, noOfTimes: number, salt: string) {
    // console.log('SALT: ', salt);
    const PASSWORD = this.encodePassword(data, noOfTimes);
    const ENC_PASS = this.sha512Hash(PASSWORD + '#' + salt);
    console.log('ENCODED PASS: ', ENC_PASS);
    return ENC_PASS;
  }
  private encodePassword(data: string, noOfTimes: number) {
    let password = data;
    while (noOfTimes > 0) {
      // console.log('BEFORE ENCODING: ' + password);
      password = this.sha512Hash(password);
      console.log('AFTER ENCODING: ' , password);
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

  // decryptToken(encryptedText: string): string {
  //   console.log(encryptedText);
    
  //   try {
  //     // Split the encrypted text into IV and ciphertext parts
  //     const textParts = encryptedText.split(':');
  //     const iv = CryptoJS.enc.Hex.parse(textParts[0]); // IV part (hex-encoded)
  //     const encryptedData = textParts[1]; // Ciphertext part (assumed to be base64 or hex)

  //     // Convert the secret key to CryptoJS-compatible format
  //     const key = CryptoJS.enc.Hex.parse(this.secretKey);

  //     // Decrypt the token (assuming ciphertext is Base64-encoded)
  //     const decrypted = CryptoJS.AES.decrypt(encryptedData, key, {
  //       iv: iv,
  //       mode: CryptoJS.mode.CBC,
  //       padding: CryptoJS.pad.Pkcs7
  //     });

  //     // Convert decrypted data back to a UTF-8 string
  //     const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

  //     if (!decryptedText) {
  //       throw new Error('Decryption failed, possibly due to incorrect key/IV');
  //     }

  //     return decryptedText;

  //   } catch (error) {
  //     console.error('Error during decryption:', error.message);
  //     throw new Error('Failed to decrypt the token');
  //   }
  // }

  public getLoginData(data) {
    // console.log(data, 'getLogin');
    const ENC_PASSWORD = this.encSaltedPassword(data.password, this.noOfTimes, this.captchaValue);
    // console.log(ENC_PASSWORD);
    const LOGIN_DATA = {
      userName: data.userName,
      password: ENC_PASSWORD,
      captchaId: this.captchaValue
    };
    // console.log(LOGIN_DATA,'LOGIN_DATA');
    
    this.spinner.show();
    this.login.getLoginDetails(LOGIN_DATA).subscribe(successResponse => {
      console.log(successResponse, 'successResponse');
      
      console.log('Login Response',successResponse['status']);
      console.log('Show data login', successResponse['token']);
      const token = successResponse['token']; // The token is in the format IV:EncryptedData
      // const decryptedToken = this.decryptToken(token);
      // console.log('Decrypted Token:', decryptedToken);
      // let decodedValue = atob(successResponse['token']);
      // console.log('Decoded value:', decodedValue);
      // this.appStorage.setSessionAttribute('isLoggedIn', true);
      // this.appStorage.setSessionAttribute('accessTokenDetails', successResponse);
      // if (successResponse['status'] == false && successResponse['message'] == 'Please change your password' ) {
      //   alert('your password is too old, please change password');
      //   this.router.navigateByUrl('pages/citizen/change-password');
      //   this.spinner.hide();
      // } else {        
        if (successResponse['status'] === 'SUCCESS') {
          localStorage.setItem('role_id', successResponse['user'].role_id);
          if (successResponse['user'].role_id === 3) {
            localStorage.setItem('isAdmin', 'false');
            localStorage.setItem('isApprover', 'false');
            localStorage.setItem('access_token', successResponse['token']);
            sessionStorage.setItem('access_token', successResponse['token']);
            localStorage.setItem('user_Name', successResponse['user'].display_name);
            localStorage.setItem('user_email', successResponse['user'].email);
            localStorage.setItem('name', successResponse['user'].user_name);
            localStorage.setItem('mobile', successResponse['user'].mobile);
            localStorage.setItem('id', successResponse['user'].id);
            localStorage.setItem('role_id', successResponse['user'].role_id);
            // localStorage.setItem('isFirstLogin', successResponse['user'].first_login);
            console.log(successResponse['status1'], 'successResponse1235489654');
            if (successResponse['user'].first_login || successResponse['user'].first_login === 'true') {
              this.router.navigateByUrl('/changepassword');
            } else {
              if (successResponse['status1'] == false) {
                alert('your password is too old, please change password');
        this.router.navigateByUrl('pages/citizen/change-password');
        this.spinner.hide();
            }else{
              this.router.navigateByUrl('/pages/citizen/proposal');
            }
            }
            // this.router.navigateByUrl('/pages/citizen/proposal');
            this.spinner.hide();
            // this.toastr.successToastr('Welcome ' + successResponse['user'].display_name);
          } else if (successResponse['user'].role_id === 2 || successResponse['user'].role_id === 4 || successResponse['user'].role_id === 5 || successResponse['user'].role_id === 6 || successResponse['user'].role_id === 7 || successResponse['user'].role_id === 8) {
            localStorage.setItem('isApprover', 'true');
            localStorage.setItem('isAdmin', 'false');
            localStorage.setItem('access_token', successResponse['token']);
            sessionStorage.setItem('access_token', successResponse['token']);
            // this.toastr.successToastr('Welcome'+successResponse["user"].display_name)
            if (successResponse["status1"] == false) {
              alert("your password is too old, please change password");
              this.router.navigateByUrl("/changepassword");
              this.spinner.hide();
            }else {
              this.router.navigateByUrl('/pages/approver');
              this.spinner.hide();
            }
            // this.toastr.successToastr('Welcome ' + successResponse['user'].display_name);
          } else if (successResponse['user'].role_id === 1) {
            localStorage.setItem('isAdmin', 'true');
            localStorage.setItem('isApprover', 'false');
            localStorage.setItem('access_token', successResponse['token']);
            sessionStorage.setItem('access_token', successResponse['token']);
            console.log('access_token', successResponse['token']);
            
            // this.toastr.successToastr(successResponse["message"]);
            if (successResponse["status1"] == false) {
              alert("your password is too old, please change password");
              this.router.navigateByUrl("pages/approver/change-password");
              this.spinner.hide();
            }else {              
              this.router.navigateByUrl('/pages/admin');
              this.spinner.hide();
            }
            // this.toastr.successToastr('Welcome ' + successResponse['user'].display_name);
          } else {
            this.spinner.hide();
            this.toastr.dangerToastr('Invalid user or password');
            this.getCaptcha();
          }
        } else if (successResponse['status'] === 'FAILURE') {
          this.spinner.hide();
          this.getCaptcha();
          this.toastr.dangerToastr('Invalid user or password');
        }
      // }
    }, errorResponse => {
      this.spinner.hide();
      this.getCaptcha();
      // this.getToken();
      console.log(errorResponse,'errorResponse');
      
      this.toastr.dangerToastr(errorResponse.statusText + ', Please enter valid captcha');
      // this.loginForm.reset();
    });
  }
  public openRegistrationForm() {
    this.isRegister = true;
    this.getCaptcha();
    this.createRegisterForm();
    this.isLogin = false;
    this.isForgotPass = false;
  }
  public openForgotPasswordForm() {
    this.disableReSendReq = true;
    this.disableSendReq = false;
    this.isForgotPass = true;
    this.getCaptchaOtp();
    this.createForgotPassForm();
    this.isLogin = false;
    this.bVerify = true;
    this.isVerify = false;
  }
  public registerUser(data) {
    this.spinner.show();
    const DATA = {
      userName: data.email,
      email: data.email,
      phone: data.phone,
      displayName: data.firstName + ' ' + data.lastName,
      captchaId: this.captchaValue
    };

    console.group('Register Data');
    console.log(DATA);
    this.login.cerateUser(DATA).subscribe(response => {
      if (response !== null) {
        this.spinner.hide();
        this.getCaptcha();
        this.toastr.successToastr(
          response['message'] + 'Successfully. Please check your e-mail'
        );
        this.isLogin = true;
        this.isRegister = false;
        this.router.navigateByUrl('/login');
      }
    }, errorResponse => {
      this.spinner.hide();
      this.getCaptcha();
      this.toastr.dangerToastr('Unable to register');
    });
  }
  public openLoginForm() {
    this.disableReSendReq = true;
    this.disableSendReq = false;
    this.isForgotPass = false;
    this.isRegister = false;
    this.isLogin = true;
  }

  public verifyOtp() {
    // Get the OTP value from the form control cnfPass
    const enablePwd = this.forgotPassForm.get('password');
    const enableCPwd = this.forgotPassForm.get('cnfPass');
    
    
    const otp = this.forgotPassForm.get('otp').value;
    const user_name = this.forgotPassForm.get('userName').value;
    // Optional: Add validation to ensure OTP is a valid value (e.g., 4 digits)
    if (otp && otp.length === 4) {
        console.log('verify', otp);

        // Create an object with the OTP
        const otpData = {
            otp: otp,
            user_name: user_name
        };
        console.log(otpData,'otpdata');
        
        // Send the object to the verifyOtp API
        this.login.verifyOtp(otpData).subscribe(
            (successResponse) => {
                console.log(successResponse, 'otp verify');
                if (successResponse['status'] == 'SUCCESS') {
                  enablePwd.enable();
                  enableCPwd.enable();
                  this.toastr.successToastr('OTP verified successfully');
                }
            },
            (errorResponse) => {
                console.error('OTP verification failed', errorResponse);
                this.toastr.dangerToastr(errorResponse.error['message']);
            }
        );
    } else {
        this.toastr.dangerToastr('Please enter a valid 4-digit OTP');
    }
}


  public reSendOtp(data): void {
    const DATA = {
      userName: data.userName,
      mobileNo: data.mobileNo
    };

    console.log('Resend OTP called');

    this.spinner.show();
    this.login.reSendOtp(DATA).subscribe(successResponse => {

      console.log('Resend OTP Response', successResponse);
      console.log('OTP Response', successResponse, successResponse['status']);
      this.disableReSendReq = true;
      console.log(this.disableSendReq);
      this.setSyncTimer('resend');
      this.toastr.successToastr(successResponse['status']);
      this.spinner.hide();
      this.spinner.hide();
    }, errorResponse => {
      this.spinner.hide();
      this.toastr.dangerToastr('Invalid Credentials');
    });
  }

  public getCaptchaOtp() {
    this.login.getCaptchaImage().subscribe(response => {
      this.captchaImg = response; 
        this.captchaSvg=this.sanitizer.bypassSecurityTrustHtml(this.captchaImg);
    });
  }
  public otpverifyCaptcha(event) {
    this.captchaValue = event.target.value;
    // console.log(this.captchaValue, 'captchaValue');
  }

  public sendOtp(data): void {
    const userId = {
      captchaEntry: this.captchaValue,
      userName: data.userName
    };

    console.log(userId,'Send OTP called');
    this.spinner.show();
    const DATA = {
      captchaEntry: this.captchaValue,
      userName: data.userName,
      mobileNo: data.mobileNo
    };
    console.log(DATA, 'otpData');
    this.spinner.hide();
    this.login.sendOtp(DATA).subscribe(successResponse => {
      console.log('OTP Response', successResponse, successResponse['status']);
      this.disableSendReq = true;
      this.isVerify = true;
      this.bVerify = false;
      console.log(this.disableSendReq);
      this.setSyncTimer('send');
      this.toastr.successToastr(successResponse['status']);
      this.spinner.hide();
    }, errorResponse => {
      this.disableSendReq = false;
      console.log(errorResponse);
      this.toastr.dangerToastr('Invalid Credentials');
      this.spinner.hide();
    });
  }
  private setSyncTimer(data) {
    if (data === 'send') {
      this.disableSendReq = true;
      this.disableReSendReq = true;
      this.resendTimerID = setTimeout(() => {
        this.disableReSendReq = false;
      }, 60 * 1000);
    } else if (data === 'resend') {
      this.disableReSendReq = true;
      this.resendTimerID = setTimeout(() => {
        this.disableReSendReq = false;
      }, 60 * 1000);
    }
  }

  private clearTimer() {
    this.disableReSendReq = true;
    if (this.resendTimerID !== undefined) {
      clearTimeout(this.resendTimerID);
    }
  }
  public submitForgotPassForm(data) {
    console.log('All Data:---', data);
    this.spinner.show();
    const PASS = this.encodePassword(data.password, this.noOfTimes);
    const FRGT_DATA = {
      userName: data.userName,
      otp: data.otp,
      password: PASS
    };
    this.login.changePassWithAuth(FRGT_DATA).subscribe(successResponse => {

      console.log('OTP Response', successResponse);
      if (successResponse['status'] !== -1) {
        this.toastr.successToastr(successResponse['status']);
        this.isForgotPass = false;
        this.isLogin = true;
      } else {
        this.toastr.warningToastr(successResponse['status']);
      }
      this.spinner.hide();
    }, errorResponse => {
      this.toastr.dangerToastr(errorResponse.error['message']);
      this.spinner.hide();
    });
  }
  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const passwordConfirmation = group.controls[passwordConfirmationKey];
      if ((passwordConfirmation.value !== '') && (password.value !== passwordConfirmation.value)) {
        return passwordConfirmation.setErrors({ mismatchedPasswords: true });
      }
    };
  }
  public openFeedBackModal(id: TemplateRef<any>) {
    this.modalRef = this.modalService.show(id);
    this.getCaptchaApp();
    this.getServiceDashoad();
    this.getDistrictList();
    this.showDetails=false;
}

  public getServiceDashoad (){
    this.startDate = '';
    this.endDate ='';
    this.investmentType='';
    this.district='';
    this.dashBoardData =[];
    let dateDuration = {startDate: this.startDate, endDate: this.endDate};
    this.login.landingDashboard(dateDuration).subscribe(response => {
      console.log(response[0], 'response');
      this.dashBoardData.push(response[0]);
    })
  }

  public submitDetails(){
    this.showDetails = true; 
    console.log(this.startDate, this.endDate,this.investmentType,'investment', this.district.id,'district', this.riskCategory, 'datepicker info');
    this.dateDuration = {startDate: this.startDate, endDate: this.endDate,investment: this.investmentType, district: this.district.id};
    if (this.dateDuration) {
      
      this.login.landingDashboard(this.dateDuration).subscribe(response => {
        this.dashBoardData =[];
        console.log(response[0], 'response');
        this.dashBoardData.push(response[0]);

        // // Redirect to another page with query parameters
        // this.router.navigate(['/table-data'], { 
        //   queryParams: { 
        //     startDate: dateDuration.startDate, 
        //     endDate: dateDuration.endDate, 
        //     investment: dateDuration.investment, 
        //     district: dateDuration.district 
        //   }
        // });
      })
    } else{
      this.toastr.dangerToastr('Please give valid input');
    }
  }
  

  public getDistrictList(){
    this.login.getDistrictList().subscribe(res=>{
      this.districtList = res;
      console.log(this.districtList);
    })
  }

  public openNewTab() {
    // Ensure dateDuration is defined
    if (!this.dateDuration) {
      this.dateDuration = {};
    }

    const { startDate, endDate, investment, district } = this.dateDuration;
    let url: string;

    // Check if any query parameter is null, empty, or undefined
    if (startDate && endDate && investment && district) {
      // Create the URL tree with parameters
      const urlTree = this.router.createUrlTree(['/table-data'], {
        queryParams: { 
          startDate: startDate, 
          endDate: endDate, 
          investment: investment, 
          district: district 
        }
      });
      // Serialize the URL tree to a string
      url = this.router.serializeUrl(urlTree);
    } else {
      // Create a URL tree without query parameters
      url = this.router.serializeUrl(this.router.createUrlTree(['/table-data']));
    }

    // Get the base URL
    const baseUrl = window.location.origin + '/index.html#';

    // Open the new tab with the full URL
    window.open(`${baseUrl}${url}`, '_blank');
    // const baseUrl = window.location.origin + '/index.html#';
    // const url = this.router.serializeUrl(this.router.createUrlTree(['/table-data']));
    // window.open(`${baseUrl}${url}`, '_blank');
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }
}
