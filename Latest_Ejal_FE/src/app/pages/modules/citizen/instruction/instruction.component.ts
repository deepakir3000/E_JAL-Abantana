import { Component, OnInit, ViewEncapsulation,TemplateRef } from '@angular/core';
import { Router} from '@angular/router'
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styles: [],
  encapsulation: ViewEncapsulation.Emulated
})
export class InstructionComponent implements OnInit {
  modalRef: BsModalRef;
  
  constructor(
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }
 
  public goToPage(){
    // this.modalRef.hide();
    this.router.navigateByUrl('pages/citizen/proposal/p2');
  }
  // public openReferenceModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  // }

}
