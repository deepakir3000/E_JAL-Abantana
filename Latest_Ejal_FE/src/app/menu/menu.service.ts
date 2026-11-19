import { MenuModel } from './menu-model';
import { Injectable, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from '@app/services/storage/storage.service';
import { LOOKUP_MENU } from './menu.data';
import { AppConstants } from '@app/app.constants';

@Injectable()
export class MenuService {

    constructor(
        private renderer: Renderer2,
        private location: Location,
        private router: Router,
        private appStorage: StorageService
    ) { }

    public collapseAllMenusInNav() {
        this.collapseSubMenus(false);
    }

    public createMenu(menus: MenuModel[], menuType: number): boolean {
        // VERTICAL MENU CONTAINER ID ---- #MenuContent101
        const VERTICAL_MENU_CONTAINER = document.getElementById('MenuContent101');
        // HORIZONTAL MENU CONTAINER ID ---- #MenuContent102
        const HORIZONTAL_MENU_CONTAINER = document.getElementById('MenuContent102');
        const FILTERED_MENU = menus.filter(item => !item.isExtraMenu);
        if (menuType === 101) { // FOR VERTICAL MENU
            const WRAPPER = this.renderer.createElement('ul');
            this.renderer.addClass(WRAPPER, 'vNav');
            const MENU_DTLS = this.createVerticalMenu(FILTERED_MENU, WRAPPER);
            this.renderer.appendChild(VERTICAL_MENU_CONTAINER, MENU_DTLS);
            return true;
        } else if (menuType === 102) { // FOR HORIZONTAL MENU
            const WRAPPER = this.renderer.createElement('ul');
            this.renderer.addClass(WRAPPER, 'hNav');
            const MENU_DTLS = this.createHorizontalMenu(FILTERED_MENU, WRAPPER);
            this.renderer.appendChild(HORIZONTAL_MENU_CONTAINER, MENU_DTLS);
            return true;
        }
        return false;
    }

    private createVerticalMenu(menus: MenuModel[], menuWrapper) {
        const PARENT_MENU = menus.filter(item => item.parentMenuId === 0).sort((m1,m2)=>{
            return m1.menuOrder - m2.menuOrder
        });
        console.log(PARENT_MENU);
        PARENT_MENU.forEach(mainMenu => {
            if (!mainMenu.isSubMenu) {
                // NOT A SUBMENU
                this.renderer.appendChild(menuWrapper, this.createVerticalMenuItem(mainMenu, false, null));
            } else {
                // SUBMENU
                this.renderSubMenu(menuWrapper, 101, menus, mainMenu, false);
            }
        });
        return menuWrapper;
    }

    private createVerticalMenuItem(menuItem: MenuModel, isItLookup: boolean, lookUpParMenu: MenuModel) {
        /* USED TO CREATE THE LINK */
        const LI_TAG = this.renderer.createElement('li');
        this.renderer.addClass(LI_TAG, 'menu-item');
        this.renderer.setAttribute(LI_TAG, 'id', 'LINK#' + menuItem.resId + '#');
        this.renderer.listen(LI_TAG, 'click', () => {
            this.activeVerticalMenuLink(LI_TAG);
            this.router.navigateByUrl(menuItem.routerLink);
            if (isItLookup) {
                this.appStorage.setSessionAttribute('lookUpMenuId', 'LINK#' + lookUpParMenu.resId);
            }
        });
        if (isItLookup) {
            this.renderer.setAttribute(LI_TAG, 'data-lookup-link', 'LINK#' + lookUpParMenu.resId);
        }
        const ANCHOR_TAG = this.renderer.createElement('a');
        this.renderer.addClass(ANCHOR_TAG, 'menu-link');
        this.renderer.setAttribute(ANCHOR_TAG, 'href', 'javascript:void(0);');
        const ICON = this.renderer.createElement('i');
        this.renderer.addClass(ICON, 'fa');
        this.renderer.addClass(ICON, 'fa-user-o');
        this.renderer.addClass(ICON, 'menu-icon');
        const SPAN = this.renderer.createElement('span');
        this.renderer.addClass(SPAN, 'menu-txt');
        const MENU_TITLE = this.renderer.createText(menuItem.title);
        this.renderer.appendChild(SPAN, MENU_TITLE);
        this.renderer.appendChild(ANCHOR_TAG, ICON);
        this.renderer.appendChild(ANCHOR_TAG, SPAN);
        this.renderer.appendChild(LI_TAG, ANCHOR_TAG);
        return LI_TAG;
    }

    private createVerticalSubMenuItem(menuItem: MenuModel, subMenus: MenuModel[], totalMenus: MenuModel[]) {
        /* USED TO CREATE SUBMENU LINK */
        const LI_TAG = this.renderer.createElement('li');
        this.renderer.addClass(LI_TAG, 'sub-menu-item');
        this.renderer.setAttribute(LI_TAG, 'id', 'LINK#' + menuItem.resId + '#');
        const ANCHOR_TAG = this.renderer.createElement('a');
        this.renderer.addClass(ANCHOR_TAG, 'sub-menu-link');
        this.renderer.setAttribute(ANCHOR_TAG, 'href', 'javascript:void(0);');
        this.renderer.listen(ANCHOR_TAG, 'click', () => {
            this.activeVerticalSubMenuLink(LI_TAG);
        });
        const ICON = this.renderer.createElement('i');
        this.renderer.addClass(ICON, 'fa');
        this.renderer.addClass(ICON, menuItem.icon);
        this.renderer.addClass(ICON, 'menu-icon');
        const SPAN = this.renderer.createElement('span');
        this.renderer.addClass(SPAN, 'menu-txt');
        const MENU_TITLE = this.renderer.createText(menuItem.title);

        this.renderer.appendChild(SPAN, MENU_TITLE);
        this.renderer.appendChild(ANCHOR_TAG, ICON);
        this.renderer.appendChild(ANCHOR_TAG, SPAN);

        this.renderer.appendChild(LI_TAG, ANCHOR_TAG);
        /* USED TO CREATE SUBMENU CONTAINER */
        const UL_TAG = this.renderer.createElement('ul');
        this.renderer.addClass(UL_TAG, 'sub-menu-item-container');
        /* USED TO CREATE INNER SUBMENUS OR MENU INSIDE THE SUBMENU */
        subMenus.forEach(item => {
            if (!item.isSubMenu) {
                this.renderer.appendChild(UL_TAG, this.createVerticalMenuItem(item, false, null));
            } else {
                this.renderSubMenu(UL_TAG, 101, totalMenus, item, false);
            }
        });
        this.renderer.appendChild(LI_TAG, UL_TAG);
        return LI_TAG;
    }

    private activeVerticalMenuLink(link: Element) {
        /* USED FOR FINDING TOTAL MENU ITEMS & REMOVE ACTIVE LINK FROM IT */
        const MENU = document.querySelectorAll('.menu-item');
        let menuLength = MENU.length;
        while (menuLength > 0) {
            menuLength--;
            if (MENU.item(menuLength).classList.contains('active-link')) {
                MENU.item(menuLength).classList.remove('active-link');
                break;
            }
        }
        /* USED CLOSE THE SUBMENUS BELOW THIS SELECTED MENU ITEM */
        link.parentNode.querySelectorAll('.sub-menu-item').forEach(item => {
            this.removeActiveLinkFromMenu(item, true);
        });
        /* USED TO ACTIVE THE SELECTED MENU ITEM */
        link.classList.add('active-link');
    }

    private activeVerticalSubMenuLink(link: Element) {
        /* USED TO TOGGLE THE SUBMENU */
        if (link.children[0].classList.contains('active-link')) {
            /* TO OPEN PRESENT SUBMENU */
            this.removeActiveLinkFromMenu(link, true);
            /* USED TO CLOSE THE INNER SUBMENUS */
            link.querySelectorAll('.sub-menu-item').forEach(item => {
                this.removeActiveLinkFromMenu(item, true);
            });
        } else {
            /* USED TO CLOSE THE OTHER SUBMENUS IF OPENED */
            if (link.parentElement.classList.contains('vNav')) {
                document.querySelectorAll('.sub-menu-item').forEach(item => {
                    this.removeActiveLinkFromMenu(item, true);
                });
            }
            /* TO CLOSE PRESENT SUBMENU */
            link.children[0].classList.add('active-link');
            link.children[1].classList.add('show');
        }
    }


    private createHorizontalMenu(menus: MenuModel[], menuWrapper) {
        const PARENT_MENU = menus.filter(item => item.parentMenuId === 0).sort((m1,m2)=>{
            return m1.menuOrder - m2.menuOrder
        });
        console.log(PARENT_MENU);
        PARENT_MENU.forEach(mainMenu => {
            if (!mainMenu.isSubMenu) {
                // NOT A SUBMENU
                this.renderer.appendChild(menuWrapper, this.createHorizontalMenuItem(mainMenu, 'T-101', false, null));
            } else {
                // SUBMENU
                this.renderSubMenu(menuWrapper, 102, menus, mainMenu, false);
            }
        });
        return menuWrapper;
    }

    private createHorizontalMenuItem(menu: MenuModel, type: string, isItLookup: boolean, lookUpParMenu: MenuModel) {
        console.log('Horizontal Menu',menu);
        const LI_TAG = this.renderer.createElement('li');
        this.renderer.setAttribute(LI_TAG, 'id', 'LINK#' + menu.resId + '#');
        this.renderer.listen(LI_TAG, 'click', () => {
            this.activeHorizontalMenuLink(LI_TAG);
            this.router.navigateByUrl(menu.routerLink);
            if (isItLookup) {
                this.appStorage.setSessionAttribute('lookUpMenuId', 'LINK#' + lookUpParMenu.resId);
            }
        });
        if (isItLookup) {
            this.renderer.setAttribute(LI_TAG, 'data-link', 'LINK#' + lookUpParMenu.resId);
        }
        const ANCHOR_TAG = this.renderer.createElement('a');
        this.renderer.addClass(ANCHOR_TAG, 'menu-link');
        this.renderer.setAttribute(ANCHOR_TAG, 'href', 'javascript:void(0);');
        this.renderer.listen(ANCHOR_TAG, 'click', () => {
            this.collapseSubMenus(false);
        });
        if (type === 'T-101') { // FOR HEAD MENU
            this.renderer.addClass(LI_TAG, 'head-menu-item');
            this.renderer.listen(ANCHOR_TAG, 'mouseover', () => {
                this.collapseSubMenus(false);
            });
        } else if (type === 'T-102') {// FOR OTHER MENU
            this.renderer.addClass(LI_TAG, 'menu-item');
        }
        const ICON = this.renderer.createElement('img');
        // this.renderer.addClass(ICON, 'fa');
        if(menu.title === 'My View') {
            this.renderer.setAttribute(ICON, 'src', 'assets/icon/my_view.png');
        } else if(menu.title === 'PG Info' || menu.icon === 'fa-cogs') {
            this.renderer.setAttribute(ICON, 'src', 'assets/icon/pg_info.png');
        } else {
            this.renderer.setAttribute(ICON, 'src', menu.icon);
        }
        // this.renderer.addClass(ICON, menu.icon);
        this.renderer.addClass(ICON, 'menu-icon');
        const SPAN = this.renderer.createElement('span');
        this.renderer.addClass(SPAN, 'menu-txt');
        const MENU_TITLE = this.renderer.createText(menu.title);
        this.renderer.appendChild(SPAN, MENU_TITLE);
        this.renderer.appendChild(ANCHOR_TAG, ICON);
        this.renderer.appendChild(ANCHOR_TAG, SPAN);
        this.renderer.appendChild(LI_TAG, ANCHOR_TAG);
        // console.log(LI_TAG);
        return LI_TAG;
    }

    private createHorizontalSubMenuItem(menuItem: MenuModel, subMenus: MenuModel[], totalMenus: MenuModel[], type: string) {
        /* USED TO CREATE SUBMENU LINK */
        // console.log('SUBMENUS===========>',subMenus);
        const LI_TAG = this.renderer.createElement('li');
        this.renderer.addClass(LI_TAG, 'sub-menu');

        this.renderer.setAttribute(LI_TAG, 'id', 'LINK#' + menuItem.resId + '#');
        const ANCHOR_TAG = this.renderer.createElement('a');
        this.renderer.addClass(ANCHOR_TAG, 'sub-menu-link');
        this.renderer.setAttribute(ANCHOR_TAG, 'href', 'javascript:void(0);');
        this.renderer.listen(ANCHOR_TAG, 'click', () => {
            this.activeHorizontalSubmenuLink(LI_TAG);
        });
        if (type === 'T-101') { // FOR HEADER SUB MENU
            this.renderer.addClass(LI_TAG, 'item-1');
            this.renderer.listen(ANCHOR_TAG, 'mouseover', () => {
                this.collapseSubMenus(false);
                LI_TAG.children[1].classList.add('show');
            });
        } else if (type === 'T-102') {// FOR OTHER SUB MENU
            this.renderer.addClass(LI_TAG, 'item-2');
        }
        const ICON = this.renderer.createElement('i');
        this.renderer.addClass(ICON, 'fa');
        this.renderer.addClass(ICON, menuItem.icon);
        this.renderer.addClass(ICON, 'menu-icon');
        const SPAN = this.renderer.createElement('span');
        this.renderer.addClass(SPAN, 'menu-txt');
        const MENU_TITLE = this.renderer.createText(menuItem.title);
        this.renderer.appendChild(SPAN, MENU_TITLE);
        this.renderer.appendChild(ANCHOR_TAG, ICON);
        this.renderer.appendChild(ANCHOR_TAG, SPAN);
        this.renderer.appendChild(LI_TAG, ANCHOR_TAG);
        /* USED TO CREATE SUBMENU CONTAINER */
        const UL_TAG = this.renderer.createElement('ul');
        this.renderer.addClass(UL_TAG, 'sub-menu-item-container');
        // need to positioned
        this.renderer.addClass(UL_TAG, 'pos-left');
        /* USED TO CREATE INNER SUBMENUS OR MENU INSIDE THE SUBMENU */
        subMenus.forEach(item => {
            if (!item.isSubMenu) {
                this.renderer.appendChild(UL_TAG, this.createHorizontalMenuItem(item, 'T-102', false, null));
            } else {
                this.renderSubMenu(UL_TAG, 102, totalMenus, item, true);
            }
        });
        this.renderer.appendChild(LI_TAG, UL_TAG);
        return LI_TAG;
    }

    private activeHorizontalMenuLink(link: Element) {
        /* USED FOR FINDING TOTAL MENU ITEMS & REMOVE ACTIVE LINK FROM IT */
        const MENU = document.querySelectorAll('.menu-link');
        let menuLength = MENU.length;
        while (menuLength > 0) {
            menuLength--;
            if (MENU.item(menuLength).classList.contains('active-link')) {
                MENU.item(menuLength).classList.remove('active-link');
                break;
            }
        }
        /* USED CLOSE THE SUBMENUS BELOW THIS SELECTED MENU ITEM */
        link.parentNode.querySelectorAll('.sub-menu').forEach(item => {
            this.removeActiveLinkFromMenu(item, true);
        });
        /* USED TO ACTIVE THE SELECTED MENU ITEM */
        this.collapseSubMenus(true);
        if (link.parentElement.classList.contains('sub-menu-item-container')) {
            if (!link.parentElement.previousElementSibling.classList.contains('active-link')) {
                link.parentElement.previousElementSibling.classList.add('active-link');
            }
            link.children[0].classList.add('active-link');
        } else {
            link.children[0].classList.add('active-link');
        }

    }

    private activeHorizontalSubmenuLink(link: Element) {
        /* USED TO TOGGLE THE SUBMENU */
        if (link.children[0].classList.contains('active-link')) {
            if (link.children[1].classList.contains('show')) {
                /* TO OPEN PRESENT SUBMENU */
                this.removeActiveLinkFromMenu(link, true);
                /* USED TO CLOSE THE INNER SUBMENUS */
                link.querySelectorAll('.sub-menu').forEach(item => {
                    this.removeActiveLinkFromMenu(item, true);
                });
            } else {
                link.children[1].classList.add('show');
            }
        } else {
            /* USED TO CLOSE THE OTHER SUBMENUS IF OPENED */
            if (link.parentElement.classList.contains('hNav')) {
                document.querySelectorAll('.sub-menu').forEach(item => {
                    this.removeActiveLinkFromMenu(item, true);
                });
            }
            /* TO CLOSE PRESENT SUBMENU */
            link.children[0].classList.add('active-link');
            link.children[1].classList.add('show');
        }
    }

    private collapseSubMenus(collapse: boolean) {
        // USED TO COLLAPSE ALL SUB-MENUS COMPLETLY AND PARTIALLY
        document.querySelectorAll('.sub-menu').forEach(item => {
            this.removeActiveLinkFromMenu(item, collapse);
        });
    }

    private removeActiveLinkFromMenu(linkItem: Element, rmAll: boolean) {
        // USED TO REMOVE THE ACTIVE CLASS FROM SELECTED SUBMENS IN BOTH VERTICAL AND HORIZONTAL MENUS
        if (rmAll) {
            linkItem.children[0].classList.remove('active-link');
            linkItem.children[1].classList.remove('show');
        } else {
            linkItem.children[1].classList.remove('show');
        }

    }

    private renderSubMenu(wrapper: any, type: number, totalMenu: MenuModel[], menuItem: MenuModel, isChild: boolean) {
        // USED TO CHECK MENUS UNDER SUB-MENU, IF > MAX_LOOKUP_LENGTH THEN CREATES A LOOKUP MENU AND HIDE REMIANING MENUS
        const SUB_MENUS = totalMenu.filter(data => data.parentMenuId === menuItem.menuId).sort((m1,m2)=>{
            return m1.subMenuOrder - m2.subMenuOrder
        });
        console.log('SUBMENUS===========>',SUB_MENUS);
        let SUB_MENU_CONTAINER: Element;
        if (type === 102) {
            // FOR HORIZONTAL MENU
            if (SUB_MENUS.length < AppConstants.LOOKUP_MENU_MAX_LENGTH) {
                SUB_MENU_CONTAINER = this.createHorizontalSubMenuItem(menuItem, SUB_MENUS, totalMenu, isChild ? 'T-102' : 'T-101');
            } else {
                const SM_1 = SUB_MENUS.slice(0, AppConstants.LOOKUP_MENU_MAX_LENGTH); const SM_2 = SUB_MENUS.slice(AppConstants.LOOKUP_MENU_MAX_LENGTH, SUB_MENUS.length);
                SUB_MENU_CONTAINER = this.createHorizontalSubMenuItem(menuItem, SM_1, totalMenu, isChild ? 'T-102' : 'T-101');
                this.setLookUpMenus(SM_2, totalMenu, menuItem.resId);
                this.renderer.appendChild(SUB_MENU_CONTAINER.children[1], this.createLookUpMenuItem(102, menuItem));
            }
        } else {
            // FOR VERTICAL MENU
            if (SUB_MENUS.length < AppConstants.LOOKUP_MENU_MAX_LENGTH) {
                SUB_MENU_CONTAINER = this.createVerticalSubMenuItem(menuItem, SUB_MENUS, totalMenu);
            } else {
                const SM_1 = SUB_MENUS.slice(0, AppConstants.LOOKUP_MENU_MAX_LENGTH); const SM_2 = SUB_MENUS.slice(AppConstants.LOOKUP_MENU_MAX_LENGTH, SUB_MENUS.length);
                SUB_MENU_CONTAINER = this.createVerticalSubMenuItem(menuItem, SM_1, totalMenu);
                this.setLookUpMenus(SM_2, totalMenu, menuItem.resId);
                this.renderer.appendChild(SUB_MENU_CONTAINER.children[1], this.createLookUpMenuItem(102, menuItem));
            }
        }
        this.renderer.appendChild(wrapper, SUB_MENU_CONTAINER);
    }

    private setLookUpMenus(remainingMenu: MenuModel[], totalMenu: MenuModel[], lookUpMenuId: number) {
        // RE-STORING THE MENUS AFTER SETTING LOOKUP MENU DETAILS
        remainingMenu.forEach(menu => {
            const INDEX = totalMenu.findIndex(item => item.resId === menu.resId);
            totalMenu[INDEX].isItLookUp = true;
            totalMenu[INDEX].lookUpMenuName = 'LINK#' + lookUpMenuId;
        });
        this.appStorage.setSessionAttribute('menus', totalMenu);
    }

    private createLookUpMenuItem(type: number, menuItem: MenuModel) {
        if (type === 101) {
            // USED TO CREATE LOOKUP MENU FOR VERTICAL
            return this.createVerticalMenuItem(LOOKUP_MENU, true, menuItem);
        } else {
            // USED TO CREATE LOOKUP MENU FOR HORIZONTAL
            return this.createHorizontalMenuItem(LOOKUP_MENU, 'T-102', true, menuItem);
        }
    }

}
