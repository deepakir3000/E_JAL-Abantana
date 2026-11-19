import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-my-view',
    templateUrl: './my-view.component.html',
    styleUrls: ['./my-view.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class MyViewComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
