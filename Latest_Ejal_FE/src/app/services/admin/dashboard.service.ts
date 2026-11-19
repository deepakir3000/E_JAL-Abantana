import { Injectable } from '@angular/core';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { AppConstants } from '@app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClientService) { }

  public getDashBoardDetails() {
    // console.log('inside service',data);
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/citizenDashboardData');
  }
  public getBasinDetails(basinId) {
    // console.log('inside service',data);
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/mapDataByBasinId/' + basinId);
  }
}
