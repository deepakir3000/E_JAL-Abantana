import { Injectable } from '@angular/core';
import { AppConstants } from '@app/app.constants';
import { HttpClientService } from '@app/services/httpClient/http-client.service';

@Injectable()
export class ChangePasswordService {

    constructor(private httpClient: HttpClientService) { }

    public changePasword(data){
        return this.httpClient.postAuth(AppConstants.BASE_API_URL + 'api/changePassword', data);
      }

}
