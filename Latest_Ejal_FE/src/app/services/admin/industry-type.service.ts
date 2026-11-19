import { Injectable } from '@angular/core';
import { PaginationModel } from '@app/model/pagination-model';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { AppConstants } from '@app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class IndustryTypeService {

  constructor(
    private httpClient: HttpClientService
  ) { }
  public storedData;
  public setdata(data){
      this.storedData = data;
      console.log(this.storedData);
  }
  public getdata(){
    console.log(this.storedData);
      return this.storedData;
  }
  public getAllIndTypeDetails(data: PaginationModel) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/getALlIndustries', data);
  }
  public addIndTypeDetails(data) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/createIndustry', data);
  }
  public updateIndTypeDetails(data) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/updateIndustry', data);
  }
}
