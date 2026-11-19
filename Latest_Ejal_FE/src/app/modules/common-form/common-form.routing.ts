import { Routes, RouterModule} from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { RegistrationFormComponent } from './registration-form/registration-form.component';

export const CommonRoutes: Routes = [
    {path: '', component: RegistrationFormComponent}
];

export const CommonModuleRouting: ModuleWithProviders = RouterModule.forChild(CommonRoutes);
