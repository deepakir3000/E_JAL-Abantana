import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ForgotPasswordService } from './forgot-password.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { EncryptionService } from '@app/services/encryption/encryption.service';
import { CommonService } from '@app/services/common/common.service';
import { userIdValidator, passwordValidator, matchingPasswords } from '@app/validators/custom.validators';
import { AppConstants } from '@app/app.constants';
import { UtilsService } from '@app/services/utils/utils.service';
import { ToastrClientService } from '@app/services/toastr/toastr.service';


@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: [],
    providers: [ForgotPasswordService]
})
export class ForgotPasswordComponent implements OnInit {
    public otpStatus = -1;
    public passwordChangeType = 'Forgot';
    public forgotPassForm: FormGroup;
    public disableSendReq = false;
    public disableReSendReq = true;
    private tokenDetails: any = {
        userId: '',
        token: ''
    };
    private resendTimerID: any;
    constructor(
        public router: Router,
        public changeFB: FormBuilder,
        private toastr: ToastrClientService,
        private pwdService: ForgotPasswordService,
        private spinner: NgxSpinnerService,
        // private error: ErrorResponseService,
        private encryptService: EncryptionService,
        private commonService: CommonService,
        private activeRoute: ActivatedRoute,
        private utils: UtilsService
    ) {
        this.createForgotPwdForm();
    }
    ngOnInit() {
        this.activeRoute.params.subscribe(params => {
            if (params['uid'] !== undefined && params['tn'] !== undefined) {
                this.tokenDetails.userId = params['uid'];
                this.tokenDetails.token = params['tn'];
                this.passwordChangeType = 'Change';
                this.forgotPassForm.controls.userId.setValue(this.tokenDetails.userId);
                this.sendOtpByLink();
            } else {
                this.forgotPassForm.controls.userId.setValue('');
                this.passwordChangeType = 'Forgot';
            }
        });
    }

    private sendOtpByLink() {
        this.spinner.show();
        this.pwdService.sendLinkVerification(this.tokenDetails.userId, this.tokenDetails.token).subscribe(successResponse => {
            this.spinner.hide();
            if (successResponse.success) {
                this.toastr.successToastr(successResponse.Message);
                this.setSyncTimer();
            } else {
                this.toastr.warningToastr(successResponse.Message);
            }
        }, errorResponse => {
            this.spinner.hide();
            this.toastr.dangerToastr(errorResponse);
        });
    }

    private createForgotPwdForm() {
        this.forgotPassForm = this.changeFB.group({
            userId: ['', Validators.compose([Validators.required, userIdValidator])],
            otp: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required, passwordValidator])],
            cnfPass: ['', Validators.compose([Validators.required])]
        }, {
                validator: matchingPasswords('password', 'cnfPass')
            });
    }


    public submitForgotPassForm(data): void {
        const passDetails = {
            otp: data.otp,
            userId: data.userId,
            newpwd: this.utils.checkAndSendValues(102, data.password) !== null ? this.encryptService.encodePassword(this.utils.checkAndSendValues(102, data.password), AppConstants.PASSWORD_ENCODING_TIMES) : null
        };
        console.log('Forgot Password Form Data :  ', passDetails);
        this.spinner.show();
        this.pwdService.changePassWithoutAuth(passDetails).subscribe(successResponse => {
            this.spinner.hide();
            if (successResponse.status !== -1) {
                this.toastr.successToastr(successResponse.statusDesc);
                // this.router.navigate(['/login']);
            } else {
                this.toastr.warningToastr(successResponse.statusDesc);
            }
        }, errorResponse => {
            this.spinner.hide();
            this.toastr.dangerToastr(errorResponse);
        });

    }

    public sendOtp(data): void {
        const userId = {
            userName: data.userId
        };

        console.log('Send OTP called');
        this.spinner.show();

        this.pwdService.sendOtp(userId).subscribe(successResponse => {

            console.log('OTP Response', successResponse);
            if (successResponse.status !== -1) {
                this.toastr.successToastr('Your Respective UserId: ' + successResponse.statusDesc);
                this.disableSendReq = true;
                this.setSyncTimer();
                // this.router.navigate(['/login']);
            } else {
                this.toastr.warningToastr(successResponse.statusDesc);
                this.disableSendReq = false;
            }

            this.spinner.hide();
        }, errorResponse => {
            this.disableSendReq = false;
            this.toastr.dangerToastr(errorResponse);
            this.spinner.hide();
        });
    }

    public reSendOtp(data): void {
        const userId = {
            userName: data.userId
        };

        console.log('Resend OTP called');

        this.spinner.show();
        this.pwdService.reSendOtp(userId).subscribe(successResponse => {

            console.log('Resend OTP Response', successResponse);

            if (successResponse.status !== -1) {
                this.toastr.successToastr(successResponse.statusDesc);
                this.setSyncTimer();
                // this.router.navigate(['/login']);
            } else {
                this.toastr.warningToastr(successResponse.statusDesc);
            }
            this.spinner.hide();
        }, errorResponse => {
            this.spinner.hide();
            this.toastr.dangerToastr(errorResponse);
        });
    }

    private setSyncTimer() {
        this.disableReSendReq = true;
        this.resendTimerID = setTimeout(() => {
            this.disableReSendReq = false;
        }, 60 * 1000);
    }

    private clearTimer() {
        this.disableReSendReq = true;
        if (this.resendTimerID !== undefined) {
            clearTimeout(this.resendTimerID);
        }
    }
    ngOnDestroy(): void {
        this.clearTimer();
    }
}
