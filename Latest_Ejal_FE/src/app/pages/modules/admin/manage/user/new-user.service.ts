import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { PaginationModel } from '@app/model/pagination-model';
import { AppConstants } from '@app/app.constants';

@Injectable()
export class NewUserService {
    public storedData;
    public setdata(data){
        this.storedData = data
    }
    public getdata(){
        return this.storedData
    }
    constructor(
        private httpClient: HttpClientService 
    ) { }

    public getAllUserDetails(data: PaginationModel){
        return this.httpClient.getFD(AppConstants.BASE_API_URL+'api/getUsers?isActiveDataRequired='+data.isActiveDataRequired+'&isPaginationRequired='+data.isPaginationRequired+'&isAscending='+data.isAscending+'&pageNumber='+data.pageNumber+'&pageSize='+data.pageSize+'&order='+data.orderField);
    }
    public createUserDetails(data){
        return this.httpClient.postFD(AppConstants.BASE_API_URL+'api/createUser', data);
      }
      public editUserDetails(data){
        return this.httpClient.postFD(AppConstants.BASE_API_URL+'api/editUser', data);
      }
      public getAllRoleDetails(data: PaginationModel){
        return this.httpClient.getFD(AppConstants.BASE_API_URL+'api/getRoles?isActiveDataRequired='+data.isActiveDataRequired+'&isPaginationRequired='+data.isPaginationRequired+'&isAscending='+data.isAscending+'&pageNumber='+data.pageNumber+'&pageSize='+data.pageSize+'&order='+data.orderField);
    }
}
