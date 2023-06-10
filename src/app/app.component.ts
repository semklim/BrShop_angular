import { Component } from '@angular/core';
import { ImgurService } from './services/imgur.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private imgur: ImgurService) {}

  // 1
  async uploadImgByLocalUrl() {
    const res = await this.imgur.uploadImg('assets/air-jordan-xxxvii-prm-4.png');
    console.log(res);
  }

  // 2
  async uploadImgByUrl(input: HTMLInputElement) {
    const res = await this.imgur.uploadImg(input.value);
    console.log(res);
  }

  // 3
  async uploadImgByFile(input: HTMLInputElement) {
    if (input.files) {
      const res = await this.imgur.uploadImg(input.files[0]);
      console.log(res);
    }
  }
}
