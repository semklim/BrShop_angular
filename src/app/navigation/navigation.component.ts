import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserMemoryService } from '../AdminServices/user-memory.service';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  showAutoBox = false;

  user: {
    name: string;
    password: string | number;
  } = {
    name: '',
    password: '',
  };

  constructor(private router: Router, public authService: UserMemoryService, private angularFireAuth: Auth) {}

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
      // this.angularFireAuth
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
      // this.router.navigateByUrl('/admin');
      // this.hideAutoBox()
    } else {
      // console.log(f)
      // console.log(this.user.name)
      console.log('false');
    }
  }
}
