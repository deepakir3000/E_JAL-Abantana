import { Injectable } from '@angular/core';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { PaginationModel, PaginationModel2 } from './../../model/pagination-model';
import { AppConstants } from '@app/app.constants';

@Injectable({
    providedIn: 'root'
})
export class NextStepActionTakenService {

    constructor(
        private httpClient: HttpClientService
    ) { }
    public getNextStepActionDetails(data) {
        console.log(data);
        return this.httpClient.getFD(AppConstants.BASE_API_URL + 'api/workflow/nextStep?applicationId=' + data + '&skipRules=' + true);
    }

    public getAllEEDetails(type, indusId) {
        return this.httpClient.get(AppConstants.BASE_API_URL + 'api/getAllEE?type=' + type + '&id=' + indusId);
    }
    public submitWorkflow(data) {
        console.log(data, 'in service');
        return this.httpClient.postFD(AppConstants.BASE_API_URL + 'api/workflow/actionTaken', data);
    }
    public submitActionForIndustrie(data) {
        return this.httpClient.post(AppConstants.BASE_API_URL + 'api/actionForIndustries' , data );
    }
}
