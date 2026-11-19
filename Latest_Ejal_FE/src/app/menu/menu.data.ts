import { MenuModel } from './menu-model';

export const TEST_MENU: MenuModel[] = [
    // new MenuModel(6, 0, 1006, 16, 6, 0, 'Configration', 'ICON', 'fa-bolt', 'javascript:void(0);', null, false, false, false, false, true, true),
    new MenuModel(40, 0, 1007, 17, 40, 0, 'Exhibition', 'ICON', 'assets/icon/exhibition.png', 'javascript:void(0);', null, false, false, false, false, true, true),
    // new MenuModel(8, 0, 1008, 18, 8, 0, 'Projects', 'ICON', 'fa-assistive-listening-systems', 'javascript:void(0);', null, false, false, false, false, true, true),
    // new MenuModel(41, 0, 1008, 19, 41, 0, 'Settings', 'ICON', 'assets/icon/setting.png', 'javascript:void(0);', null, false, false, false, false, true, true),
    new MenuModel(41, 0, 1008, 19, 41, 0, 'Report', 'ICON', 'assets/icon/report.png', 'javascript:void(0);', null, false, false, false, false, true, true),
    new MenuModel(41, 0, 1008, 19, 41, 0, 'Support', 'ICON', 'assets/icon/more.png', 'javascript:void(0);', null, false, false, false, false, true, true),
    // new MenuModel(10, 9, 1010, 10, 0, 1, 'menu item - 1', 'ICON', 'fa-assistive-listening-systems', 'javascript:void(0);', null, false, false, false, false, true, true),
    // new MenuModel(11, 9, 1011, 11, 0, 2, 'menu item - 2', 'ICON', 'fa-binoculars', 'javascript:void(0);', null, false, false, false, false, true, true),
    new MenuModel(101, 18, 1018, 26, 0, 8, 'Product', 'ICON', 'fa-lightbulb-o', '/pages/mdm/setup/products', null, false, false, false, false, false, false),
    new MenuModel(102, 18, 1019, 26, 0, 9, 'Member', 'ICON', 'fa-lightbulb-o', '/pages/mdm/setup/member', null, false, false, false, false, false, false),
    new MenuModel(103, 18, 1020, 26, 0, 10, 'PG', 'ICON', 'fa-lightbulb-o', '/pages/mdm/setup/pg', null, false, false, false, false, false, false),
    new MenuModel(104, 18, 1021, 26, 0, 11, 'SHG', 'ICON', 'fa-lightbulb-o', '/pages/mdm/setup/shg', null, false, false, false, false, false, false),
];


export const LOOKUP_MENU = new MenuModel(0, 0, 0, 0, 0, 0, 'Lookup', 'ICON', 'fa-user', '/pages/lookup', null, false, false, false, false, false, false);

export const ADMIN_MENU: any[] = [
    { id: 1, name: 'My View', isActive: false, hasSubMenu: false, subMenu: [], link: 'admin' },
    { id: 2, name: 'Proposal', isActive: true, hasSubMenu: false, subMenu: [], link: 'admin/proposal' },
    {
        id: 3, name: 'Setup', isActive: false, hasSubMenu: true,
        subMenu: [
            { name: 'State', link: 'admin/setup/state' },
            { name: 'District', link: 'admin/setup/district' },
            { name: 'Block', link: 'admin/setup/block' },
            { name: 'Industry', link: 'admin/setup/industry' },
            { name: 'Purpose', link: 'admin/setup/purpose' },
            { name: 'Application For', link: 'admin/setup/application-for' },
            { name: 'Operational Source', link: 'admin/setup/operational-source' },
        ]
    },
    {
        id: 4, name: 'Manage', isActive: false, hasSubMenu: true, subMenu: [
            { name: 'User', link: 'admin/manage/user' },
            { name: 'Role', link: 'admin/manage/role' },
            { name: 'Resource', link: 'admin/manage/resource' },
            // { name: 'Resource Group', link: 'admin/manage/resource' },
        ]
    },
    { id: 5, name: 'MIS', isActive: false, hasSubMenu: false, subMenu: [] },
    // { id: 6, name: 'Feedback', isActive: false, hasSubMenu : false, subMenu: []},
];
export const APPROVER_MENU: any[] = [
    { id: 1, name: 'My View' },
    { id: 2, name: 'Proposal', isActive: true, hasSubMenu: false, subMenu: [], link: 'approver/proposal' },
    { id: 5, name: 'MIS' },
    // { id: 6, name: 'Feedback'},
];
