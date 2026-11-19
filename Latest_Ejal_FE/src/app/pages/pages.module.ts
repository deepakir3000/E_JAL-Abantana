import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {CommonFormModule} from './../modules/common-form/common-form.module'
import { PageModuleRouting } from './pages.routing';
import { ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from '@app/modules/layout/header/header.component';
import { VerticalMenuComponent } from '@app/modules/layout/vertical-menu/vertical-menu.component';
import { HorizontalMenuComponent } from '@app/modules/layout/horizontal-menu/horizontal-menu.component';
import { FooterComponent } from '@app/modules/layout/footer/footer.component';
import { LookupComponent } from '@app/components/lookup/lookup.component';
import { MyViewComponent } from './modules/citizen/my-view/my-view.component';
import { CitizenFormComponent } from './modules/citizen/citizen-form/citizen-form.component';
import { PaymentComponent } from './modules/citizen/payment/payment.component';
import { StatusComponent } from './modules/citizen/status/status.component';
import { AdminProposalComponent } from './modules/admin/admin-proposal/admin-proposal.component';
import { EditProfileComponent } from './modules/citizen/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './modules/citizen/change-password/change-password.component';
import { ProposalApprovalComponent } from './modules/admin/proposal-approval/proposal-approval.component';
import { BlockCreateComponent } from './modules/admin/setup/block/block-create/block-create.component';
import { BlockViewComponent } from './modules/admin/setup/block/block-view/block-view.component';
import { DistrictViewComponent } from './modules/admin/setup/district/district-view/district-view.component';
import { DistrictCreateComponent } from './modules/admin/setup/district/district-create/district-create.component';
import { StateViewComponent } from './modules/admin/setup/state/state-view/state-view.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxPaginationModule} from 'ngx-pagination'
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RoleComponent } from './modules/admin/manage/role/role.component';
import { ResourceComponent } from './modules/admin/manage/resource/resource.component';
import { UserViewComponent } from './modules/admin/manage/user/user-view/user-view.component';
import { IndustryTypeViewComponent } from './modules/admin/setup/industry-type/industry-type-view/industry-type-view.component';
// import { UserCreateComponent } from './modules/admin/manage/user/user-create/user-create.component';
import { InstructionComponent } from './modules/citizen/instruction/instruction.component';
import { PaymentStatusComponent } from './modules/citizen/payment-status/payment-status.component';
import { ApplicationStatusComponent } from './modules/citizen/application-status/application-status.component';
import { StateCreateComponent } from './modules/admin/setup/state/state-create/state-create.component';
import { IndustryTypeComponent } from './modules/admin/setup/industry-type/industry-type/industry-type.component';
import { PurposeViewComponent } from './modules/admin/setup/purpose/purpose-view/purpose-view.component';
import { PurposeCreateComponent } from './modules/admin/setup/purpose/purpose-create/purpose-create.component';
import { ApplicationForComponent } from './modules/admin/setup/application-for/application-for/application-for.component';
import { ApplicationForCreateComponent } from './modules/admin/setup/application-for/application-for-create/application-for-create.component';
import { OperationalViewComponent } from './modules/admin/setup/operational-source/operational-view/operational-view.component';
import { OperationalCreateComponent } from './modules/admin/setup/operational-source/operational-create/operational-create.component';
import { UserCreateComponent } from './modules/admin/manage/user/user-create/user-create.component';
import { RoleCreateComponent } from './modules/admin/manage/role/role-create/role-create.component';
import { ResourceCreateComponent } from './modules/admin/manage/resource/resource-create/resource-create.component';
import { RoleMapComponent } from './modules/admin/manage/role/role-map/role-map.component';
// import { PurposeComponent } from './modules/admin/setup/purpose/purpose.component';
import { NewUserService}from './../pages/modules/admin/manage/user/new-user.service';
import { LoginService}from './../services/admin/login.service';
import { ResourceService}from './../services/admin/resource.service';
import { UserService}from './../services/admin/role.service';
import { StateService } from './../pages/modules/admin/setup/state/state.service';
import {PurposeService}from './../pages/modules/admin/setup/purpose/purpose.service'
import { from } from 'rxjs';
import { AdminProposalService } from '@app/services/admin/admin-proposal.service';
import { CommonFormService } from '@app/modules/common-form/common-form.service';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { IndustryMappingComponent } from './modules/admin/industry-mapping/industry-mapping.component';
import { RiverViewComponent } from './modules/admin/setup/river/river-view/river-view.component';
import { RiverCreateComponent } from './modules/admin/setup/river/river-create/river-create.component';
import { DamViewComponent } from './modules/admin/setup/dam/dam-view/dam-view.component';
import { DamCreateComponent } from './modules/admin/setup/dam/dam-create/dam-create.component';
import { BasinViewComponent } from './modules/admin/setup/basin/basin-view/basin-view.component';
import { BasinCreateComponent } from './modules/admin/setup/basin/basin-create/basin-create.component';
import { DistrictService } from './modules/admin/setup/district/district.service';
import { BlockService } from './modules/admin/setup/block/block.service';
import { MisReportComponent } from './modules/admin/mis-report/mis-report.component';
import { FeedbackCreateComponent } from './modules/admin/setup/feedback/feedback-create/feedback-create.component';
import { FeedbackViewComponent } from './modules/admin/setup/feedback/feedback-view/feedback-view.component';
import { UpdateStatusComponent } from './modules/admin/manage/update-status/update-status.component';
import { AppStatusComponent } from './modules/admin/status/status.component';
import { HolidaysComponent } from './modules/admin/holidays/holidays.component';
import { HolidaysService } from '../services/admin/holidays.service';
// import { ChatbotComponent } from './modules/chatbot/chatbot.component';
import { ChatbotService } from '@app/services/chatbot.service';
import { PaymentStatusCheckComponent } from './modules/admin/payment-status-check/payment-status-check.component';
import { PreventPasteDirective } from './directive/prevent-paste.directive';
import { AcknowledgementComponent } from './modules/citizen/acknowledgement/acknowledgement.component';
// import { CommonService } from '@app/services/common/common.service';


@NgModule({
    declarations: [
        PagesComponent,
        HeaderComponent,
        VerticalMenuComponent,
        HorizontalMenuComponent,
        FooterComponent,
        LookupComponent,
        MyViewComponent,
        CitizenFormComponent,
        PaymentComponent,
        StatusComponent,
        AdminProposalComponent,
        EditProfileComponent,
        ChangePasswordComponent,
        ProposalApprovalComponent,
        BlockCreateComponent,
        BlockViewComponent,
        DistrictViewComponent,
        DistrictCreateComponent,
        StateViewComponent,
        RoleComponent,
        ResourceComponent,
        UserViewComponent,
        IndustryTypeViewComponent,
        InstructionComponent,
        PaymentStatusComponent,
        // UserCreateComponent,
        ApplicationStatusComponent,
        StateCreateComponent,
        IndustryTypeComponent,
        PurposeViewComponent,
        PurposeCreateComponent,
        ApplicationForComponent,
        ApplicationForCreateComponent,
        OperationalViewComponent,
        OperationalCreateComponent,
        UserCreateComponent,
        RoleCreateComponent,
        ResourceCreateComponent,
        RoleMapComponent,
        DashboardComponent,
        IndustryMappingComponent,
        RiverViewComponent,
        RiverCreateComponent,
        DamViewComponent,
        DamCreateComponent,
        BasinViewComponent,
        BasinCreateComponent,
        MisReportComponent,
        FeedbackCreateComponent,
        FeedbackViewComponent,
        UpdateStatusComponent,
        AppStatusComponent,
        HolidaysComponent,
        PaymentStatusCheckComponent,
        PreventPasteDirective,
        AcknowledgementComponent
        // ChatbotComponent
        // PurposeComponent
    ],
    providers: [
        NewUserService,
        LoginService,
        ResourceService,
        UserService,
        StateService,
        PurposeService,
        AdminProposalService,
        CommonFormService,
        DistrictService,
        BlockService,
        HolidaysService,
        ChatbotService
        // CommonService
    ],
    imports: [
        BsDatepickerModule,
        CommonModule,
        PageModuleRouting,
        CommonFormModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule,
        ModalModule.forRoot(),
        TabsModule.forRoot(),
        // BsDatepickerModule
    ]
})
export class PagesModule { }
