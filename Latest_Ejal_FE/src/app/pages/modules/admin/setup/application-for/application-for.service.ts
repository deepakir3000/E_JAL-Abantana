import { Injectable } from '@angular/core';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { AppConstants } from '@app/app.constants';
import { PaginationModel } from '@app/model/pagination-model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationForService {

  constructor(
    private httpClient: HttpClientService
  ) { }
  private storedData;
  public setData(data){
    this.storedData = data;
    console.log('Inside Service get',this.storedData);
  }
  public getData(){
    console.log('Inside Service set',this.storedData);
    return this.storedData;
  }
  getAllAppForDetails(data: PaginationModel) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/getAllApplicationType', data);
  }
  public addApplicaitonTypeDetails(data) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/createApplicationType', data);
  }
  public updateApplicaitonTypeDetails(data) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/updateApplicationType', data);
  }
}
