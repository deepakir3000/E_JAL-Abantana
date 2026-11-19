import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '@app/services/authentication/auth.service';
import { UserProfileService } from './user-profile.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrClientService } from '@app/services/toastr/toastr.service';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styles: [],
	encapsulation: ViewEncapsulation.None,
	providers: [UserProfileService]
})
export class UserProfileComponent implements OnInit {
	public userProfileForm: FormGroup;
	public isEdit = true;
	public orgName = 'ORMAS';
	public userProfileDetails = [];

	constructor(
		private authService: AuthService,
		private userProfileService: UserProfileService,
		private userProfileFB: FormBuilder,
		private toastr: ToastrClientService
	) {
		this.createProfileForm()
	}

	ngOnInit() {
		this.isEdit = true;
		this.getUserProfileDetails();
	}
	private createProfileForm() {
		this.userProfileForm = this.userProfileFB.group({
			userName: '',
			emailId: '',
			mobileNo: '',
			gender: '',
			dob: '',
		});
	}
	private getUserProfileDetails() {
		this.userProfileService.getProfileDetails().subscribe(successResponse => {
			console.log(successResponse);
			this.userProfileDetails = successResponse[0];
			console.log(this.userProfileDetails);
		}, errorResponse => {
		});
	}
	public toggleEdit() {
		this.isEdit = !this.isEdit;
	}
	public goBackToPage() {
		this.authService.goBack();
	}
	public submitUserDetails(data) {
		const PROFILE_FD = new FormData();
		PROFILE_FD.append('displayName', data.userName);
		PROFILE_FD.append('mobileNo', data.mobileNo);
		// PROFILE_FD.append('gender', data.gender);
		PROFILE_FD.append('emailId', data.emailId);
		PROFILE_FD.append('userId', '');
		this.modifyUserProfileDetails(PROFILE_FD);
	}
	private modifyUserProfileDetails(data: FormData) {
		this.userProfileService.setProfileDetails(data).subscribe(successResponse => {
			console.log(successResponse);
			if (successResponse['status'] === 0) {
				this.toastr.successToastr(successResponse['statusDesc']);
				this.isEdit = true;
				this.getUserProfileDetails();
			} else {
				this.toastr.warningToastr(successResponse['statusDesc']);
			}
		}, errorResponse => {
		});
	}

}
