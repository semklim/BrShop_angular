import { Injectable } from '@angular/core';
import { ImgurRoot } from 'src/app/types/imgur/response';

@Injectable({
  providedIn: 'root',
})
export class ImgurService {
  private clientId = 'a65a56b9dc179e4';

  async uploadImg(image: string | File): Promise<ImgurRoot | undefined> {
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

    try {
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        const {
          data: { error },
          status,
        } = await response.json();

        throw new Error(`--> Status:${status}. ${error} <--`);
      }
      return await response.json();
    } catch (err) {
      console.error((err as Error).message);
      return undefined;
    }
  }
}
