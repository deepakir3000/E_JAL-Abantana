import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '@app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // public BASE_URL = 'http://192.168.0.162:3002/dowr/api';
  // public accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMiIsImFjY2VzcyI6ImF1dGgiLCJpYXQiOjE1NzQ2ODAzMDksImV4cCI6MTU3NDY4MzkwOX0.2X1GXerr32D_stAWtXWKlJOq7YqNLlSp_WtxT7UKago';
  constructor(private httpClient: HttpClient) { }
  public getLoginDetails(data) {
    console.log(data,'secure: true');
    
    const HEADERS = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const options = {
      headers: HEADERS,
      withCredentials: true,
    };
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/users/login', data, options);
  }
  public cerateUser(data) {
    const HEADERS = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const options = {
      headers: HEADERS,
      withCredentials: true,
    };
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/users/createUser', data, options);
  }
  sendOtp(data) {
    console.log(data, 'data otp');
      const HEADERS = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const options = {
      headers: HEADERS,
      withCredentials: true,
    };
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/users/generateOtp', data,options);
  }

  verifyOtp(data) {
    console.log('otp',data);
   
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/users/verifyOtp', data);
  }

  reSendOtp(data) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/users/resendOtp', data);
  }
  changePassWithAuth(data) {
    const HEADERS = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const options = {
      headers: HEADERS,
      withCredentials: true,
    };
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/users/changePassword', data, options);
  }
  getCaptchaImage() {
    const HEADERS = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/users/captcha', { headers: HEADERS, responseType: 'text', withCredentials: true });
  }

  getApplicationSatus(data){
    const HEADERS = new HttpHeaders()
    .set('Content-Type', 'application/json');
  const options = {
    headers: HEADERS,
    withCredentials: true,
  };
  return this.httpClient.post(AppConstants.BASE_API_URL + 'api/users/applicationStatus', data, options);
  }

  public getDashBoardDetails() {
    // console.log('inside service',data);
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/serviceDashboardData');
  }
  // http://localhost:3002/dowr/api/testPaymentDetails
  public getDistrictList() {
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/getDistrictList');
  }

  public landingDashboard(data){
    console.log(data, 'data');
    const HEADERS = new HttpHeaders()
    .set('Content-Type', 'application/json');
  const options = {
    headers: HEADERS,
    withCredentials: true,
  };
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/landingDashboard', data, options);    
  }

  public getTableInfo(data){
    console.log(data, 'data');
    const HEADERS = new HttpHeaders()
    .set('Content-Type', 'application/json');
  const options = {
    headers: HEADERS,
    withCredentials: true,
  };
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/getTable', data, options);    
  }


//////////appeal details////////////

// public getAppealLoginDetails(data) {
//     const HEADERS = new HttpHeaders()
//       .set('Content-Type', 'application/json');
//     const options = {
//       headers: HEADERS,
//       withCredentials: true,
//     };
//     return this.httpClient.post(AppConstants.BASE_API_URL + 'api/appeal/login', data, options);
//   }

//   public getAppealLogoutDetails() {
//     const accessToken = AppConstants.AUTHORIZATION_HEADER;
//     const HEADERS = new HttpHeaders()
//       .set('Content-Type', 'application/json')
//       .set('x-auth', accessToken);
//     const options = {
//       headers: HEADERS,
//       params: {}
//     };
//     return this.httpClient.get(AppConstants.BASE_API_URL + 'api/appeal/logout', options);
//   }
}
