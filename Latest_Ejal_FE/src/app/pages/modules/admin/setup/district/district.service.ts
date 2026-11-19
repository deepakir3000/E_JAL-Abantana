import { Injectable } from '@angular/core';
import { PaginationModel } from '@app/model/pagination-model';
import { District } from '../block/block.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { AppConstants } from '@app/app.constants';

@Injectable()
export class DistrictService {
  public districtDet: District;
  private districtData = new BehaviorSubject<District>(
    this.districtDet
  );

  storedDistrictDetails = this.districtData.asObservable();

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


  getAllDistrictDetails(data: PaginationModel) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/getAllDistrict', data);
  }

  addDistrictDetails(data: Object) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/createDistrict', data);
  }

  editDistrictDetails(data: Object) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/updateDistrict', data);
  }

}
