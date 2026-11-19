import { Injectable } from '@angular/core';
import { Settings } from './app.settings.model';

@Injectable({
    providedIn: 'root'
})
export class AppSetting {
    constructor() {

    }
    public showNotification;
    public setting = new Settings(
        {
            name: 'xya',
            emailId: 'xyz@gmail.com',
            mobNo: '7878787878'
        },
        0,
        'ormas',
        'Copyright @ 2019 ORMAS, Odisha',
        'VMENU',
        false,
        true,
        true,
        false,
        false,
    );
}


