import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Block } from '../block.model';
import { PaginationModel, PaginationModel2 } from '@app/model/pagination-model';
import { Subject } from 'rxjs';
import { PAGINATION_LENGTH } from '@app/data/common.data';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { BlockService } from '../block.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '@app/services/common/common.service';
import { AuthService } from '@app/services/authentication/auth.service';
import { StorageService } from '@app/services/storage/storage.service';

@Component({
  selector: 'app-block-view',
  templateUrl: './block-view.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
  providers: []
})
export class BlockViewComponent implements OnInit {

  public block: Block[];
    private selectedBlock;
    // used for pagination object
    private blockPaginationObj: PaginationModel;
    // pagination data controls
    public blockPageNo = 0;
    public blockPageSize = 10;
    public blockTotalElements = 0;
    public searchBlock: string;
    searchBlock$ = new Subject<string>();
    // public block;
    public isLookUpBackAllowed = false;
    public pageSize = PAGINATION_LENGTH;
    public selectedPageSize = 10;
    public blockData = [
        // {districtName: 'Khordha' , blockName: 'Balipatna'},
        // {districtName: 'Khordha' , blockName: 'Balianta'},
        // {districtName: 'Khordha' , blockName: 'Balugaon'},
        // {districtName: 'Khordha' , blockName: 'Banapur'},
        // {districtName: 'Khordha' , blockName: 'Bolagarh'},
    ];
    public selectedName;
    public selectedDistrict;
    constructor(
        private router: Router, // router instance
        private blockActiveRoute: ActivatedRoute, // active route instane
        private toastr: ToastrClientService, // toastr instance
        private blockService: BlockService, // block service instance
        private spinner: NgxSpinnerService, // spinner instance
        // private error: ErrorResponseService, // error response Instance
        private commonService: CommonService,
        private authService: AuthService,
        private appStorage: StorageService

    ) { }

    ngOnInit() {
        this.setPageDetails(0, 1);
        // this.findBlock(this.blockPaginationObj);
    }
    ngAfterContentInit(): void {
        // this.isBackButtonRequired();
    }
    public setPageDetails(currentPage, pageNoToGo: any) {
        console.log(currentPage, pageNoToGo);
        this.blockPageNo = pageNoToGo;
        this.blockPaginationObj = {
            isActiveDataRequired: false,
            isPaginationRequired: true,
            isOrderRequired: false,
            isAscending: false,
            pageNumber: this.blockPageNo - 1 ,
            pageSize: this.blockPageSize,
            orderField: 'id'
        };
        // this.getBlockDetails(this.blockPaginationObj);
            this.getBlockDetails(this.blockPaginationObj);
    }
    private getBlockDetails(data: PaginationModel) {
        console.log(data);
        this.spinner.show();
        this.blockService.getAllBlockDetails(data).subscribe(successResponse => {
            if (successResponse !== null) {
                this.spinner.hide();
                this.block = successResponse['data'];
                console.log(' this.block', this.block);
                this.blockTotalElements = successResponse['totalElements'];
            } else {
                this.block = [];
                this.spinner.hide();
            }
        }, errorResponse => {
            this.spinner.hide();
            this.toastr.dangerToastr(errorResponse);
        });

    }
    public openCreateBlockDetailsPage() {
        this.router.navigate(['../block/create'], { relativeTo: this.blockActiveRoute });
    }
    public selectTableData(data){
        console.group('select');
        this.selectedName = data['block_name'];
        this.selectedBlock = data;
        console.log(this.selectedBlock);
      }
      public goToEditPage(){
        console.log(this.selectedBlock);
        if(typeof this.selectedBlock !== 'undefined'){
          this.blockService.setdata(this.selectedBlock);
          this.router.navigate(['./edit'], { relativeTo: this.blockActiveRoute });
        }
      }

    public changePageSize() {
        this.blockPageSize = this.selectedPageSize;
        this.setPageDetails(0, 1);
    }
    public goBackToPage() {
        this.router.navigateByUrl('/pages/lookup');
        // this.authService.goBack();
    }
}
