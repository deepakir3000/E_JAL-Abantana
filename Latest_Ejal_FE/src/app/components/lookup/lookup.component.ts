
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuModel } from '@app/menu/menu-model';
import { CommonService } from '@app/services/common/common.service';
@Component({
        selector: 'app-lookup',
        templateUrl: './lookup.component.html',
        styles: []
})
export class LookupComponent implements OnInit {
        public extraMenus: MenuModel[] = [];
        constructor(
                private commonService: CommonService
        ) { }

        ngOnInit() {
                this.extraMenus = this.commonService.getLookUpMenus();
                console.log('Extra Menu',this.extraMenus);
        }
}
