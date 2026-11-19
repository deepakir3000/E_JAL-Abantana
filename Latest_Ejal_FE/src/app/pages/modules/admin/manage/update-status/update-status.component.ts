import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonFormService } from "@app/modules/common-form/common-form.service";
import { CommonService } from "@app/services/common/common.service";
import { ToastrClientService } from "@app/services/toastr/toastr.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-update-status",
  templateUrl: "./update-status.component.html",
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
})
export class UpdateStatusComponent implements OnInit {
  public applicationId;

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService,
    private service: CommonFormService,
    private toastr: ToastrClientService
  ) {}

  ngOnInit() {}

  public getAppID(event) {
    this.applicationId = event.target.value;
    // console.log(this.applicationId);
  }

  public updateStatus() {
     // Check if applicationId is empty
  if (!this.applicationId) {
    this.toastr.dangerToastr('Application ID is required');
    return false;
  }

  // Validate to allow only numbers
  const numberPattern = /^[0-9]+$/;
  if (!numberPattern.test(this.applicationId)) {
    this.toastr.dangerToastr('Application ID must contain numbers only');
    return false;
  }

    Swal.fire({
      title: "Are you sure payment has been received for this application?",
      text: "Application will move to Workflow",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Submit it!",
      cancelButtonText: "No, keep it",
    }).then((resultdata) => {
      if (resultdata.value) {
        // this.spinner.show();
        this.service.updateFormStatus(this.applicationId).subscribe(
          (successResponse) => {
            if (successResponse !== null) {
              this.toastr.successToastr(successResponse.message);
              this.router.navigate(['../'], { relativeTo: this.route });
              Swal.fire(
                "Submit!",
                "Your Data has been Submittted .",
                "success"
              );
            } else {
              this.toastr.warningToastr("Something went wrong");
            }
          },
          (errorResponse) => {
            Swal.fire("Cancelled", "Oops... Duplicate Data", "error");
          }
        );
      }
    });
  }
}
