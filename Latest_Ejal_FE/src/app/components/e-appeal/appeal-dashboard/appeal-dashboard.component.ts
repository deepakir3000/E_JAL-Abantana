import {
    Component,
    OnInit,
    AfterViewInit,
    OnDestroy,
    ElementRef,
    ViewChild
} from '@angular/core';
// import * as Chart from 'chart.js';
import { Chart } from 'chart.js';
import { EAppealService } from './e-appeal.service';
import { LoginService } from '@app/services/admin/login.service';
import { AppealLoginService } from '@app/services/appeal/appeal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { Router } from '@angular/router';

export interface ApplicationRow {
    slNo: number;
    appNo: number;
    applicant: string;
    service: string;
    allocationTypeId: number;
    districtId: number | null;
    district: string;
    appliedOn: string;
    daysPending: number;
    purpose: string;
}

export interface ApplicationCounts {
    totalReceived: number;
    pending: number;
    success: number;
    reject: number;
}

export interface DistrictOption {
    id: number;
    district_name: string;
}

@Component({
    selector: 'app-appeal-dashboard',
    templateUrl: './appeal-dashboard.component.html',
    styleUrls: ['./appeal-dashborad.component.scss']
})
export class AppealDashboardComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('barChartRef', { static: false }) barChartRef: ElementRef | undefined;
    @ViewChild('pieChartRef', { static: false }) pieChartRef: ElementRef | undefined;

    barChart: any;
    pieChart: any;

    // ---- Filter dropdown data ----
    // Values match allocation_type.id directly: 1 = CONSTRUCTIONAL (S1),
    // 2 = OPERATIONAL (S2), 3 = BOTH (S3)
    services = [
        { label: 'All Services', value: '' },
        { label: 'Permission to draw water for Industrial/ Commercial and other Establishments for construction purposes', value: '1' },
        { label: 'Permission to draw water for Industrial/ Commercial and other Establishments for Operational purposes', value: '2' },
        { label: 'Permission to draw water for Industrial/ Commercial and other Establishments for construction and Operational purposes', value: '3' }
    ];

    districts: DistrictOption[] = [];

    selectedService = '';
    selectedDistrict = '';
    fromDate: string | undefined;
    toDate: string | undefined;

    applicationPageNo = 1;
    // applicationPageSize = 10;
    totalApplicationCount = 0;

    applications: ApplicationRow[] = [];

    // ---- Modal selected row ----
    // selectedRow: ApplicationRow | undefined;

    totalCounts: ApplicationCounts = {
        totalReceived: 0,
        pending: 0,
        success: 0,
        reject: 0
    };
    roleid : string | undefined;
    rolename: string | undefined;
    public searchTerm: string = '';
    public applicationPageSize: number = 10;
    public selectedRow: ApplicationRow | null = null;
    public sortColumn: string = '';
public sortDirection: 'asc' | 'desc' = 'asc';
     public movementHistory: any[] = [];
public movementHistoryLoading: boolean = false;
public movementHistoryError: string = '';
    

    constructor(private service: EAppealService, private login: LoginService,private appealLogin : AppealLoginService
        ,private spinner :NgxSpinnerService,
        private toastr : ToastrClientService,
        private router : Router,
        private appealService : AppealLoginService
    ) { }

    ngOnInit(): void {
        this.rolename = (localStorage.getItem('role_name') || '').trim();
        this.roleid = (localStorage.getItem('role_id') || '').trim();
        this.getDistrictList();
        this.loadApplications();
    }

    ngAfterViewInit(): void {
        // chart init happens after data loads (see loadApplications) —
        // canvases already exist in the DOM by the time the API responds
    }

    ngOnDestroy(): void {
        if (this.barChart) {
            this.barChart.destroy();
        }
        if (this.pieChart) {
            this.pieChart.destroy();
        }
    }

 public getDistrictList(): void {
    this.spinner.show();

    this.login.getDistrictList().subscribe({
        next: (res: any) => {
            this.districts = res;
            console.log(this.districts);
        },
        error: (err) => {
            console.error(err);
            this.spinner.hide();
        },
        complete: () => {
            this.spinner.hide();
        }
    });
}


    private loadApplications(): void {
        this.spinner.show();
        this.service.getPendingApplicationsForAppealDashboard().subscribe(
            (res: any) => {
                if (res.status === 'SUCCESS') {
                    this.totalCounts = res.counts;
                    console.log(this.totalCounts, '--------======------');
                    this.applications = this.mapApplicationsToRows(res.data);

                    this.totalApplicationCount = this.applications.length;

                    // call the charts
                    this.initBarChart();
                    this.initPieChart();
                } else {
                    this.applications = [];
                    this.totalApplicationCount = 0;
                }
                  this.spinner.hide();
            },
            (err) => {
                console.error('Error loading appeal dashboard applications', err);
                this.applications = [];
                this.totalApplicationCount = 0;
                 this.spinner.hide();
            }
        );
    }

    private mapApplicationsToRows(data: any[]): ApplicationRow[] {
console.log('Node now:', new Date().toString());
console.log('Node now ISO:', new Date().toISOString());

        console.log(data,'-----=====----====')
        return data.map((item, index) => ({
            slNo: index + 1,
            appNo: item.id,
            applicant: item.name,
            service: item.application_type,
            allocationTypeId: item.allocation_type_id,
            districtId: item.district_id || null,
            district: item.district_name || '',
            // appliedOn: item.created_on,
            appliedOn: item.current_submit_date,
            dateAfter90Days: item.dateAfter90Days,
            dateAfter120Days: item.dateAfter120Days,
            daysPending: item.holidayExcludedDays,
            purpose: item.purpose_name || ''
        }));
    }



    // ---------------------------------------------------------------
    // Filtering — timeline cutoff + service + district + date range,
    // applied before pagination so totals/pages stay accurate
    // ---------------------------------------------------------------

// get filteredApplications(): ApplicationRow[] {
//     const userName = (localStorage.getItem('user_Name') || '').trim();
//     const search = (this.searchTerm || '').trim().toLowerCase();

//     return this.applications
//         .filter(row => {
//             const originalDays = (row as any)._originalDaysPending || row.daysPending;

//             let withinRoleRange = false;

//             if (userName === 'dowd' || userName === 'aawd') {
//                 withinRoleRange = originalDays > 90;
//             } else if (userName === 'rawd') {
//                 withinRoleRange = originalDays > 120;
//             }

//             if (!withinRoleRange) {
//                 return false;
//             }

//             if (this.selectedService && String(row.allocationTypeId) !== this.selectedService) {
//                 return false;
//             }
//             if (this.selectedDistrict && String(row.districtId) !== String(this.selectedDistrict)) {
//                 return false;
//             }
//             if (this.fromDate) {
//                 const appliedDate = new Date(row.appliedOn);
//                 const from = new Date(this.fromDate);
//                 if (appliedDate < from) {
//                     return false;
//                 }
//             }
//             if (this.toDate) {
//                 const appliedDate = new Date(row.appliedOn);
//                 const to = new Date(this.toDate);
//                 to.setHours(23, 59, 59, 999);
//                 if (appliedDate > to) {
//                     return false;
//                 }
//             }

//             if (search) {
//                 const haystack = [
//                     row.appNo,
//                     row.applicant,
//                     row.service,
//                     row.district
//                 ]
//                     .filter(v => v !== null && v !== undefined)
//                     .map(v => String(v).toLowerCase())
//                     .join(' ');

//                 if (!haystack.includes(search)) {
//                     return false;
//                 }
//             }

//             return true;
//         })
//         .map(row => {
//             if ((row as any)._originalDaysPending === undefined) {
//                 (row as any)._originalDaysPending = row.daysPending;
//             }
//             const originalDays = (row as any)._originalDaysPending;

//             let offset = originalDays;
//             if (userName === 'dowd' || userName === 'aawd') {
//                 offset = originalDays - 90;
//             } else if (userName === 'rawd') {
//                 offset = originalDays - 120;
//             }

//             row.daysPending = offset;
//             return row;
//         });
// }

get filteredApplications(): ApplicationRow[] {
    const userName = (localStorage.getItem('user_Name') || '').trim();
    const search = (this.searchTerm || '').trim().toLowerCase();

    const filtered = this.applications
        .filter(row => {
            const originalDays = (row as any)._originalDaysPending || row.daysPending;

            let withinRoleRange = false;
            if (userName === 'dowd' || userName === 'aawd') {
                withinRoleRange = originalDays > 90;
            } else if (userName === 'rawd') {
                withinRoleRange = originalDays > 120;
            }
            if (!withinRoleRange) { return false; }

            if (this.selectedService && String(row.allocationTypeId) !== this.selectedService) {
                return false;
            }
            if (this.selectedDistrict && String(row.districtId) !== String(this.selectedDistrict)) {
                return false;
            }
            if (this.fromDate) {
                const appliedDate = new Date(row.appliedOn);
                const from = new Date(this.fromDate);
                if (appliedDate < from) { return false; }
            }
            if (this.toDate) {
                const appliedDate = new Date(row.appliedOn);
                const to = new Date(this.toDate);
                to.setHours(23, 59, 59, 999);
                if (appliedDate > to) { return false; }
            }
            if (search) {
                const haystack = [row.appNo, row.applicant, row.service, row.district]
                    .filter(v => v !== null && v !== undefined)
                    .map(v => String(v).toLowerCase())
                    .join(' ');
                if (!haystack.includes(search)) { return false; }
            }
            return true;
        })
        .map(row => {
            if ((row as any)._originalDaysPending === undefined) {
                (row as any)._originalDaysPending = row.daysPending;
            }
            const originalDays = (row as any)._originalDaysPending;
            let offset = originalDays;
            if (userName === 'dowd' || userName === 'aawd') {
                offset = originalDays - 90;
            } else if (userName === 'rawd') {
                offset = originalDays - 120;
            }
            row.daysPending = offset;
            return row;
        });

    // ---- Sort step ----
    if (!this.sortColumn) {
        return filtered;
    }

   return filtered.sort((a, b) => {
    let valA = (a as any)[this.sortColumn];
    let valB = (b as any)[this.sortColumn];

    if (this.sortColumn === 'appliedOn') {
        valA = valA ? new Date(valA).getTime() : 0;
        valB = valB ? new Date(valB).getTime() : 0;
    } else if (this.sortColumn === 'escalationDate') {
        const roleId = localStorage.getItem('role_id') || '';
        const field = (roleId === '1' || roleId === '2') ? 'dateAfter90Days' : 'dateAfter120Days';
        valA = (a as any)[field] ? new Date((a as any)[field]).getTime() : 0;
        valB = (b as any)[field] ? new Date((b as any)[field]).getTime() : 0;
    } else if (this.sortColumn === 'daysPending' || this.sortColumn === 'appNo') {
        valA = Number(valA) || 0;
        valB = Number(valB) || 0;
    }

    if (typeof valA === 'string') { valA = valA.toLowerCase(); }
    if (typeof valB === 'string') { valB = valB.toLowerCase(); }

    if (valA < valB) { return this.sortDirection === 'asc' ? -1 : 1; }
    if (valA > valB) { return this.sortDirection === 'asc' ? 1 : -1; }
    return 0;
});
}

    onFilterChange(): void {
        this.applicationPageNo = 1;
    }

    public sortBy(column: string): void {
    if (this.sortColumn === column) {
        // same column clicked — toggle direction
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        // new column — default to asc
        this.sortColumn = column;
        this.sortDirection = 'asc';
    }
    this.applicationPageNo = 1; // reset to first page on sort change
}

public getSortIcon(column: string): string {
    if (this.sortColumn !== column) {
        return '&#8597;'; // ↕ unsorted
    }
    return this.sortDirection === 'asc' ? '&#8593;' : '&#8595;'; // ↑ or ↓
}
    // ---------------------------------------------------------------
    // Chart.js setup
    // ---------------------------------------------------------------
    private initBarChart(): void {
        if (!this.barChartRef) {
            return;
        }
        if (this.barChart) {
            this.barChart.destroy();
        }

        this.barChart = new Chart(this.barChartRef.nativeElement, {
            type: 'bar',
            data: {
                labels: ['Total Received', 'Pending', 'Success', 'Reject', 'Beyond Timeline'],
                datasets: [{
                    label: 'Applications',
                    data: [
                        this.totalCounts.totalReceived,
                        this.totalCounts.pending,
                        this.totalCounts.success,
                        this.totalCounts.reject,
                        this.filteredApplications.length
                    ],
                    backgroundColor: [
                        '#4791ff',
                        '#0166c5',
                        '#1fa566',
                        '#ff4053',
                        '#fc6c40'
                    ]
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Application Status Overview'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    private initPieChart(): void {
        if (!this.pieChartRef) {
            return;
        }
        if (this.pieChart) {
            this.pieChart.destroy();
        }

        this.pieChart = new Chart(this.pieChartRef.nativeElement, {
            type: 'pie',
            data: {
                labels: ['Beyond Timeline', 'Within Timeline'],
                datasets: [{
                    data: [
                        this.filteredApplications.length,
                        this.totalCounts.pending - this.filteredApplications.length
                    ],
                    backgroundColor: [
                        '#fc6c40',
                        '#1fa566'
                    ]
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Pending Application Status Distribution'
                }
            }
        });
    }


public openDetailsModal(row: ApplicationRow): void {
    this.selectedRow = row;
    this.movementHistory = [];
    this.movementHistoryError = '';
    this.movementHistoryLoading = true;

    this.appealService.getMovementHistory(row.appNo).subscribe(
        (res: any) => {
            this.movementHistoryLoading = false;
            if (res.status === 'SUCCESS') {
                this.movementHistory = res.data;
            } else {
                this.movementHistoryError = 'Failed to load movement history.';
            }
        },
        (err) => {
            this.movementHistoryLoading = false;
            this.movementHistoryError = 'Error loading movement history.';
            console.error(err);
        }
    );
}

    appealLogout() {
    this.spinner.show();
    this.appealLogin.getAppealLogoutDetails().subscribe(
      (response) => {
        this.spinner.hide();
        this.toastr.successToastr('Successfully Logged out');
        localStorage.clear();
        this.router.navigateByUrl('/login');
      },
      (errorResponse) => {
        this.spinner.hide();
        this.toastr.successToastr('Unable to logout');
        // NOTE: original code shows successToastr even on error — kept consistent,
        // though dangerToastr may be more correct here. Flag if you want this changed.
      }
    );
  }


}