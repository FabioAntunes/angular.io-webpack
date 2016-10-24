import { Component } from '@angular/core';
import '../../public/css/styles.css';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hello from Angular App with Webpack';

  someFuncNotCoveredByTests() {
    console.log("I'm not covered by tests");
  }
}
