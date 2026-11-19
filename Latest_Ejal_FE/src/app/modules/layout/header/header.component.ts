import {
  Component,
  OnInit,
  ViewEncapsulation,
  TemplateRef,
  HostListener,
} from "@angular/core";
import { Router } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { AppSetting } from "@app/app.setting";
import { Settings } from "@app/app.settings.model";
import { AuthService } from "@app/services/authentication/auth.service";
import { StorageService } from "@app/services/storage/storage.service";
import { ADMIN_MENU, APPROVER_MENU } from "@app/menu/menu.data";
import { HeaderService } from "./../../../services/admin/header.service";
import { ToastrClientService } from "@app/services/toastr/toastr.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  // styleUrls:  ['./header.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class HeaderComponent implements OnInit {
  public settings: Settings;
  public isprofile = false;
  public loginType: any;
  public isActive1 = false;
  public isActive2 = false;
  public selectedMenu: any[] = [];
  public isAdminLoggedin = false;
  public isApproverLoggedIn = false;
  public showNotification = false;
  public pageWidth: any;
  public parentMenu = [];
  public setUpSubMenu = [];
  public manageUpSubMenu = [];
  public feedbackQuestions = [];
  public submitOkay = false;
  public feedbackDetails = [];
  public nameToSearch = null;
  public menuCollapsed = true;
  public items = [
    { id: 1, name: "Proposal" },
    { id: 2, name: "Status" },
    { id: 3, name: "FAQ" },
    { id: 4, name: "Feedback" },
  ];
  public notification = [
    {
      heading: "Applied Successsfully",
      content: "Your form has been applied successfully",
    },
    {
      heading: "Recieved By Approver",
      content: "Your form has been recieved by approver",
    },
    { heading: "Payment Done", content: "Your payment has been done" },
    {
      heading: "Payment Recieved",
      content: "Your form will be reviewed by authority soon",
    },
  ];
  modalRef: BsModalRef;
  usersName: any;
  constructor(
    private appSetting: AppSetting,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrClientService,
    private appStorage: StorageService,
    private modalService: BsModalService,
    private headerService: HeaderService
  ) {
    this.settings = this.appSetting.setting;
    this.loginType = this.appStorage.getDistMenu();
    // console.log('*****************setting********', this.settings);
  }

  ngOnInit() {
    this.pageWidth = window.innerWidth;
    this.isActive1 = true;
    this.isAdminLoggedin = JSON.parse(localStorage.getItem("isAdmin"));
    this.isApproverLoggedIn = JSON.parse(localStorage.getItem("isApprover"));
    this.usersName = localStorage.getItem("user_Name");
    this.getAllMenu();
    if (this.isAdminLoggedin && !this.isApproverLoggedIn) {
      this.getAllMenu();
      this.selectedMenu = ADMIN_MENU;
      console.log('ADMIN_MENU', this.selectedMenu);
    } else {
      this.selectedMenu = APPROVER_MENU;
      console.log('APPROVER_MENU', this.selectedMenu);
      
    }
  }
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.pageWidth = window.innerWidth;
    // console.log(this.pageWidth);
  }
  public getAllMenu() {
    this.headerService.getMenuDetails().subscribe((response) => {
      console.log(response);
      this.selectedMenu = response["data"].filter((ele) => ele.sub_menu === 0);
      this.setUpSubMenu = response["data"].filter((ele) => ele.sub_menu === 3);
      this.manageUpSubMenu = response["data"].filter(
        (ele) => ele.sub_menu === 4
      );
    });
    // console.log('FUll menu===>', this.selectedMenu);
  }
  toggleProfile() {
    this.isprofile = !this.isprofile;
  }

  signOut() {
    this.spinner.show();
    this.headerService.logOut().subscribe(
      (response) => {
        this.spinner.hide();
        this.toastr.successToastr("Successfully Loggedout");
        this.router.navigateByUrl("/login");
        localStorage.clear();
        /*  localStorage.removeItem('access_token');
            localStorage.removeItem('appId');
            localStorage.removeItem('app_type');
            localStorage.removeItem('appType');
            localStorage.removeItem('user_Name');
            localStorage.removeItem('differenceValue');
            localStorage.removeItem('trs_response');
            localStorage.removeItem('role_id');
            localStorage.removeItem('type'); */
      },
      (errorResponse) => {
        this.spinner.hide();
        this.toastr.successToastr("Unable to logout");
      }
    );
  }
  public toggleMenu(id) {
    // console.log(id);
  }
  // goToHome() {
  //     if (this.loginType === "orgadmin") {
  //         this.router.navigateByUrl("/pages/mdm/myview");
  //     } else if (this.loginType === "DIST0001") {
  //         this.router.navigateByUrl("/pages/dist/myview");
  //     } else {
  //         console.log("SYSADmin");
  //     }
  // }
  public goToEditPage() {
    this.router.navigateByUrl("/pages/citizen/Edit-profile");
  }
  public goToEditChanePass() {
    this.router.navigateByUrl("/pages/citizen/change-password");
  }
  public goToPage() {
    this.router.navigateByUrl("/pages/citizen/proposal");
    this.isActive1 = true;
    this.isActive2 = false;
  }
  public goToPage2() {
    this.router.navigateByUrl("/pages/citizen/status");
    this.isActive2 = true;
    this.isActive1 = false;
  }
  public openFeedBackModal(id: TemplateRef<any>) {
    this.getAllFeedback();
    this.modalRef = this.modalService.show(id, { class: "modal-lg" });
  }
  public openNotification() {
    this.showNotification = !this.showNotification;
  }
  public openFeedBackViewModal(id: TemplateRef<any>) {
    this.getAllFeedbackDetails();
    this.modalRef = this.modalService.show(id, { class: "modal-lg" });
  }
  public getAllFeedback() {
    this.headerService.getAllFeedbackDetails().subscribe(
      (res) => {
        if (res !== null) {
          this.feedbackQuestions = res["data"];
        } else {
          this.toastr.dangerToastr("Something Went Wrong");
        }
      },
      (err) => {
        this.toastr.dangerToastr(err["message"]);
      }
    );
  }
  public getAllFeedbackDetails() {
    console.log(this.nameToSearch);
    this.headerService.getFeedbackDetails(this.nameToSearch).subscribe(
      (res) => {
        if (res !== null) {
          this.feedbackDetails = res["data"];
          // this.openFeedBackViewModal(id);
        } else {
          this.toastr.dangerToastr("Something Went Wrong");
        }
      },
      (err) => {
        this.toastr.dangerToastr(err["message"]);
      }
    );
  }
  //set answer details
  public setAnsData(qID, ans) {
    const USERID = Number(localStorage.getItem("id"));
    const ID = qID;
    const ANS = ans;
    this.feedbackQuestions.forEach((ele) => {
      if (ele.id === ID) {
        ele.answer = ANS;
        ele.userId = USERID;
      }
    });
    console.log(this.feedbackQuestions);
    let COUNT = 0;
    this.feedbackQuestions.forEach((ele) => {
      if (ele.userId === undefined) {
        COUNT++;
      }
    });
    if (COUNT === 0) {
      this.submitOkay = true;
    } else {
      this.submitOkay = false;  
    }
  }
  public postFeedback() {
    this.spinner.show();
    this.headerService.postFeedbackDetails(this.feedbackQuestions).subscribe(
      (response) => {
        this.spinner.hide();
        if (response !== null) {
          this.toastr.successToastr(response["message"]);
          this.modalRef.hide();
        } else {
          this.spinner.hide();
          this.toastr.dangerToastr("Something Went Wrong");
          this.modalRef.hide();
        }
      },
      (err) => {
        {
          this.spinner.hide();
          this.toastr.dangerToastr("Something Went Wrong");
          this.modalRef.hide();
        }
      }
    );
  }
  public textTransform(text) {
    return text.toLowerCase();
  }
}
