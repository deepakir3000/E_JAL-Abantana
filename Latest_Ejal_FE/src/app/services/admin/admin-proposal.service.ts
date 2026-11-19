import { Injectable } from '@angular/core';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { PaginationModel, PaginationModel2 } from './../../model/pagination-model';
import { AppConstants } from '@app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class AdminProposalService {

  constructor(
    private httpClient: HttpClientService
  ) { }
  public getAllApplicationDetails(data: PaginationModel2 , searchText) {
    // console.log(data);
    return this.httpClient.getFD(AppConstants.BASE_API_URL + 'api/getAllApplication/'+searchText+'?isActiveDataRequired=' + data.isActiveDataRequired + '&isPaginationRequired=' + data.isPaginationRequired + '&isAscending=' + data.isAscending + '&pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&order=' + data.order);
  }
  public getAllApplicationDetailsById(data: PaginationModel2 , searchText, type) {
    // console.log(data);
    return this.httpClient.getFD(AppConstants.BASE_API_URL + 'api/getAllApplicationById/'+searchText+'?isActiveDataRequired=' + data.isActiveDataRequired + '&isPaginationRequired=' + data.isPaginationRequired + '&isAscending=' + data.isAscending + '&pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&order=' + data.order + '&type='+ type);
  }
  public getStatusDetails(appID) {
    console.log(appID,'appId');
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/getApplicationDataForTrack/' + appID);
  }
  public getAllDetailsForMapping(type, data: PaginationModel2) {
    // console.log(data);
    return this.httpClient.getFD(AppConstants.BASE_API_URL + 'api/getAllIndustriesDetailsByStatus/' + type + '?isActiveDataRequired=' + data.isActiveDataRequired + '&isPaginationRequired=' + data.isPaginationRequired + '&isAscending=' + data.isAscending + '&pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&order=' + data.order);
  }
  public getAllBasinDetails(data: PaginationModel) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/getAllBasins', data);
  }
  public getAllEE() {
    // console.log(data);
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/getAllEE?type=' + null + '&id=' + 0);
  }

    public getAckDetails(appID) {
    console.log(appID,'appId');
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/getAckDetails/' + appID);
  }
}
