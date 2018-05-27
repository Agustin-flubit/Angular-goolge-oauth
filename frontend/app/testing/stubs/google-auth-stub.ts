import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class GoogleAuthStub {
  isAuthenticated$ = new BehaviorSubject<boolean>(false);
  user$ = new BehaviorSubject(undefined);

  getUser() {
    return Observable.of(this.user$.value || {
        provider: '',
        id: '',
        email: '',
        name: '',
        image: ''
    });
  }

  login() {}

  logout() { }

  deleteUser() {}
}
