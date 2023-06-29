import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserMemoryService {
  isAuthenticated = false;

  public firebaseUser: {
    name: string;
    password: string;
  } = {
    name: 'lifebsfg@gmail.com',
    password: '1234512345',
  };

  constructor(private router: Router, private angularFireAuth: Auth) {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    this.isAuthenticated = isAuthenticated === 'true';
  }

  login() {
    if (this.isAuthenticated) {
      const firebaseUsername = this.firebaseUser.name;
      const firebasePassword = this.firebaseUser.password;

      signInWithEmailAndPassword(this.angularFireAuth, firebaseUsername, firebasePassword)
        .then(() => {
          console.log('Вы авторизированы в FireBase');
        })
        .catch((error) => {
          console.log('FireBase не авторизирован');
          console.log(error);
        });
    }
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    signOut(this.angularFireAuth);
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
