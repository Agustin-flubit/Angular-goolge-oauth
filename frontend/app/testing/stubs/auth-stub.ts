import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

const socialUserResponse = {
  provider: 'google',
  email: 'test@test.com',
  name: 'test',
  image: 'http://test.png',
  token: '',
  idToken: '90900900909090900909'
};

export class AuthStub {
  isAuthenticated$ = new BehaviorSubject<boolean>(false);
  private isAuthStatus = false;
  user$ = new BehaviorSubject(undefined);

  getCurrentUser() {
    return Observable.of(this.user$.value || {
        provider: '',
        id: '',
        email: '',
        name: '',
        image: ''
    });
  }

  init() {}

  login() {}

  logout() {}

  deleteUser() {}
}
