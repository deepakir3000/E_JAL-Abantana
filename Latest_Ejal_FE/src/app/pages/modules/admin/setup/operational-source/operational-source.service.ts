import { Injectable } from '@angular/core';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { AppConstants } from '@app/app.constants';
import { PaginationModel } from '@app/model/pagination-model';

@Injectable({
  providedIn: 'root'
})
export class OperationalSourceService {

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

  getAllOperationalDetails(data: PaginationModel) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/getAllOperationalSource', data);
  }
  public addOperationalSourceDetails(data) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/createOperationalSource', data);
  }
  public updateOperationalSourceDetails(data) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/updateOperationalSource', data);
  }
}
