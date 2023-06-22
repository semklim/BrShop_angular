import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FBaseService } from '../services/fireStore/fbase.service';
import { Product } from '../types/products';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css'],
})
export class AdminMainComponent {
  constructor(private fBaseService: FBaseService) {
    this.fBaseService.getAllProducts().subscribe((products: Product[]) => {
      console.log(products);
    });
  }

  selectedFiles: File[] = [];

  size8 = false;

  size9 = false;

  size10 = false;

  size11 = false;

  size12 = false;

  size13 = false;

  size14 = false;

  size15 = false;

  onFileInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const fileList = inputElement.files;
    if (fileList) {
      this.selectedFiles = Array.from(fileList);
      // Извлекаем названия файлов и сохраняем их в imagesUrls
      this.formData.imagesUrls = this.selectedFiles.map((file) => file.name);
    }
  }

  formData: Product = {
    id: '',
    docId: '',
    category: '',
    title: '',
    subtitle: '',
    currency: '',
    price: 0,
    sizes: [],
    /* -------------------------------------------------------------------------- */
    /*                              // imageMain: '',                             */
    /* -------------------------------------------------------------------------- */
    imagesUrls: [] as string[],
    color: {
      type: '',
      name: '',
      hex: '',
    },
    colors: [],
    rating: 0,
    reviews: [],
    description: '',
  };

  async onSubmit(form: NgForm) {
    if (form.valid) {
      const object: Product = {
        id: this.formData.id,
        docId: this.formData.docId,
        category: this.formData.category,
        title: this.formData.title,
        subtitle: this.formData.subtitle,
        currency: this.formData.currency,
        price: Number(this.formData.price),
        sizes: [
          this.size8 ? 8 : null,
          this.size9 ? 9 : null,
          this.size10 ? 10 : null,
          this.size11 ? 11 : null,
          this.size12 ? 12 : null,
          this.size13 ? 13 : null,
          this.size14 ? 14 : null,
          this.size15 ? 15 : null,
        ].filter((size) => size !== null),
        /* -------------------------------------------------------------------------- */
        /*                   // imageMain: this.formData.imageMain,                   */
        /* -------------------------------------------------------------------------- */
        imagesUrls: this.formData.imagesUrls,
        color: {
          type: this.formData.color.type,
          name: this.formData.color.name,
          hex: this.formData.color.hex,
        },
        colors: this.formData.colors,
        rating: this.formData.rating,
        reviews: this.formData.reviews,
        description: this.formData.description,
      };
      try {
        // Добавление данных и ожидание завершения операции
        await this.fBaseService.addData(object);
        console.log('Object added to Firestore');
      } catch (error) {
        console.log('Error adding object to Firestore:', error);
      }
      console.log(object);
    }
  }
}
