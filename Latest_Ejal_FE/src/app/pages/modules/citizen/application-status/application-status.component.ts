import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ToastrClientService } from "@app/services/toastr/toastr.service";

@Component({
  selector: "app-application-status",
  templateUrl: "./application-status.component.html",
  styleUrls: ['./application-status.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ApplicationStatusComponent implements OnInit {
  public proposalDtls = [
    { ques: "Applicant Details", ans: "Yes", text: "text-success", icon: "fa-check"},
    { ques: "Industry Details", ans: "Yes", text: "text-success", icon: "fa-check" },
    { ques: "Capacity Details", ans: "Yes", text: "text-success", icon: "fa-check"},
    { ques: "Location Details", ans: "No", text: "text-danger", icon: "fa-times"},
    { ques: "Requisition water Details", ans: "Yes", text: "text-success", icon: "fa-check"},
    { ques: "Phase wise requirement Details", ans: "Yes", text: "text-success", icon: "fa-check"},
    { ques: "Water management plan Details", ans: "Yes", text: "text-success", icon: "fa-check"},
    { ques: "Enclosure Details", ans: "Yes", text: "text-success", icon: "fa-check"},
    { ques: "Payment completed", ans: "Yes", text: "text-success", icon: "fa-check"}
  ];
  proposalStatusDtls = [
    {status: "All Details Entered Correctly", text: "text-success", hasError: false},
    {status: "All Details Entered Correctly", text: "text-success", hasError: false},
    {status: "All Details Entered Correctly", text: "text-success", hasError: false},
    {status: "Industry location document missing.", text: "text-danger", hasError: true},
    {status: "All Details Entered Correctly", text: "text-success", hasError: false},
    {status: "All Details Entered Correctly", text: "text-success", hasError: false},
    {status: "All Details Entered Correctly", text: "text-success", hasError: false},
    {status: "All Details Entered Correctly", text: "text-success", hasError: false},
    {status: "All Details Entered Correctly", text: "text-success", hasError: false},
  ]
  public stepCounter = 2;
  public currentStep = 1;

  constructor(private toastr: ToastrClientService) {}

  ngOnInit() {}
  showSelectedStepDtls(selectedStep) {
    if (selectedStep > this.stepCounter) {
      this.toastr.warningToastr("Not Allowed");
    } else {
      this.currentStep = selectedStep;
    }
  }
}
