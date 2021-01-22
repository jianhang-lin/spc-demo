import { Component } from '@angular/core';
import { assetUrl } from '../single-spa/asset-url';

@Component({
  selector: 'app1-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app1';
  yoshiUrl = assetUrl("yoshi.png");
}
