import { Component } from '@angular/core';
import { slideInAnimation } from './route-animations'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'whTrener';

  onActivate(event) {
    setTimeout(() => {
      window.scroll(0, 0);
    }, 500)
  }
}
