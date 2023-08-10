import { Component } from '@angular/core';
import { CheckIpService } from './services/checkIp/check-ip.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public ipInfoService: CheckIpService) {
    this.ipInfoService.ipData.then((data) => console.log('It is your Ip ', data));
  }
}
