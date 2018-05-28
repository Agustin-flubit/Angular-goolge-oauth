import { Component } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent {

  constructor( private authService: AuthService ) {}

  login() {
    this.authService.login();
  }
}
