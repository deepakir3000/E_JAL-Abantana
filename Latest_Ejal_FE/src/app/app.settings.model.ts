export class Settings {
    constructor(
        public userDetails: {
            name: string,
            emailId: string,
            mobNo: string
        },
        public pageWidth: number,
        public name: string,
        public footer: string,
        public menuType: string,
        public isMiniMenuReq: boolean,
        public showMiniMenu: boolean,
        public showMenu: boolean,
        public openRoleModule: boolean,
        public showRole: boolean
    ) { }
}
