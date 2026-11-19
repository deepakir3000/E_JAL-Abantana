import { Injectable } from '@angular/core';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { AppConstants } from '@app/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {

  constructor(private httpClient: HttpClientService) { }

  public sendChatBotMessage(msg: any) {
    return this.httpClient.post(AppConstants.BASE_API_URL + 'api/sendChatBotMessage', msg);
  }
}
