import { Injectable } from '@angular/core';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { PaginationModel } from './../../pages/modules/admin/manage/role/role.model';
import { AppConstants } from '@app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public storedData;
  public roleDetails = [];
  public setdata(data) {
    this.storedData = data;
  }
  public getdata() {
    return this.storedData;
  }
  public setRole(data) {
    this.roleDetails = data;
  }
  public getRole() {
    return this.roleDetails;
  }
  constructor(
    private httpClient: HttpClientService
  ) { }

  public getAllUserDetails(data: PaginationModel) {
    // console.log(data);
    return this.httpClient.getFD(AppConstants.BASE_API_URL + 'api/getRoles?isActiveDataRequired=' + data.isActiveDataRequired + '&isPaginationRequired=' + data.isPaginationRequired + '&isAscending=' + data.isAscending + '&pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&order=' + data.orderField);
  }
  public getAllMappedDetails(data: PaginationModel) {
    // console.log(data);
    return this.httpClient.getFD(AppConstants.BASE_API_URL + 'api/getRoleResource?isActiveDataRequired=' + data.isActiveDataRequired + '&isPaginationRequired=' + data.isPaginationRequired + '&isAscending=' + data.isAscending + '&pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&order=' + data.orderField + '&roleId=' + data.roleId);
  }
  public createRoleDeatils(data) {
    return this.httpClient.postFD(AppConstants.BASE_API_URL + 'api/createRole', data);
  }
  public editRoleDetails(data) {
    return this.httpClient.postFD(AppConstants.BASE_API_URL + 'api/editRole', data);
  }
  public createRoleResourceMap(data) {
    return this.httpClient.postFD(AppConstants.BASE_API_URL + 'api/roleResourceMapping', data);
  }
}
