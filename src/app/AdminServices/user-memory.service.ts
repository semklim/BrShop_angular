import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserMemoryService {
  private isAuthenticated = false;

  public firebaseUser: {
    name: string;
    password: string;
  } = {
    name: 'lifebsfg@gmail.com',
    password: '1234512345',
  };

  constructor(private router: Router, private angularFireAuth: AngularFireAuth) {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    this.isAuthenticated = isAuthenticated === 'true';
    if (this.isAuthenticated) {
      const firebaseUsername = this.firebaseUser.name;
      const firebasePassword = this.firebaseUser.password;

      this.angularFireAuth
        .signInWithEmailAndPassword(firebaseUsername, firebasePassword)
        .then(() => {
          console.log('Вы авторизированы в FireBase');
          // console.log(this.getFirebaseUser());
        })
        .catch((error) => {
          console.log('FireBase не авторизирован');
          console.log(error);
        });
    }
  }

  login() {
    this.isAuthenticated = true;
    localStorage.setItem('isAuthenticated', 'true');
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    this.angularFireAuth.signOut();
    this.router.navigateByUrl('/');
  }

  checkAuthentication(): boolean {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    this.isAuthenticated = isAuthenticated === 'true';
    return this.isAuthenticated;
  }

  getFirebaseUser(): { name: string; password: string } {
    return this.firebaseUser;
  }
}
