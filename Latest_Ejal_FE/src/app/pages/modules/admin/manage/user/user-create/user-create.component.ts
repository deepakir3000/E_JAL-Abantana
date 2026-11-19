import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrClientService } from "@app/services/toastr/toastr.service";
import { NewUserService } from './../new-user.service'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from './../../../../../../services/admin/role.service'
import { PaginationModel } from '@app/model/pagination-model';
import * as CryptoJS from 'crypto-js';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: "app-user-create",
  templateUrl: "./user-create.component.html",
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class UserCreateComponent implements OnInit {
  public userForm: FormGroup;
  public pathType;
  public getStoredDetails;
  public roleDetails = [];
  private paginationObject: PaginationModel;
  public rolePageNo = 0;
  public RolePageSize = 10;
  public RoleTotalElements = 0;
  public selectedPageSize = 10;
  public noOfTimes = 2;
  public file = null;
  public fileName = '';
  constructor(
    private router: Router,
    private userActiveRoute: ActivatedRoute,
    private userFB: FormBuilder,
    private toastr: ToastrClientService,
    private spinner: NgxSpinnerService,
    private service: NewUserService,
  ) {
    this.createUserForm();
  }

  ngOnInit() {
    this.userActiveRoute.url.subscribe(params => {
      this.getPathType(params[2].path);
    });
    this.setRoleDetails(1);
  }
  public setRoleDetails(pageNoToGo: any) {
    this.rolePageNo = pageNoToGo;
    this.paginationObject = {
      isActiveDataRequired: true,
      isPaginationRequired: false,
      isOrderRequired: true,
      isAscending: true,
      pageNumber: this.rolePageNo,
      pageSize: this.RolePageSize,
      orderField: "id"
    };
    this.getRoleDetails(this.paginationObject);
  }
  public getRoleDetails(data: PaginationModel) {
    this.service.getAllRoleDetails(data).subscribe(response => {
      if (response !== null) {
        this.roleDetails = response['data'];
        console.log(this.roleDetails);
      }
    })
  }
  public createUserForm() {
    this.userForm = this.userFB.group({
      id: '',
      userName: ['', Validators.compose([Validators.required,Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
      password: ['', Validators.compose([Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(.{6,})'),Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
      confirmPassword: ['', Validators.compose([Validators.required,Validators.pattern(/^(?!.*<[^>]+>).*$/)])],
      email: ['', Validators.compose([Validators.required,Validators.pattern(/^(?!.*<[^>]+>).*$/),Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)])],
      phone: ['', Validators.compose([Validators.required,Validators.pattern(/^(?!.*<[^>]+>).*$/),Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')])],
      roleId: ['', Validators.required],
      status: ['', Validators.required],
      displayName: ['', Validators.required],
      file: ''
    });
  }
  private encodePassword(data: string, noOfTimes: number) {
    let password = data;
    while (noOfTimes > 0) {
      // console.log('BEFORE ENCODING: ' + password);
      password = this.sha512Hash(password);
      // console.log('AFTER ENCODING: ' + password);
      noOfTimes--;
    }
    return password;
  }
  private sha512Hash(data) {
    try {
      return CryptoJS.SHA512(data).toString();
    } catch (error) {
      console.log(error);
    }
  }
  private cipherText(data) {
    let key = CryptoJS.enc.Utf8.parse('6A80FD8D38D579D1090F6CDB62CA34CA');
    let iv = CryptoJS.enc.Utf8.parse('79b67e539e7fcadf');
    let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data.toString()), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
    });
    return encrypted.toString();
  }
  public submitUserData(data) {
    this.spinner.show();
    if (data.password === data.confirmPassword) {
      const PASSWORD = this.encodePassword(data.password, this.noOfTimes);
      const CONF_PASSWORD = this.encodePassword(data.confirmPassword, this.noOfTimes);
      const USER_NAME = this.cipherText(data.userName);
      console.log(USER_NAME);
      const DATA = {
        id: data.id,
        userName: USER_NAME,
        password: PASSWORD,
        confirmPassword: CONF_PASSWORD,
        email: data.email,
        phone: data.phone,
        roleId: data.roleId,
        status: data.status,
        displayName: data.displayName,
        // file: data.file
      };
      if (this.pathType === "create") {
        console.log(DATA);
        this.service.createUserDetails(DATA).subscribe(successResponse => {
          if (successResponse !== null) {
            this.spinner.hide();
            this.toastr.successToastr(successResponse["message"]);
            this.router.navigate(["../"], { relativeTo: this.userActiveRoute });
          } else {
            this.spinner.hide();
            this.toastr.dangerToastr("Something went wrong..!!");
          }
        }, errorResponse => {
          this.spinner.hide();
          this.toastr.dangerToastr('Something went wrong..!!')
        });
      } else if (this.pathType === 'edit') {
        this.userForm.controls.userName.enable();
        const BENC_DATA = {
          id: data.id,
          userName: data.userName,
          email: data.email,
          phone: data.phone,
          roleId: data.roleId,
          status: data.status,
          displayName: data.displayName,
        }
        const ENC_DATA = this.cipherText(JSON.stringify(BENC_DATA));
        console.log(ENC_DATA);
        const FORM_DATA = new FormData();
        FORM_DATA.append('body', ENC_DATA);
        // FORM_DATA.append('file', this.file, this.fileName);
        // console.log(FORM_DATA.get('file'), this.fileName);
        this.service.editUserDetails(FORM_DATA).subscribe(successResponse => {
          if (successResponse !== null) {
            this.spinner.hide();
            this.toastr.successToastr(successResponse["message"]);
            this.router.navigate(["../"], { relativeTo: this.userActiveRoute });
          } else {
            this.spinner.hide();
            this.toastr.dangerToastr("Something went wrong..!!");
          }
        }, errorResponse => {
          this.spinner.hide();
          this.toastr.dangerToastr('Something went wrong..!!')
        });
      }
    } else {
      this.spinner.hide();
      this.toastr.warningToastr('Password does not match');
    }
  }
  public getPathType(params) {
    this.pathType = params;
    if (this.pathType === 'edit') {
      this.setPageData();
    }
    // console.log('PATHTYPE====>',this.pathType);
  }
  public setPageData() {
    this.getStoredDetails = this.service.getdata();
    console.log(this.getStoredDetails);
    this.userForm.controls.userName.patchValue(this.getStoredDetails.user_name);
    this.userForm.controls.displayName.patchValue(this.getStoredDetails.display_name);
    this.userForm.controls.email.patchValue(this.getStoredDetails.email)
    this.userForm.controls.phone.patchValue(this.getStoredDetails.mobile)
    this.userForm.controls.status.patchValue(this.getStoredDetails.status);
    this.userForm.controls.id.patchValue(this.getStoredDetails.id);
    this.userForm.controls.roleId.patchValue(this.getStoredDetails.role_id);
    this.userForm.disable();
  }
  public enableEdit() {
    this.userForm.enable();
  }
  public roleFormReset() {
    if (this.pathType === 'edit') {
      this.setPageData();
    } else {
      this.userForm.controls.id.reset();
      this.userForm.controls.userName.patchValue(this.getStoredDetails.user_name);
      this.userForm.controls.displayName.patchValue(this.getStoredDetails.display_name);
      this.userForm.controls.email.patchValue(this.getStoredDetails.email)
      this.userForm.controls.phone.patchValue(this.getStoredDetails.mobile)
      this.userForm.controls.id.patchValue(this.getStoredDetails.id);
      this.userForm.controls.roleId.patchValue(this.getStoredDetails.role_id);
    }
  }
  fileChange(event) {
    console.log(event);
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      console.log(file.type);
      console.log(file);
      if (file.size <= 4000000 && file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
        this.file = file;
        this.fileName = file.name;
      } else {
        this.toastr.warningToastr('File size must be less than 4MB and JPG, PNG, JPEG');
        this.file = null;
        this.fileName = '';
      }
    }
  }
  backButton() {
    this.router.navigate(["../"], { relativeTo: this.userActiveRoute });
  }
}
