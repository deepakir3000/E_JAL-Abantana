import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';

import { MenuService } from '@app/menu/menu.service';
import { AppSetting } from '@app/app.setting';
import { Settings } from '@app/app.settings.model';
import { StorageService } from '@app/services/storage/storage.service';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styles: [],
    providers: [MenuService]
})
export class PagesComponent implements OnInit {
    @ViewChild('screenResolution', { static: true }) mainDiv: ElementRef;
    public settings: Settings;
    public loginType;
    LOGIN_TYPE: any;
    constructor(
        private menuService: MenuService,
        private appSettings: AppSetting,
        private appStorage: StorageService
    ) {
        this.appSettings.setting.menuType = this.appStorage.getSessionAttribute('menuType');
        this.settings = this.appSettings.setting;
        this.LOGIN_TYPE = this.appStorage.getDistMenu();
    }

    @HostListener('window:resize') private convertinOnWindowResize() {
        // guard against resize before view is rendered
        if (this.mainDiv) {
            this.appSettings.setting.pageWidth = this.mainDiv.nativeElement.clientWidth;
            // console.log(this.mainDiv.nativeElement.clientWidth);
            if (this.mainDiv.nativeElement.clientWidth <= 736) {
                this.appSettings.setting.showMenu = true;
                this.appSettings.setting.menuType = 'VMENU';
            } else {
                this.appSettings.setting.showMenu = true;
                this.appSettings.setting.menuType = this.appStorage.getSessionAttribute('menuType');
            }
        }
    }

    // @HostListener('window:scroll') private shiftingHorizontalMenu() {
    //     //    this.setMenues();
    //     if(this.appSettings.setting.isMiniMenuReq && this.LOGIN_TYPE === 'orgadmin') {
    //         console.log('Orgadmin');
    //         if (window.pageYOffset > 120) {
    //             console.log('Yes');
    //             this.appSettings.setting.showMiniMenu = true;
    //         }
    //         if (window.pageYOffset < 50) {
    //             console.log('No');
    //             this.appSettings.setting.showMiniMenu = false;
    //         }
    //     }
    //     if (this.LOGIN_TYPE === 'DIST0001') {
    //         this.appSettings.setting.showMiniMenu = true;
    //     }
    //     console.log(window.pageYOffset);
    // }

    ngOnInit() {
        this.setMenues();
        // console.log(this.mainDiv);
        // console.log(this.settings);
        // this.appStorage.setSessionAttribute('menus', TEST_MENU);
        // this.menuService.createMenu(this.appStorage.getSessionAttribute('menus'), 101);
        // this.menuService.createMenu(this.appStorage.getSessionAttribute('menus'), 102);
        // console.log('Menu Details', this.appStorage.getSessionAttribute('menus'));
    }


    ngAfterContentInit(): void {
        // console.log(this.mainDiv);
        this.appSettings.setting.pageWidth = this.mainDiv.nativeElement.clientWidth;
    }
    public setMenues() {
        console.log('login Type-------------->', this.LOGIN_TYPE);
        if (this.LOGIN_TYPE === 'DIST0001') {
            // console.log('DIST001');
            this.appSettings.setting.showMiniMenu = true;
        }
        // else{
        //     this.appSettings.setting.showMiniMenu = false;
        // }

    }
    public closeMenues() {
        this.menuService.collapseAllMenusInNav();
    }
    ngOnDestroy() {
    }
}
