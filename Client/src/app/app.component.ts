import { Component } from '@angular/core';
import { fadeAnimation } from './animation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[fadeAnimation]
})
export class AppComponent {
  title = 'app';
  
  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
  constructor(){}

  ngOnInit(){
  
  }

  p:number = 1;
}
