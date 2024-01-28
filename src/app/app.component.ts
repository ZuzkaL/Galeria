import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'sk']);
    translate.use('sk');
  }

  chooseLanguage(lang:string){
    this.translate.use(lang)
  }
}
