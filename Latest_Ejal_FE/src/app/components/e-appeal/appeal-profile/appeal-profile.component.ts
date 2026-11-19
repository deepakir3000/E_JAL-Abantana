import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AppealLoginService } from '@app/services/appeal/appeal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { Router } from '@angular/router';

function mobileValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) { return null; }
    return /^[0-9]{10}$/.test(control.value) ? null : { invalidMobile: true };
}

function emailValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) { return null; }
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(control.value) ? null : { invalidEmail: true };
}

@Component({
    selector: 'app-appeal-profile',
    templateUrl: './appeal-profile.component.html',
    styleUrls: ['./appeal-profile.component.scss']
})
export class AppealProfileComponent implements OnInit {

    public profileForm: FormGroup | undefined;
    public submitted = false;
    public loadError = '';
    public saveSuccess = false;

    // read-only display fields
    public userName = '';
    public roleName = '';
    isNewUser: boolean;
    currentRole: string | undefined;

    constructor(
        private formFB: FormBuilder,
        private appealService: AppealLoginService,
        private spinner: NgxSpinnerService,
        private toastr: ToastrClientService,
        private router: Router
    ) { }

    ngOnInit() {
        this.createForm();
        this.loadProfile();
        this.currentRole = localStorage.getItem('user_Name') || undefined;
    }

    private createForm() {
        this.profileForm = this.formFB.group({
            name:    ['', Validators.required],
            mobile:  ['', mobileValidator],
            email:   ['', emailValidator],
            hrms_id: ['']
        });
    }

    // private loadProfile() {
    //     this.spinner.show();
    //     this.appealService.getProfile().subscribe(
    //         (res: any) => {
    //             this.spinner.hide();
    //             if (res.status === 'SUCCESS') {
    //                 const u = res.data;
    //                 this.userName = u.user_name;
    //                 this.roleName = u.role_name;
    //                 this.profileForm.patchValue({
    //                     name:    u.name    || '',
    //                     mobile:  u.mobile  || '',
    //                     email:   u.email   || '',
    //                     hrms_id: u.hrms_id || ''
    //                 });
    //             } else {
    //                 this.loadError = 'Failed to load profile.';
    //             }
    //         },
    //         (err) => {
    //             this.spinner.hide();
    //             this.loadError = 'Error loading profile.';
    //             console.error(err);
    //         }
    //     );
    // }


    private loadProfile() {
    this.spinner.show();

    this.appealService.getProfile().subscribe(
        (res: any) => {

            this.spinner.hide();

            if (res.status === 'SUCCESS') {

                const u = res.data;

                this.userName = u.user_name;
                this.roleName = u.role_name;

                // Store onboarding status if needed elsewhere
                this.isNewUser = !!u.is_new_user;
console.log('isNewUser:', u);
                if (u.is_new_user) {

                    // New joinee: show blank form
                    this.profileForm.patchValue({
                        name: '',
                        mobile: '',
                        email: '',
                        hrms_id: ''
                    });

                } else {

                    // Existing user: load saved values
                    this.profileForm.patchValue({
                        name: u.name || '',
                        mobile: u.mobile || '',
                        email: u.email || '',
                        hrms_id: u.hrms_id || ''
                    });

                }

            } else {

                this.loadError = 'Failed to load profile.';

            }
        },
        (err) => {

            this.spinner.hide();
            this.loadError = 'Error loading profile.';
            console.error(err);

        }
    );
}
    public onSubmit() {
        this.submitted = true;
        this.saveSuccess = false;
        if (this.profileForm.invalid) { return; }

        this.spinner.show();
        this.appealService.updateProfile(this.profileForm.value).subscribe(
            (res: any) => {
                this.spinner.hide();
                if (res.status === 'SUCCESS') {
                    this.toastr.successToastr('Profile updated successfully.');
                    this.submitted = false;
                    this.saveSuccess = true;

                   if(localStorage.getItem('is_new_user') === 'true') {
                     localStorage.setItem('is_new_user', 'false');
                      this.router.navigate(['/e-appeal/dashboard']);
                   }
                } else {
                    this.toastr.dangerToastr('Failed to update profile.');
                }
            },
            (err) => {
                this.spinner.hide();
                this.toastr.dangerToastr('Error updating profile.');
                console.error(err);
            }
        );
    }
}