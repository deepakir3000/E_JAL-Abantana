

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '@app/app.constants';
import { HttpClientService } from "@app/services/httpClient/http-client.service";

@Injectable({
  providedIn: 'root'
})
export class AppealLoginService {
  // public BASE_URL = 'http://192.168.0.162:3002/dowr/api';
  // public accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMiIsImFjY2VzcyI6ImF1dGgiLCJpYXQiOjE1NzQ2ODAzMDksImV4cCI6MTU3NDY4MzkwOX0.2X1GXerr32D_stAWtXWKlJOq7YqNLlSp_WtxT7UKago';
  constructor(
    private http: HttpClient,
    private httpClient: HttpClientService) { }
  //////////appeal details////////////

  public getAppealLoginDetails(data) {
    const HEADERS = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const options = {
      headers: HEADERS,
      withCredentials: true,
    };
    return this.http.post(AppConstants.BASE_API_URL + 'api/appeal/login', data, options);
    // return this.httpClient.post(AppConstants.BASE_API_URL + 'api/appeal/login', data);

  }

  public getAppealLogoutDetails() {
    return this.httpClient.getWithOutAuth(AppConstants.BASE_API_URL + 'api/appeal/logout');
  }

  public getMovementHistory(appId: number) {
    return this.httpClient.getWithOutAuth(AppConstants.BASE_API_URL + `api/appeal/movement-history/${appId}`);
  }

  public getProfile() {
    return this.httpClient.getWithOutAuth(AppConstants.BASE_API_URL + 'api/appeal/profile');
  }

  public updateProfile(data: { name: string; mobile: string; email: string; hrms_id: string }) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/appeal/profile', data);
  }



  getAllAppealUsers() {
    return this.httpClient.getWithOutAuth(AppConstants.BASE_API_URL + 'api/appeal/admin/users');
  }

  setNewUserFlag(userId: number, isNewUser: boolean) {
    return this.httpClient.post(
      AppConstants.BASE_API_URL + 'api/appeal/admin/user-flag',
      {
        userId,
        isNewUser
      }
    );
  }

  getUserAuditHistory(userId: number) {
    return this.httpClient.getWithOutAuth(AppConstants.BASE_API_URL + `api/appeal/admin/audit-history/${userId}`);
  }

}