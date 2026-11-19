import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuService } from '@app/menu/menu.service';
import { TEST_MENU } from '@app/menu/menu.data';
import { Settings } from '@app/app.settings.model';
import { AppSetting } from '@app/app.setting';

@Component({
    selector: 'app-vertical-menu',
    templateUrl: './vertical-menu.component.html',
    styles: [],

    // providers: [MenuService]
})
export class VerticalMenuComponent implements OnInit {
    public settings: Settings;
    constructor(
        private appSettings: AppSetting
    ) {
        this.settings = this.appSettings.setting;
    }

    ngOnInit() {
    }


}
