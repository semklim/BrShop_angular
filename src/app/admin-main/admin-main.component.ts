import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css'],
})
export class AdminMainComponent {
  imageUrls: string[] = [];

  imageInputs: string[] = [];

  size8 = false;

  size9 = false;

  size10 = false;

  size11 = false;

  size12 = false;

  size13 = false;

  size14 = false;

  size15 = false;

  addImageUrl() {
    this.imageUrls.push('');
  }

  onImageUrlChange(newValue: string, index: number) {
    this.imageUrls[index] = newValue;
  }

  formData = {
    category: '',
    title: '',
    subtitle: '',
    currency: '',
    price: 0,
    sizes: [],
    imageMain: '',
    imagesUrls: [] as string[],
    color: {
      type: '',
      name: '',
      hex: '',
    },
    colors: [] as { type: string; name: string; hex: string }[],
    rating: 0,
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.formData.imagesUrls = [...this.imageUrls, ...this.imageInputs];

      const object = {
        category: this.formData.category,
        title: this.formData.title,
        subtitle: this.formData.subtitle,
        currency: this.formData.currency,
        price: Number(this.formData.price),
        // sizes: this.formData.sizes.map((size: string) => parseInt(size)),
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
        imageMain: this.formData.imageMain,
        imagesUrls: this.formData.imagesUrls,
        color: {
          type: this.formData.color.type,
          name: this.formData.color.name,
          hex: this.formData.color.hex,
        },
        colors: this.formData.colors,
        rating: Number(this.formData.rating),
      };
      console.log(object); // Вывод объекта в консоль
    }
  }
}

// submitForm() {
//   const object = {
//     category: this.formData.category,
//     title: this.formData.title,
//     subtitle: this.formData.subtitle,
//     currency: this.formData.currency,
//     price: Number(this.formData.price),
//     sizes: this.formData.sizes.map((size) => parseInt(size)),
//     imageMain: this.formData.imageMain,
//     imagesUrls: this.formData.imagesUrls.split(',').map(url => url.trim()),
//     color: {
//       type: this.formData.color.type,
//       name: this.formData.color.name,
//       hex: this.formData.color.hex
//     },
//     colors: this.formData.colors.split(',').map((colorData) => {
//       const [type, name, hex] = colorData.split('|').map((value) => value.trim());
//       return { type, name, hex };
//     }),
//     rating: Number(this.formData.rating),
//     reviews: [
//       {
//         username: this.formData.username,
//         rating: parseFloat(this.formData.reviewRating),
//         comment: this.formData.reviewComment,
//       },
//     ],
//     description: this.formData.description,
//   };

//   // console.log(object);
// }
