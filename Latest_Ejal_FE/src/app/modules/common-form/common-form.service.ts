import { Injectable } from '@angular/core';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '@app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class CommonFormService {

  constructor(
    private httpClient: HttpClientService,
    private http: HttpClient
  ) { }

  public submitFormDetails(data) {
    // console.log('inside service',data);
    return this.httpClient.postFD(AppConstants.BASE_API_URL + 'api/formSubmit', data);
  }
  public updateFormDetails(data) {
    // console.log('inside service',data);
    return this.httpClient.postFD(AppConstants.BASE_API_URL + 'api/formEdit', data);
  }
  public postPaymentData(data) {
    console.log(data, 'post payment data');
    // return this.httpClient.post('http://localhost:3001/dowr/api/setBankPaymentDetails',data);

    return this.httpClient.post('https://waterallocation.odisha.gov.in/dowr/api/setBankPaymentDetails', data);


    //  return this.http.post('https://industrialwaterod.nic.in/Est_Pay/JForm_Trs_Transaction', data, {responseType: 'text'});
  }
  public sendPaymentResponseData(data) {
    console.log(data, 'payment data');
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/sendTreasuryData', data);
    //  return this.http.post('https://industrialwaterod.nic.in/Est_Pay/JForm_Trs_Transaction', data, {responseType: 'text'});
  }
  public updateFormStatus(id) {
    // console.log('inside service',data);
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/changeApplicationStatus/' + id + '?type=new');
  }
  public getAllApplicationData(type) {
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/getApplicationData?type=' + type);
  }
  public getAllIndusrtyDetails() {
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/getAllIndustriesDetails');
  }
  public getBlockByDistId(id) {
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/getAllBlocksByDistrict/' + id);
  }
  public getAllDamByRiverID(id) {
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/getAllDamsByRiver/' + id);
  }
  public getApplicationViewdata(appId) {
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/getApplicationDataById/' + appId);
  }
  public getExistingApplicationdata(indId) {
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/getApplicationDataById/' + indId + '?type=ind');
  }
  public getApplicationPaymentDetails(appID) {
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/getPaymentDetailById/' + appID);
  }
  // public downloadFile(fileKey, appId){
  //   return AppConstants.BASE_API_URL+'api/mediaDownload/'+fileKey+'_'+appId;
  // }
  public getacknowledgementDetails(appID) {
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/getacknowledgementDetails/' + appID);
  }

}
