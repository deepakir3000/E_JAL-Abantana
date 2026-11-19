export class MenuModel {
    constructor(
        public menuId: number,
        public parentMenuId: number,
        public resId: number,
        public resGrId: number,
        public menuOrder: number,
        public subMenuOrder: number,
        public title: string,
        public iconType: string,
        public icon: string,
        public routerLink: string,
        public lookUpMenuName: string,
        public isSubMenu: boolean,
        public isExtraMenu: boolean,
        public isItLookUp: boolean,
        public isItInTopNav: boolean,
        public isReadPerAvail: boolean,
        public isWritePerAvail: boolean
    ) { }
}
