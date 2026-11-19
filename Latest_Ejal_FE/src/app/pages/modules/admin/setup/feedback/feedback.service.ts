import { Injectable } from '@angular/core';
import { AppConstants } from '@app/app.constants';
import { PaginationModel } from '@app/model/pagination-model';
import { HttpClientService } from '@app/services/httpClient/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

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
  public getAllFeedbackDetails() {
    return this.httpClient.get(AppConstants.BASE_API_URL + 'api/getFeedbackQuestions');
  }
  public addfeedbackQuestion(data: object) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/createFeedbackQuestion', data);
  }
}
