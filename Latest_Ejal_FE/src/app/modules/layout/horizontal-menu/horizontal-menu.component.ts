import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Settings } from '@app/app.settings.model';
import { AppSetting } from '@app/app.setting';

@Component({
    selector: 'app-horizontal-menu',
    templateUrl: './horizontal-menu.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.Emulated
})
export class HorizontalMenuComponent implements OnInit {
    public settings: Settings;
    constructor(
        private appSettings: AppSetting
    ) {
        this.settings = this.appSettings.setting;
        console.log('*************setting1************', this.settings);
    }

    ngOnInit() {
    }

}
