import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class RouterStub {
    events = new BehaviorSubject({});
    url = 'test_url';

    navigate() { }

    createUrlTree() {}

    serializeUrl(url: any) {}

    navigateByUrl() { }
}
