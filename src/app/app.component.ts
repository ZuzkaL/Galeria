import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'galeria';

  @HostListener('window:resize', ['$event'])
  calcWidthOfContainer(){
    const vw = window.innerWidth;
    const result = (260 * Math.floor(( vw / 270)));
    return result+"px"
  }
}
