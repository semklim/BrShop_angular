import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImgurService {
  private clientId = 'a65a56b9dc179e4';

  async uploadImg(image: string | File) {
    const url = 'https://api.imgur.com/3/upload';
    const header = new Headers();
    const formData = new FormData();
    let img: Blob | File;

    if (image instanceof File) {
      img = image;
    } else {
      img = await fetch(image).then((data) => data.blob());
    }

    header.append('Authorization', `Client-ID ${this.clientId}`);
    formData.append('image', img);

    const requestOptions = {
      method: 'POST',
      headers: header,
      body: formData,
      referrer: '',
    };

    return fetch(url, requestOptions).then((res) => res.json());
  }
}
