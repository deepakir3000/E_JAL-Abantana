import { Injectable } from '@angular/core';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { PaginationModel } from './../../model/pagination-model';
import { AppConstants } from '@app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private storedData;
  public getStoredData(data){
    this.storedData = data;
    // console.log('Inside Service get',this.storedData);
  }
  public setStoredData(){
    // console.log('Inside Service set',this.storedData);
    return this.storedData;
  }
  constructor(
    private httpClient: HttpClientService
  ) { }
 

  public getAllResourceDetails(data: PaginationModel){
    return this.httpClient.getFD(AppConstants.BASE_API_URL+'api/getResource?isActiveDataRequired='+data.isActiveDataRequired+'&isPaginationRequired='+data.isPaginationRequired+'&isAscending='+data.isAscending+'&pageNumber='+data.pageNumber+'&pageSize='+data.pageSize+'&order='+data.orderField);
  }
  public createResourceDetails(data){
    return this.httpClient.postFD(AppConstants.BASE_API_URL+'api/createResource', data);
  }
  public editResourceDetails(data){
    return this.httpClient.postFD(AppConstants.BASE_API_URL+'api/editResource', data);
  }
  public getParentResource(){
    return this.httpClient.getFD(AppConstants.BASE_API_URL+'api/getParentResource');
}
public getTransaction() {
  return this.httpClient.get(AppConstants.BASE_API_URL + 'api/getTransaction');
}

/**
 * getScroll
 */
public getScroll(scrollDate:any) {
  return this.httpClient.get(`https://odishatreasury.gov.in/echallanservices/v0.2/depts2sscroll/WAR/${scrollDate}`);
}

}
