import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { HolidaysService } from '../../../../services/admin/holidays.service';
import { ToastrClientService } from '@app/services/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HolidaysComponent implements OnInit {

  submitted = false; 
  holidayForm: FormGroup = this.formBuilder.group({
    hol_date: ['', Validators.required],
    week_day: ['', Validators.required],
    name: ['', [Validators.required , Validators.pattern('^[a-zA-Z ]*$')]]
    });
  constructor(private formBuilder: FormBuilder, private spinner: NgxSpinnerService, private toastr: ToastrClientService,private service: HolidaysService) { }
  public holidayList = []
  public holidayNameList = []
  editflag = false;
  weekday:any;
  holidayname:any;

  
  ngOnInit() {  
    // this.holidayForm = this.formBuilder.group({
    // hol_date: ['', Validators.required],
    // week_day: ['', Validators.required],
    // name: ['', [Validators.required]]
    // });
    this.getData();
    this.getHolidayNameList();
}
@ViewChild(FormGroupDirective, {static : true}) HolidayForm : FormGroupDirective;
// this.holidayForm.resetForm();
// @ViewChild ('HolidayForm') HolidayForm : holidayForm
  // holidayForm = new FormGroup({
  //   hol_date: new FormControl(''),
  //   week_day: new FormControl(''),
  //   name: new FormControl(''),
  // });
  // get f() { return this.holidayForm.controls; }

 // when click on other option
  extra(){
    let data = this.holidayForm.value;
    let d = data.name
    if (d == 'Other'){
      // console.log('others');
      this.editflag = true;
    }
    
  }

  onSubmit() {
    this.submitted = true;
    let data = this.holidayForm.value;
    let d = {holiday_name:data.name}
    console.log(data);
    console.log('d',d);
        if(this.editflag == true){
          this.service.createHolidayName(d).subscribe(res =>{
            console.log(res);
            this.editflag = false;
            this.getHolidayNameList();
          })
        }
      this.service.createHolidays(data).subscribe(response =>{
          console.log('response',response);
            if (response.status == "SUCCESS") {
              let status = response;
              console.log('status',response['message']);
              // this.router.navigateByUrl('pages/citizen/status');
              this.toastr.successToastr(response['message']);
              // resetForm(value: any = undefined)
              this.HolidayForm.resetForm();
              this.getHolidayNameList();
              this.getData();  
            } else {
              this.holidayForm.reset();
              this.toastr.dangerToastr(response['message']);
            }
    })
       
  }

//get list of holidays from master holiday
   getData(){
    this.service.getHolidays().subscribe(res => {
      // console.log(res);
      if(res != null){
        this.holidayList = res['data'];
        this.holidayList.forEach((e: any) => {
          e.editflag = false;
        })
      } else {
        this.toastr.dangerToastr('Something Went Wrong');
      }
    }, err => {
      this.toastr.dangerToastr(err['message']);
    })
  }

  //get holiday names from holiday
  getHolidayNameList(){
    this.service.getHolidayNameList().subscribe(res => {
      // console.log(res);
      if(res != null){
        this.holidayNameList = res['data'];
      } else {
        this.toastr.dangerToastr('Something Went Wrong');
      }
    }, err => {
      this.toastr.dangerToastr(err['message']);
    })
  }

//edit function 
  editData(data:any,index: any){
    // console.log('check edit', data);
    this.holidayList[index].editflag = true;
    this.holidayname = data.name;
    this.weekday = data.week_day;
    // console.log(this.editflag)
  }

  //update 
  updateData(data:any,index:any){
    // console.log('update edit', data);
    // console.log(this.weekday,'check', this.holidayname);
    this.holidayList[index].editflag = false;
    let d = {id:data.id, name:data.name, week_day:data.week_day};
    console.log('d',d);
    this.service.updateHolidayList(d).subscribe(Response =>{
      console.log(Response);
      // this.toastr.successToastr(Response['message']);
      if (Response['status'] === "SUCCESS"){
        this.toastr.successToastr('Updated Successfully');
      }else{
        this.toastr.dangerToastr(Response['message']);
      }
      this.getData();
    });
  }

//delete row data
  deleteData(id:any){
    // console.log('delete data');
    let data = {id:id}
    if(confirm("Are you sure to delete ")) {
      this.service.deleteHolidayList(data).subscribe(res =>{
        // console.log(res);
        if(res.status ==='SUCCESS'){
          this.toastr.successToastr(res['message']);
        }else{
          this.toastr.dangerToastr(res['message']);
        }
        this.getData();
      });
    }
   
  }
}
