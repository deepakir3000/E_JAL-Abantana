import { Component } from "@angular/core";
import { LoginService } from "@app/services/admin/login.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-redirect-data",
  templateUrl: "./redirect-data.component.html",
  styleUrls: ["./redirect-data.component.scss"],
})
export class RedirectDataComponent {
  data: any;
  startDate: any;
  endDate: any;
  investment: any;
  district: any;
    dateDuration: { startDate: any; endDate: any; investment: any; district: any; };
  tableData: any;
  searchText='';

  constructor(private login: LoginService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Using snapshot
    this.startDate = this.route.snapshot.queryParamMap.get("startDate");
    this.endDate = this.route.snapshot.queryParamMap.get("endDate");
    this.investment = this.route.snapshot.queryParamMap.get("investment");
    this.district = this.route.snapshot.queryParamMap.get("district");

    // Using params observable
    this.route.queryParams.subscribe((params) => {
      this.startDate = params["startDate"];
      this.endDate = params["endDate"];
      this.investment = params["investment"];
      this.district = params["district"];
    });

    console.log(this.startDate, this.endDate, this.investment, this.district);
    this.dateDuration = {startDate: this.startDate, endDate: this.endDate,investment: this.investment, district: this.district};
    console.log(this.dateDuration);
    
    this.login.getTableInfo(this.dateDuration).subscribe((res) => {
      console.log(res, 'response');
      this.tableData = res;
      console.log(this.tableData, 'tabledata');
      
    });
  }

  // applyFilter(filterValue: string) {
  //   this.tableData.filter = filterValue.trim().toLowerCase();
  //   console.log(this.tableData.filter);
    
  //   // if (this.dataSource.paginator) {
  //   //   this.dataSource.paginator.firstPage();
  //   // }
  // }
}
