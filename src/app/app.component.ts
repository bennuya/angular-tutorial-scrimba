import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
    <!-- childcomponent being rendered by the parent component -->
    <!-- <app-customers></app-customers> -->

    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  
  constructor() { }

  ngOnInit() { }

}
