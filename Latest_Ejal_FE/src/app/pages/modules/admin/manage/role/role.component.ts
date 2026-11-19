import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../../../../services/admin/role.service";
import { PaginationModel } from "./../../../../../model/pagination-model";
import { ToastrClientService } from "@app/services/toastr/toastr.service";

@Component({
  selector: "app-role",
  templateUrl: "./role.component.html",
  styleUrls: [],
  providers: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class RoleComponent implements OnInit {
  public roleDetails = [];
  private paginationObject: PaginationModel;
  public rolePageNo = 0;
  public rolePageSize = 10;
  public roleTotalElements = 0;
  public selectedPageSize = 10;
  public selectedName;
  public selectedUser;
  // {id: 'RL001', roleName: 'Citizen', orgName: 'DoWR'},
  // {id: 'RL002', roleName: 'System Admin', orgName: 'DoWR'},
  // {id: 'RL003', roleName: 'Officer', orgName: 'DoWR'}

  public isActive = false;
  constructor(
    private roleRouter: Router,
    private roleActivatedRoute: ActivatedRoute,
    private newUserService: UserService,
    private toastr: ToastrClientService
  ) {}

  ngOnInit() {
    // this.getUserDetails();
    this.setPageDetails(1);
  }
  public setPageDetails(pageNoToGo: any) {
    this.rolePageNo = pageNoToGo;
    this.paginationObject = {
      isActiveDataRequired: true,
      isPaginationRequired: true,
      isOrderRequired: true,
      isAscending: true,
      pageNumber: this.rolePageNo,
      pageSize: this.rolePageSize,
      orderField: "id"
    };
    this.getRoleDetails(this.paginationObject);
  }
  public redirectPage(page: string) {
    switch (page) {
      case "tab1":
        this.roleRouter.navigate(["./role"], {
          relativeTo: this.roleActivatedRoute
        });
        break;
      case "tab2":
        this.roleRouter.navigate(["./map-rg-role"], {
          relativeTo: this.roleActivatedRoute
        });
        break;
    }
  }
  public getRoleDetails(data) {
    // console.log("DATA========>", data);
    this.newUserService.getAllUserDetails(data).subscribe(response => {
      // console.log("Details===>", response);
      if (response !== null) {
        this.roleDetails = response["data"];
        this.roleTotalElements = response["totalElements"];
      } else {
        this.roleDetails = [];
        this.toastr.warningToastr("Something Went Wrong");
      }
    });
  }
  public selectTableData(data) {
    console.log(data);
    this.selectedName = data["role_name"];
    this.selectedUser = data;
  }
  public goToEditPage() {
    if (typeof this.selectedUser !== "undefined") {
      this.newUserService.setdata(this.selectedUser);
      this.roleRouter.navigate(["./edit"], { relativeTo: this.roleActivatedRoute });
    } else {
      this.toastr.warningToastr("Please Select Any User");
    }
  }
  public goToPage() {
    this.roleRouter.navigate(["./create"], {
      relativeTo: this.roleActivatedRoute
    });
  }
  public goToMap() {
    this.newUserService.setRole(this.roleDetails);
    this.roleRouter.navigate(["./map"], {
      relativeTo: this.roleActivatedRoute
    });
  }
}
