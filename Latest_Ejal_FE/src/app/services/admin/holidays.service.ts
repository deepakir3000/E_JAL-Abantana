import { Injectable } from '@angular/core';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { AppConstants } from '@app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

  constructor(private httpClient: HttpClientService) { }
  public createHolidays(data) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/createHolidayList', data);
    // return this.httpClient.post(AppConstants.BASE_API_URL + 'api/createHolidayList', data);
  }
  public getHolidays() {
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/getHolidayList');
    // return this.httpClient.post(AppConstants.BASE_API_URL + 'api/createHolidayList', data);
  }

   public getHolidayNameList() {
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/holidayList');
    // return this.httpClient.post(AppConstants.BASE_API_URL + 'api/createHolidayList', data);
  }

  public updateHolidayList(data:any) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/updateHolidayList', data);
    // return this.httpClient.post(AppConstants.BASE_API_URL + 'api/createHolidayList', data);
  }
  public deleteHolidayList(data:any) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/deleteHolidayList', data);
    // return this.httpClient.post(AppConstants.BASE_API_URL + 'api/createHolidayList', data);
  }

  public createHolidayName(data:any) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/createHolidayName', data);
    // return this.httpClient.post(AppConstants.BASE_API_URL + 'api/createHolidayList', data);
  }
}
