import { Component, OnInit } from '@angular/core';
import { AppealLoginService } from '@app/services/appeal/appeal.service';

interface AppealUser {
  id: number;
  user_name: string;
  name: string;
  role_name: string;
  role_id: number;
  hrms_id: string;
  mobile: string;
  email: string;
  is_new_user: boolean;
  created_on: string;
  updated_on: string;
}

interface AuditEntry {
  id: number;
  action: string;
  performed_by: string;
  performed_on: string;
  details: string;


  old_values?: any;
  new_values?: any;
}

@Component({
  selector: 'app-appeal-admin-dashboard',
  templateUrl: './appeal-admin-dashboard.component.html',
  styleUrls: ['./appeal-admin-dashboard.component.scss']
})
export class AppealAdminDashboardComponent implements OnInit {

  // ----- Data -----
  users: AppealUser[] = [];
  auditHistory: AuditEntry[] = [];
  selectedUser: AppealUser = null;

  // ----- UI state -----
  loading = false;
  auditLoading = false;
  errorMsg = '';
  successMsg = '';

  searchTerm = '';
  roleFilter = 'all';

  sortColumn = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';

  roleOptions = [
    { role_id: 1, role_name: 'dowd', label: 'Nodal Officer' },
    { role_id: 2, role_name: 'aawd', label: 'Appellate Authority' },
    { role_id: 3, role_name: 'rawd', label: 'Revisional Authority' }
  ];

  constructor(private appealAdminService: AppealLoginService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // ---------------------------------------------------------------
  // Data loading
  // ---------------------------------------------------------------
  loadUsers(): void {
    this.loading = true;
    this.errorMsg = '';
    this.appealAdminService.getAllAppealUsers().subscribe(
      (res: any) => {
        this.users = res.data || [];
        this.loading = false;
      },
      (err) => {
        this.errorMsg = 'Failed to load users. Please try again.';
        this.loading = false;
      }
    );
  }

  // loadAuditHistory(user: AppealUser): void {
  //   this.selectedUser = user;
  //   this.auditHistory = [];
  //   this.auditLoading = true;
  //   this.appealAdminService.getUserAuditHistory(user.id).subscribe(
  //     (res: any) => {
  //       this.auditHistory = res.data || [];
  //       this.auditLoading = false;
  //     },
  //     (err) => {
  //       this.auditLoading = false;
  //     }
  //   );
  // }

  // ---------------------------------------------------------------
  // New-user flag toggle
  // ---------------------------------------------------------------
 
 
  loadAuditHistory(user: AppealUser): void {

  this.selectedUser = user;
  this.auditHistory = [];
  this.auditLoading = true;

  this.appealAdminService.getUserAuditHistory(user.id)
    .subscribe(
      (res: any) => {

        this.auditHistory = (res.data || []).map(item => ({

          ...item,

          old_values: item.old_values
            ? JSON.parse(item.old_values)
            : null,

          new_values: item.new_values
            ? JSON.parse(item.new_values)
            : null

        }));

        this.auditLoading = false;

      },
      () => {
        this.auditLoading = false;
      }
    );
}
 
  markAsNewUser(user: AppealUser): void {
    this.appealAdminService.setNewUserFlag(user.id, true).subscribe(
      () => {
        user.is_new_user = true;
        this.successMsg = `${user.name} has been marked as a new user and will be prompted to update their profile on next login.`;
        setTimeout(() => (this.successMsg = ''), 3500);
      },
      (err) => {
        this.errorMsg = 'Could not update the flag. Please try again.';
        setTimeout(() => (this.errorMsg = ''), 3500);
      }
    );
  }

  clearNewUserFlag(user: AppealUser): void {
    this.appealAdminService.setNewUserFlag(user.id, false).subscribe(
      () => {
        user.is_new_user = false;
        this.successMsg = `${user.name} is no longer marked as a new user.`;
        setTimeout(() => (this.successMsg = ''), 3500);
      },
      (err) => {
        this.errorMsg = 'Could not update the flag. Please try again.';
        setTimeout(() => (this.errorMsg = ''), 3500);
      }
    );
  }

  // ---------------------------------------------------------------
  // Sorting
  // ---------------------------------------------------------------
  sortBy(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  // ---------------------------------------------------------------
  // Filtering + sorting (getter used by the template)
  // ---------------------------------------------------------------
  get filteredUsers(): AppealUser[] {
    let result = [...this.users];

    if (this.roleFilter !== 'all') {
      result = result.filter(u => u.role_name === this.roleFilter);
    }

    if (this.searchTerm && this.searchTerm.trim().length > 0) {
      const term = this.searchTerm.trim().toLowerCase();
      result = result.filter(u =>
        (u.name || '').toLowerCase().includes(term) ||
        (u.user_name || '').toLowerCase().includes(term) ||
        (u.email || '').toLowerCase().includes(term) ||
        (u.hrms_id || '').toLowerCase().includes(term)
      );
    }

    result.sort((a, b) => {
      const valA = (a[this.sortColumn] || '').toString().toLowerCase();
      const valB = (b[this.sortColumn] || '').toString().toLowerCase();
      if (valA < valB) { return this.sortDirection === 'asc' ? -1 : 1; }
      if (valA > valB) { return this.sortDirection === 'asc' ? 1 : -1; }
      return 0;
    });

    return result;
  }

  get newUserCount(): number {
    return this.users.filter(u => u.is_new_user).length;
  }

  roleBadgeClass(roleName: string): string {
    switch (roleName) {
      case 'dowd': return 'badge-role-nodal';
      case 'aawd': return 'badge-role-appellate';
      case 'rawd': return 'badge-role-revisional';
      default: return 'badge-role-default';
    }
  }

  getInitials(name: string): string {
    if (!name) { return '?'; }
    const parts = name.trim().split(' ');
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0].substring(0, 2).toUpperCase();
  }



  getFieldChanges(entry: AuditEntry): any[] {

  if (!entry.old_values || !entry.new_values) {
    return [];
  }

  const changes = [];

  Object.keys(entry.new_values).forEach(key => {

    const oldVal = entry.old_values[key];
    const newVal = entry.new_values[key];

    if (oldVal !== newVal) {

      changes.push({
        field: key,
        oldValue: oldVal,
        newValue: newVal
      });

    }

  });

  return changes;
}
}