import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [],
})
export class AppComponent {
    title = 'Water Resource';
    public auth = false;
    /* @HostListener('window:beforeunload', [ '$event' ])
    beforeUnloadHandler(event) {
      localStorage.clear();
    } */
    constructor( ) {
      if ( window.location !== window.parent.location ) {
        this.auth = false;
      }  else {
        this.auth = true;
      }
    }
}
