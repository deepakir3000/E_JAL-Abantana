import { Injectable } from "@angular/core";
import { AppConstants } from "@app/app.constants";
import { HttpClientService } from "@app/services/httpClient/http-client.service";

@Injectable({
    providedIn: 'root'
})
export class EAppealService {

    constructor(
        private httpClient: HttpClientService
    ) { }
public getPendingApplicationsForAppealDashboard() {
    return this.httpClient.getWithOutAuth(AppConstants.BASE_API_URL + 'api/eAppealApplicationData');
}

}
