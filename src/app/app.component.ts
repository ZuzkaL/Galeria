import { Component, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'galeria';

  // Updates the width of the container based on the window resize event.
  @HostListener('window:resize', ['$event'])
  calcWidthOfContainer() {
    const vw = window.innerWidth;
    const result = ((304+32) * Math.floor((vw / (304+32))));
    return result + "px"
  }

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'sk']);
    translate.use('sk');
  }

  // Changes the language for translation.
  chooseLanguage(lang: string) {
    this.translate.use(lang)
  }
}
