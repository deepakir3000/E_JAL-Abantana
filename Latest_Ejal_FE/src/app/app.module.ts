import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BsDatepickerModule, TooltipModule, ModalModule, PopoverModule } from 'ngx-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
// import { InlineSVGModule } from 'ng-inline-svg';

import { AppComponent } from './app.component';
import { AppModuleRouting } from './app.routing';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { Error401Component } from './components/error/error401/error401.component';
import { Error404Component } from './components/error/error404/error404.component';
import { Error500Component } from './components/error/error500/error500.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProductsComponent } from './components/products/products.component';
import { ClientErrorHandlerService } from './services/ErrorHandler/client-error-handler.service';
import { CommonModule, DatePipe } from '@angular/common';
import { ChangePasswordService } from './components/change-password/change-password.service';
import { PaymentResponseComponent } from './components/payment-response/payment-response/payment-response.component';
import { CustomInterceptorService } from './services/custom-interceptor/custom-interceptor.service';
import { ChatbotComponent } from './pages/modules/chatbot/chatbot.component';
import { RedirectDataComponent } from './components/redirect-data/redirect-data.component';
import { MaskIdPipe } from './pipes/maskid.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { DateFormatPipe } from './pipes/date-now.pipe';
import { ResponseHeaderInterceptor } from './services/httpClient/res-header.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { EAppealService } from './components/e-appeal/appeal-dashboard/e-appeal.service';
import { LoginService } from './services/admin/login.service';
import { AppealDashboardComponent } from './components/e-appeal/appeal-dashboard/appeal-dashboard.component';
import { AppealLoginComponent } from './components/e-appeal/appeal-login/appeal-login.component';
import { AppealLoginService } from './services/appeal/appeal.service';
import { AppealAdminDashboardComponent } from './components/e-appeal/appeal-admin-dashboard/appeal-admin-dashboard.component';
import { AppealProfileComponent } from './components/e-appeal/appeal-profile/appeal-profile.component';
import { IntegratedComponent } from './components/e-appeal/integrated/integrated.component';
import { NewUserGuard } from './guard/appeal/new_user.guard';
// import { CommonService } from './services/common/common.service';

@NgModule({
    declarations: [
        AppComponent,
        ChangePasswordComponent,
        ForgotPasswordComponent,
        Error401Component,
        Error404Component,
        Error500Component,
        LoginComponent,
        UserProfileComponent,
        ProductsComponent,
        PaymentResponseComponent,
        ChatbotComponent,
        RedirectDataComponent,
        MaskIdPipe,
        SearchPipe,
        DateFormatPipe,
        // PaymentStatusComponent,
         AppealDashboardComponent,
        AppealLoginComponent,
        AppealAdminDashboardComponent,
        AppealProfileComponent,
        IntegratedComponent  //temp
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgxSpinnerModule,
        BsDatepickerModule.forRoot(),
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
        ToastrModule.forRoot(),
        AppModuleRouting,
        ReactiveFormsModule,
        FormsModule,
         NgxPaginationModule,
         CommonModule,
    ],
    providers: [
        { provide: ErrorHandler, useClass: ClientErrorHandlerService},
        { provide: HTTP_INTERCEPTORS, useClass: ResponseHeaderInterceptor, multi: true },
        DatePipe,
        ChangePasswordService,
        // CommonService
         EAppealService,
        LoginService,
        AppealLoginService,
        NewUserGuard

    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
