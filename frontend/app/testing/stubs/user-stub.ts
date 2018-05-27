import { Observable } from 'rxjs/Observable';

export class UserStub {
    load() { return Observable.of([]); }
    loadOne(id: number) { }
    create(user: any) { }
    update(user: any) { }
    delete(id: number) { }
}
