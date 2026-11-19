import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { Error401Component } from './components/error/error401/error401.component';
import { Error404Component } from './components/error/error404/error404.component';
import { Error500Component } from './components/error/error500/error500.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AuthGuard } from './guard/auth.guard';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProductsComponent } from './components/products/products.component';
import { PaymentResponseComponent } from './components/payment-response/payment-response/payment-response.component';
import { RedirectDataComponent } from './components/redirect-data/redirect-data.component';
import { AppealDashboardComponent } from './components/e-appeal/appeal-dashboard/appeal-dashboard.component';
import { AppealLoginComponent } from './components/e-appeal/appeal-login/appeal-login.component';
import { AppealProfileComponent } from './components/e-appeal/appeal-profile/appeal-profile.component';
import { IntegratedComponent } from './components/e-appeal/integrated/integrated.component';
import { AppealAdminDashboardComponent } from './components/e-appeal/appeal-admin-dashboard/appeal-admin-dashboard.component';
import { NewUserGuard } from './guard/appeal/new_user.guard';
import { AppealAdminGuard } from './guard/appeal/appealAdmin.guard';
import { AppealAuthGuard } from './guard/appeal/appealAuth.guard';


export const AppRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'table-data', component: RedirectDataComponent},
    {
        path: 'error',
        children: [
            { path: '401', component: Error401Component },
            { path: '404', component: Error404Component },
            { path: '500', component: Error500Component }
        ]
    },
    // {
    //     path: 'password',
    //     children: [
    //         { path: 'change/:uid/:tn', component: ForgotPasswordComponent },
    //         { path: 'forgot', component: ForgotPasswordComponent }
    //     ]
    // },
    {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
            { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
            { path: 'changepassword', component: ChangePasswordComponent },
            { path: 'payment-status', component: PaymentResponseComponent },
            // { path: 'products', component: ProductsComponent },
            { path: '** ', component: Error404Component }
        ]
    },
    {
        path: 'e-appeal',
        component: IntegratedComponent,
        canActivateChild: [AppealAuthGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: AppealDashboardComponent, canActivate: [NewUserGuard] },
            { path: 'appeal-profile', component: AppealProfileComponent }
        ]
    },
    {
        path: 'appeal-login', component: AppealLoginComponent
    },
    {
        path: 'e-appeal-admin',
        component: IntegratedComponent,
        canActivateChild: [AppealAuthGuard, AppealAdminGuard],
        children: [
            { path: '', component: AppealAdminDashboardComponent }
        ]
    }

    //  {
    //     path: 'e-appeal', component: AppealDashboardComponent
    //  },

    //   {
    //     path: 'appeal-profile', component: AppealProfileComponent
    //  }
];

export const AppModuleRouting: ModuleWithProviders = RouterModule.forRoot(AppRoutes, {
    preloadingStrategy: PreloadAllModules,
    useHash: true
});