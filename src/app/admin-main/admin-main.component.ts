import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FBaseService } from '../services/fireStore/fbase.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../types/products';
import { CloudStoreService } from '../services/fireCloudStore/cloudStore.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css'],
})
export class AdminMainComponent implements OnInit {
  constructor(private fBaseService: FBaseService, private cloudService: CloudStoreService) {
    this.activeBlock = 'add';
  }

  /////////////проверка блока///////
  setActiveBlock(blockName: string) {
    if (blockName === 'add') {
      this.showForm = true;
    } else if (blockName === 'delete') {
      this.showForm = false;
    }
    this.activeBlock = blockName;
  }

  activeBlock = '';

  showForm = true;

  showSection = false;

  /////////////////////////////форма//////////////////////////

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
    currency: 'USD',
    price: 0,
    sizes: [],
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
        imagesUrls: [''],
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
        // object.imagesUrls = await this.changeFilesToLinks(this.selectedFiles);
        object.imagesUrls = await this.cloudService.uploadFile(this.selectedFiles, object.title);
        await this.fBaseService.addData(object);
        console.log('Object added to Firestore', object);
      } catch (error) {
        console.log('Error adding object to Firestore:', error);
      }
    }
  }

  //////////////////delete///////////////////

  private productsOrigin?: Observable<Product[]>;

  prod$?: Observable<Product[]>;

  searchValue = '';

  ngOnInit(): void {
    this.productsOrigin = this.prod$ = this.fBaseService.getAllProducts();
  }

  submitSearch(value: string) {
    this.searchValue = value;
    this.prod$ = this.filterProductsByTitles(value);
  }

  filterProductsByTitles(productName: string): Observable<Product[]> | undefined {
    const reg = new RegExp(`${productName}`, 'gi');

    return this.productsOrigin?.pipe(
      map((products: Product[]) => products.filter((product) => reg.test(product.title))),
    );
  }

  deleteProduct(product: Product) {
    this.fBaseService
      .deleteData(product)
      .then(() => {
        console.log('Product deleted successfully');
      })
      .catch((error) => {
        console.log('Error deleting product:', error);
      });
  }
}
