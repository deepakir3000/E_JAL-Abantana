import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages.component';
import { LookupComponent } from '@app/components/lookup/lookup.component';
import { MyViewComponent } from './modules/citizen/my-view/my-view.component';
import { distinct } from 'rxjs/operators';
import { PaymentComponent } from './modules/citizen/payment/payment.component';
import { StatusComponent } from './modules/citizen/status/status.component';
import { CitizenFormComponent } from './modules/citizen/citizen-form/citizen-form.component';
import { AdminProposalComponent } from './modules/admin/admin-proposal/admin-proposal.component';
import { EditProfileComponent } from './modules/citizen/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './modules/citizen/change-password/change-password.component';
import { ProposalApprovalComponent } from './modules/admin/proposal-approval/proposal-approval.component';
import { RegistrationFormComponent } from '@app/modules/common-form/registration-form/registration-form.component';
import { BlockViewComponent } from './modules/admin/setup/block/block-view/block-view.component';
import { DistrictViewComponent } from './modules/admin/setup/district/district-view/district-view.component';
import { StateViewComponent } from './modules/admin/setup/state/state-view/state-view.component';
import { BlockCreateComponent } from './modules/admin/setup/block/block-create/block-create.component';
import { DistrictCreateComponent } from './modules/admin/setup/district/district-create/district-create.component';
import { UserViewComponent } from './modules/admin/manage/user/user-view/user-view.component';
import { RoleComponent } from './modules/admin/manage/role/role.component';
import { ResourceComponent } from './modules/admin/manage/resource/resource.component';
import { IndustryTypeViewComponent } from './modules/admin/setup/industry-type/industry-type-view/industry-type-view.component';
import { InstructionComponent } from './modules/citizen/instruction/instruction.component';
import { PaymentStatusComponent } from './modules/citizen/payment-status/payment-status.component';
import { ApplicationStatusComponent } from './modules/citizen/application-status/application-status.component';
import { StateCreateComponent } from './modules/admin/setup/state/state-create/state-create.component';
import { IndustryTypeComponent } from './modules/admin/setup/industry-type/industry-type/industry-type.component';
import { PurposeCreateComponent } from './modules/admin/setup/purpose/purpose-create/purpose-create.component';
import { PurposeViewComponent } from './modules/admin/setup/purpose/purpose-view/purpose-view.component';
import { ApplicationForComponent } from './modules/admin/setup/application-for/application-for/application-for.component';
import { ApplicationForCreateComponent } from './modules/admin/setup/application-for/application-for-create/application-for-create.component';
import { OperationalCreateComponent } from './modules/admin/setup/operational-source/operational-create/operational-create.component';
import { OperationalViewComponent } from './modules/admin/setup/operational-source/operational-view/operational-view.component';
import { UserCreateComponent } from './modules/admin/manage/user/user-create/user-create.component';
import { RoleCreateComponent } from './modules/admin/manage/role/role-create/role-create.component';
import { ResourceCreateComponent } from './modules/admin/manage/resource/resource-create/resource-create.component';
import { RoleMapComponent } from './modules/admin/manage/role/role-map/role-map.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { IndustryMappingComponent } from '@app/pages/modules/admin/industry-mapping/industry-mapping.component';
import { RiverViewComponent } from './modules/admin/setup/river/river-view/river-view.component';
import { RiverCreateComponent } from './modules/admin/setup/river/river-create/river-create.component';
import { DamCreateComponent } from './modules/admin/setup/dam/dam-create/dam-create.component';
import { DamViewComponent } from './modules/admin/setup/dam/dam-view/dam-view.component';
import { BasinViewComponent } from './modules/admin/setup/basin/basin-view/basin-view.component';
import { BasinCreateComponent } from './modules/admin/setup/basin/basin-create/basin-create.component';
import { MisReportComponent } from './modules/admin/mis-report/mis-report.component';
import { FeedbackCreateComponent } from './modules/admin/setup/feedback/feedback-create/feedback-create.component';
import { FeedbackViewComponent } from './modules/admin/setup/feedback/feedback-view/feedback-view.component';
import { UpdateStatusComponent } from './modules/admin/manage/update-status/update-status.component';
import { AppStatusComponent } from './modules/admin/status/status.component';
import { HolidaysComponent } from './modules/admin/holidays/holidays.component';
import { PaymentStatusCheckComponent } from './modules/admin/payment-status-check/payment-status-check.component';
import { AcknowledgementComponent } from './modules/citizen/acknowledgement/acknowledgement.component';

export const PageRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: 'citizen', pathMatch: 'full' },
            {
                path: 'citizen',
                children: [
                    { path: '', redirectTo: 'proposal', pathMatch: 'full' },
                    {
                        path: 'proposal', component: CitizenFormComponent,
                        children: [
                            { path: '', redirectTo: 'p1', pathMatch: 'full' },
                            { path: 'p1', component: InstructionComponent },
                            { path: 'p2', component: RegistrationFormComponent },
                            { path: 'p3', component: PaymentComponent },
                            { path: 'p3/:applId', component: PaymentComponent },
                            { path: 'p4', component: PaymentStatusComponent }
                        ]
                    },
                    { path: 'status', component: StatusComponent },
                    { path: 'Edit-profile', component: EditProfileComponent },
                    { path: 'change-password', component: ChangePasswordComponent },
                    { path: 'edit-form', component: RegistrationFormComponent },
                    { path: 'edit-form/:applId', component: RegistrationFormComponent },
                    { path: 'view-form', component: RegistrationFormComponent },
                    { path: 'view-form/:applId', component: RegistrationFormComponent },
                    { path: 'application-status', component: ApplicationStatusComponent },
                    { path: 'acknowledgement/:applId', component: AcknowledgementComponent },


                ]
            },
            {
                path: 'admin',
                children: [
                    { path: '', redirectTo: 'proposal', pathMatch: 'full' },
                    { path: 'proposal', component: AdminProposalComponent },
                    { path: 'approval/:applId', component: ProposalApprovalComponent },
                    { path: 'approval', component: ProposalApprovalComponent },
                    { path: 'view/:applId', component: RegistrationFormComponent },
                    { path: 'edit/:applId', component: RegistrationFormComponent },

                    { path: 'setup/block', component: BlockViewComponent },
                    { path: 'setup/block/create', component: BlockCreateComponent },
                    { path: 'setup/block/edit', component: BlockCreateComponent },

                    { path: 'setup/district', component: DistrictViewComponent },
                    { path: 'setup/district/create', component: DistrictCreateComponent },
                    { path: 'setup/district/edit', component: DistrictCreateComponent },

                    { path: 'setup/state', component: StateViewComponent },
                    { path: 'setup/state/create', component: StateCreateComponent },
                    { path: 'setup/state/edit', component: StateCreateComponent },

                    { path: 'setup/industry', component: IndustryTypeViewComponent },
                    { path: 'setup/industry/create', component: IndustryTypeComponent },
                    { path: 'setup/industry/edit', component: IndustryTypeComponent },

                    { path: 'setup/purpose', component: PurposeViewComponent },
                    { path: 'setup/purpose/create', component: PurposeCreateComponent },
                    { path: 'setup/purpose/edit', component: PurposeCreateComponent },

                    { path: 'setup/application-for', component: ApplicationForComponent },
                    { path: 'setup/application-for/create', component: ApplicationForCreateComponent },
                    { path: 'setup/application-for/edit', component: ApplicationForCreateComponent },

                    { path: 'setup/operational-source', component: OperationalViewComponent },
                    { path: 'setup/operational-source/create', component: OperationalCreateComponent },
                    { path: 'setup/operational-source/edit', component: OperationalCreateComponent },

                    { path: 'setup/river', component: RiverViewComponent },
                    { path: 'setup/river/create', component: RiverCreateComponent },
                    { path: 'setup/river/edit', component: RiverCreateComponent },

                    { path: 'setup/dam', component: DamViewComponent },
                    { path: 'setup/dam/create', component: DamCreateComponent },
                    { path: 'setup/dam/edit', component: DamCreateComponent },

                    { path: 'setup/basin', component: BasinViewComponent },
                    { path: 'setup/basin/create', component: BasinCreateComponent },
                    { path: 'setup/basin/edit', component: BasinCreateComponent },

                    { path: 'setup/feedback', component: FeedbackViewComponent },
                    { path: 'setup/feedback/create', component: FeedbackCreateComponent },
                    { path: 'setup/feedback/edit', component: FeedbackCreateComponent },

                    { path: 'manage/user', component: UserViewComponent },
                    { path: 'manage/update-status', component: UpdateStatusComponent },
                    { path: 'manage/user/create', component: UserCreateComponent },
                    { path: 'manage/user/edit', component: UserCreateComponent },
                    { path: 'manage/role', component: RoleComponent },
                    { path: 'manage/role/create', component: RoleCreateComponent },
                    { path: 'manage/role/edit', component: RoleCreateComponent },
                    { path: 'manage/role/map', component: RoleMapComponent },
                    { path: 'manage/resource', component: ResourceComponent },
                    { path: 'manage/resource/create', component: ResourceCreateComponent },
                    { path: 'manage/resource/edit', component: ResourceCreateComponent },
                    { path: 'manage/payment-status-check', component: PaymentStatusCheckComponent},
                ]
            },
            {
                path: 'approver',
                children: [
                    { path: '', redirectTo: 'myView', pathMatch: 'full' },
                    { path: 'myView', component: DashboardComponent },
                    { path: 'proposal', component: AdminProposalComponent },
                    { path: 'approval/:applId', component: ProposalApprovalComponent },
                    { path: 'status/:appId', component: AppStatusComponent },
                    { path: 'mis-report', component: MisReportComponent },
                    { path: 'view/:applId', component: RegistrationFormComponent },
                    { path: 'edit/:applId', component: RegistrationFormComponent },
                    { path: 'industry-mapping', component: IndustryMappingComponent },
                    { path: 'change-password', component: ChangePasswordComponent },
                    { path: 'calendar', component: HolidaysComponent},
                    { path: 'acknowledgement/:applId', component: AcknowledgementComponent },
                ]
            }
            // { path: 'uac', loadChildren: () => import('./modules/uac/uac.module').then(m => m.UacModule) },
            // { path: 'mdm', loadChildren: () => import('./modules/mdm/mdm.module').then(m => m.MdmModule) },
            // { path: 'dist', loadChildren: () => import('./modules/dist/dist.module').then(m => m.DistModule) },
            // { path: 'lookup', component: LookupComponent },  
        ]
    }
];

export const PageModuleRouting: ModuleWithProviders = RouterModule.forChild(PageRoutes);
