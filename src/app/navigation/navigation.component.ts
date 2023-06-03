import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserMemoryService } from '../AdminServices/user-memory.service';

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

  constructor(private router: Router, public authService: UserMemoryService) {}

  toggleAutoBox() {
    this.showAutoBox = !this.showAutoBox;
  }

  hideAutoBox() {
    this.showAutoBox = false;
  }

  submit(f: NgForm) {
    this.user.name = f.value.name;
    this.user.password = f.value.password;
    if (this.user.name === 'admin' && this.user.password === 'admin') {
      this.authService.login();
      if (this.authService.checkAuthentication()) {
        this.router.navigateByUrl('/admin');
        this.hideAutoBox();
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
