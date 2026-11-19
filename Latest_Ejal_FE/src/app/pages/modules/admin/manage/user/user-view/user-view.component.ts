import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrClientService } from "@app/services/toastr/toastr.service";
import { PaginationModel } from "@app/model/pagination-model";
import { NewUserService } from "./../new-user.service";

@Component({
  selector: "app-user-view",
  templateUrl: "./user-view.component.html",
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class UserViewComponent implements OnInit {
  public userList = [];
  private paginationObject: PaginationModel;
  public UserPageNo = 0;
  public UserPageSize = 10;
  public UserTotalElements = 0;
  public selectedPageSize = 10;
  public selectedName;
  public selectedUser;
  constructor(
    private router: Router,
    private userActivatedRoute: ActivatedRoute,
    private toastr: ToastrClientService,
    private service: NewUserService
  ) {}

  ngOnInit() {
    this.setPageDetails(0,1);
  }
  public setPageDetails(currentPage,pageNoToGo: any) {
    this.UserPageNo = pageNoToGo;
    this.paginationObject = {
     isActiveDataRequired: false,
     isPaginationRequired: true,
     isOrderRequired: false,
     isAscending: false,
     pageNumber: this.UserPageNo ,
     pageSize: this.UserPageSize,
      orderField: "id"
    };
    this.getUserDetails(this.paginationObject);
  }
  public getUserDetails(data: PaginationModel) {
    this.service.getAllUserDetails(data).subscribe(response => {
      // console.log("Details===>", response);
      if (response !== null) {
        this.userList = response["data"];
        this.UserTotalElements = response["totalElements"];
      } else {
        this.userList = [];
        this.toastr.warningToastr("Something Went Wrong...!!");
      }
    });
  }
  public selectTableData(data) {
    this.selectedName = data["user_name"];
    this.selectedUser = data;
  }
  public gotoPage() {
    this.router.navigate(["./create"], { relativeTo: this.userActivatedRoute });
  }
  public goToEditPage() {
    if (typeof this.selectedUser !== "undefined") {
      this.service.setdata(this.selectedUser);
      this.router.navigate(["./edit"], { relativeTo: this.userActivatedRoute });
    } else {
      this.toastr.warningToastr("Please Select Any User");
    }
  }
}
