import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class GoogleAuthStub {
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

  login() {}

  logout() {}

  deleteUser() {}
}
