import { Injectable } from '@angular/core';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { PaginationModel } from './../../pages/modules/admin/manage/role/role.model';
import { AppConstants } from '@app/app.constants';
import { PaginationModel2 } from '@app/model/pagination-model';

@Injectable({
  providedIn: 'root'
})
export class MisReportService {

  constructor(
    private httpClient: HttpClientService
  ) { }

  public getAllReportDetails(data: PaginationModel2, type, status, year) {
    // console.log(data);
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/yearWiseReport?type=' + type + '&status=' + status + '&year=' + year + '&isActiveDataRequired=' + data.isActiveDataRequired + '&isPaginationRequired=' + data.isPaginationRequired + '&isAscending=' + data.isAscending + '&pageNumber=' + data.pageNumber + '&pageSize=' + data.pageSize + '&order=' + data.order);
  }
}
