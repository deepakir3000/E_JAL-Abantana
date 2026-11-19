import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { PaginationModel}from './../../../../../model/pagination-model'
import { ResourceService}from '../../../../../services/admin/resource.service'

@Component({
    selector: 'app-resource',
    templateUrl: './resource.component.html',
    styleUrls: [],
    providers: [],
    encapsulation: ViewEncapsulation.Emulated
})
export class ResourceComponent implements OnInit {
    public resourceList = [];
    private paginationObject: PaginationModel;
    public resourcePageNo = 0;
    public resourcePageSize = 10;
    public resourceTotalElements = 0;
    public selectedPageSize = 10;
    public selectedName;
    public selectedResource;
    constructor(
        // declared for creating instance
        private resourceService: ResourceService,
        public resourceRoutes: Router, // for routing
        public resourceActiveRoutes: ActivatedRoute, 
        private toastr: ToastrClientService
    ) { }

    ngOnInit() {
        this.setPageDetails(0,1);
    }
    public setPageDetails( currentPage,pageNoToGo: any) {
        this.resourcePageNo = pageNoToGo;
        this.paginationObject = {
            isActiveDataRequired: true,
            isPaginationRequired: true,
            isOrderRequired: true,
            isAscending: true,
            pageNumber: this.resourcePageNo,
            pageSize: this.resourcePageSize,
            orderField: 'id'
        };
        this.getResourceDetails(this.paginationObject);
    }
    public getResourceDetails(data: PaginationModel) {
        // console.log("DATA========>", data);
        this.resourceService.getAllResourceDetails(data).subscribe(response => {
        //   console.log("Details===>", response);
          if (response !== null) {
            this.resourceList = response["data"];
            this.resourceTotalElements = response["totalElements"];
          } else {
            this.resourceList = [];
            this.toastr.warningToastr("Something Went Wrong...!!");
          }
        });
      }
      public selectTableData(data){
        this.selectedName = data['resource_name'];
        this.selectedResource = data;
      }
    public goToPage(){
        this.resourceRoutes.navigate(['./create'], { relativeTo: this.resourceActiveRoutes });
    }
    public goToEditPage(){
      if(typeof this.selectedResource !== 'undefined'){
        this.resourceService.getStoredData(this.selectedResource);
        this.resourceRoutes.navigate(['./edit'], { relativeTo: this.resourceActiveRoutes });
      }
    }
}
