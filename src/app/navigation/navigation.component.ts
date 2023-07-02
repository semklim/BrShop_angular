import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserMemoryService } from '../AdminServices/user-memory.service';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { CartItemsService } from '../services/cart-items.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  amountProductsInCart?: Observable<number>;

  showAutoBox = false;

  user: {
    name: string;
    password: string | number;
  } = {
    name: '',
    password: '',
  };

  constructor(
    private router: Router,
    public authService: UserMemoryService,
    private angularFireAuth: Auth,
    public cartService: CartItemsService,
  ) {}

  ngOnInit(): void {
    this.amountProductsInCart = this.cartService.getAmountProductsInCart();
  }

  toggleAutoBox() {
    this.showAutoBox = !this.showAutoBox;
  }

  hideAutoBox() {
    this.showAutoBox = false;
  }

  submit(f: NgForm) {
    this.user.name = f.value.name;
    this.user.password = f.value.password;
    const firebaseUserName = this.authService.firebaseUser.name;
    const firebaseUserPassword = this.authService.firebaseUser.password;
    if (this.user.name === 'admin' && this.user.password === 'admin') {
      this.authService.login();
      signInWithEmailAndPassword(this.angularFireAuth, firebaseUserName, firebaseUserPassword)
        .then(() => {
          console.log('Авторизация в FireBase успешна');
        })
        .catch((error) => {
          console.log(error);
        });
      if (this.authService.checkAuthentication()) {
        this.router.navigateByUrl('/admin');
        this.hideAutoBox();
        f.reset();
      }
    } else {
      console.log('false');
    }
  }
}
