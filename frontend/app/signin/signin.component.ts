import { Component } from '@angular/core';
import { GoogleAuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SignInComponent {

  constructor( private googleAuthService: GoogleAuthService ) {}

  login() {
    this.googleAuthService.login();
  }
}
