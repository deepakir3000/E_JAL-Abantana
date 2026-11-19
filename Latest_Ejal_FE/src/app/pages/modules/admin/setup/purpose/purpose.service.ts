import { Injectable } from '@angular/core';
import { PaginationModel } from '@app/model/pagination-model';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { AppConstants } from '@app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class PurposeService {

  private storedData;
  public setData(data){
    this.storedData = data;
    // console.log('Inside Service get',this.storedData);
  }
  public getData(){
    // console.log('Inside Service set',this.storedData);
    return this.storedData;
  }
  constructor(
    private httpClient: HttpClientService
  ) { }
  public getAllPurposeDetails(data: PaginationModel) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/getAllPurpose', data);
  }
  public addPurposeDetails(data) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/createPurpose', data);
  }
  public updatePurposeDetails(data) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/updatePurpose', data);
  }
}
