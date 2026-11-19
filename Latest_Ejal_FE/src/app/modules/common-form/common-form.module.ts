import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonFormService}from './common-form.service'
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
    declarations: [
        RegistrationFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgSelectModule,
        BsDatepickerModule.forRoot()
    ], exports: [
        RegistrationFormComponent
    ],
    providers:[CommonFormService]
})
export class CommonFormModule { }
