import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { AppConstants } from '@app/app.constants'; 

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(
    private httpClient: HttpClientService,
    private https: HttpClient,
    ) { }

  public getMenuDetails() {
    // console.log('inside service',data);
    return this.httpClient.getFD(AppConstants.BASE_API_URL+'api/getUIResource');
  }
  public logOut(){
    const accessToken = AppConstants.AUTHORIZATION_HEADER;
    // console.log(accessToken);
    const HEADERS = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('x-auth', accessToken)
    const options = {
        headers: HEADERS,
        params: {}
    };
    // console.log(options);
    return this.https.get(AppConstants.BASE_API_URL+'api/users/logout',options)
  }
  public getAllFeedbackDetails() {
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/getFeedbackQuestions');
  }
  public postFeedbackDetails(data) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/postFeedbackData', data);
  }
  public getFeedbackDetails(data) {
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/getFeedbackDetailsByName/' + data);
  }
}
