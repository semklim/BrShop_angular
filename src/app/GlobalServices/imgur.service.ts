import { Injectable } from '@angular/core';
import { Firestore, collection, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ImgurService {
  clientId = 'a65a56b9dc179e4';

  constructor(private firestore: Firestore) {}

  async uploadImg(file: File) {
    const url = 'https://api.imgur.com/3/upload';
    const id = doc(collection(this.firestore, 'id')).id;
    const header = new Headers();
    header.append('Authorization', `Client-ID ${this.clientId}`);
    const formData = new FormData();

    formData.append('image', file);

    const requestOptions = {
      method: 'POST',
      headers: header,
      body: formData,
      referrer: '',
    };

    const result = await fetch(url, requestOptions).then((res) => res.json());

    console.log(result);
  }
}
