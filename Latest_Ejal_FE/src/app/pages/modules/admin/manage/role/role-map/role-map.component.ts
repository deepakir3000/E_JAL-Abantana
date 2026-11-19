import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from "../../../../../../services/admin/role.service";
import { ResourceService}from '../../../../../../services/admin/resource.service'
import { PaginationModel } from "../role.model";
import { ToastrClientService } from "@app/services/toastr/toastr.service";

@Component({
  selector: 'app-role-map',
  templateUrl: './role-map.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class RoleMapComponent implements OnInit {
  public resourceList = [
    // {name: 'My View', type: 'UI', path: '/pages/admin/myview', order: 1},
    // {name: 'Proposal', type: 'UI', path: '/pages/admin/proposal', order: 2},
    // {name: 'Setup', type: 'UI', path: '/pages/admin/setup', order: 3},
    // {name: 'Manage', type: 'UI', path: '/pages/admin/manage', order: 4},
    // {name: 'Feedback', type: 'UI', path: '/pages/admin/feedback', order: 5}
]
public roleDetails = [];
private paginationObject: PaginationModel;
public roleMappingPageNo = 0;
public roleMappingPageSize = 10;
public roleTotalElements = 0;
public selectedPageSize = 10;
public resourceToStore = [];
public dataToStore = {roleId: '', resource:[]};
public roleId = '0';
  constructor(
    private router: Router,
    private roleMapActiveRoute: ActivatedRoute,
    private newUserService: UserService,
    private resourceService: ResourceService,
    private toastr: ToastrClientService
  ) { }

  ngOnInit() {
    this.setPageDetails(0 ,1);
    this.getRoleDetails();
  }
  public setPageDetails(currentPage ,pageNoToGo: any) {
    console.log(currentPage, pageNoToGo);
    this.roleMappingPageNo = pageNoToGo;
    this.paginationObject = {
        isActiveDataRequired: true,
        isPaginationRequired: true,
        isOrderRequired: true,
        isAscending: true,
        pageNumber: this.roleMappingPageNo,
        pageSize: this.roleMappingPageSize,
        orderField: 'id',
        roleId: this.roleId
    };
    this.getResourceDetails(this.paginationObject);
}
  public getRoleDetails(){
    this.roleDetails = this.newUserService.getRole();
    // console.log(this.roleDetails);
  }
  public getRoleId(event){
    this.roleId = event.target.value;
    this.dataToStore.roleId = this.roleId;
    this.setPageDetails(1, this.roleId);
    console.log(this.dataToStore);
  }
  public getResourceDetails(data: PaginationModel) {
    if( typeof this.roleId === 'undefined'){
      this.resourceService.getAllResourceDetails(data).subscribe(response=>{
        if (response !== null) {
          this.resourceList = response["data"];
          this.roleTotalElements = response["totalElements"];
        } else {
          this.resourceList = [];
          this.toastr.warningToastr("Something Went Wrong...!!");
        }
      })
    }
    this.newUserService.getAllMappedDetails(data).subscribe(response => {
      if (response !== null) {
        this.resourceList = response["data"];
        this.roleTotalElements = response["totalElements"];
      } else {
        this.resourceList = [];
        this.toastr.warningToastr("Something Went Wrong...!!");
      }
    });
  }
  public pushData(id, status, event){
    console.log(event, status);
    if(event.target.checked){
      const DATA = 
      {
        id: id, status: status
      }
      this.dataToStore['resource'].push(DATA);
    }else{
      const DATA = 
      {
        id: id, status: 0
      }
      this.dataToStore['resource'].push(DATA);
    }
    
    // console.log(this.dataToStore);
  }
  public mapRoleAndResource(){
    console.log(this.dataToStore);
    this.newUserService.createRoleResourceMap(this.dataToStore).subscribe(response=>{
      if(response !== null){
        console.log(response);
        this.toastr.successToastr(response['message']);
      }
    });
  }
  backButton() {
    this.router.navigate(["../"], { relativeTo: this.roleMapActiveRoute });
  }
}
