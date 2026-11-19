import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Settings } from '@app/app.settings.model';
import { AppSetting } from '@app/app.setting';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class FooterComponent implements OnInit {
    public settings: Settings;
    constructor(
        private appSettings: AppSetting
    ) {
        this.settings = this.appSettings.setting;
    }

    ngOnInit() {
    }

}
