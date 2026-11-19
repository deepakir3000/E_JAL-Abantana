import { Injectable } from '@angular/core';
import { HttpClientService } from '@app/services/httpClient/http-client.service';
import { AppConstants } from '@app/app.constants';

@Injectable({
	providedIn: 'root'
})
export class UserProfileService {

	constructor(
		private httpClient: HttpClientService
	) { }
	public getProfileDetails() {
		return this.httpClient.getWithoutRGrp(AppConstants.BASE_API_URL + 'sysadmin/getProfileView');
	}
	public setProfileDetails(data: FormData) {
		return this.httpClient.postFD(AppConstants.BASE_API_URL + 'sysadmin/edituser', data);
	}
}
