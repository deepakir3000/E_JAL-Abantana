import { Injectable } from '@angular/core';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { AppConstants } from '@app/app.constants';

@Injectable()
export class ForgotPasswordService {

    constructor(private http: HttpClientService) { }

    changePassWithoutAuth(data) {
        return this.http.postAuth(AppConstants.BASE_API_URL + 'admin/changeUserPasswordWithoutAuth', data);
    }

    forgotPassword() {

    }

    sendOtp(data) {
        return this.http.postAuth(AppConstants.BASE_API_URL + 'admin/generateOtp', data);
    }

    reSendOtp(data) {
        return this.http.postAuth(AppConstants.BASE_API_URL + 'admin/resendotp', data);
    }

    sendLinkVerification(userId: string, token: string) {
        return this.http.getAuth(AppConstants.BASE_API_URL + 'admin/verifyLink/' + userId + '/' + token);
    }
}
