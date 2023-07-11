import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserMemoryService } from '../AdminServices/user-memory.service';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { CartItemsService } from '../services/cart-items.service';
import { Observable, Subscription } from 'rxjs';
import { CurrencyStateService } from '../services/currency-State/currency-state.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  private subCurrency?: Subscription;

  amountProductsInCart?: Observable<number>;

  currentCurrency = 'USD';

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
    private currencyService: CurrencyStateService,
    public cartService: CartItemsService,
  ) {}

  ngOnInit(): void {
    this.amountProductsInCart = this.cartService.getAmountProductsInCart();
    this.subCurrency = this.currencyService.selectedCurrency$.subscribe((code) => (this.currentCurrency = code));
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

  changeCurrency() {
    this.currencyService.setNewCurrency(this.currentCurrency);
    localStorage.setItem('webShopPrevUsedCurrency', this.currentCurrency);
  }

  ngOnDestroy(): void {
    this.subCurrency?.unsubscribe();
  }
}
