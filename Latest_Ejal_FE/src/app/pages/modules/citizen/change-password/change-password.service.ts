import { Injectable } from '@angular/core';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { AppConstants } from '@app/app.constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(
    private httpClient: HttpClientService
  ) { }

  public changePasword(data){
    return this.httpClient.postAuth(AppConstants.BASE_API_URL + 'api/changePassword', data);
  }
  getCaptchaImage() {
    const HEADERS = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/users/captcha', {headers: HEADERS, responseType: 'text', withCredentials: true});
  }
}
