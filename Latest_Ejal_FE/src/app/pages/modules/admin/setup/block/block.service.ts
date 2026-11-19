import { Injectable } from '@angular/core';
import { Block } from './block.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { AppConstants } from '@app/app.constants';
import { PaginationModel } from '@app/model/pagination-model';



@Injectable()
export class BlockService {
  public blockDet: Block;
  private blockData = new BehaviorSubject<Block>(
    this.blockDet
  );

  storedBlockDetails = this.blockData.asObservable();

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
  getAllBlockDetails(data: PaginationModel) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/getAllBlocks', data);
  }

  addBlockDetails(data: Object) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/createBlock', data);
  }

  editBlockDetails(data: Object) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/updateBlock', data);
  }
}
