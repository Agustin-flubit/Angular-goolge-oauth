import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../api/api.service';

import { User } from './user';

@Injectable()
export class UserService {

  constructor(private apiService: ApiService) { }

  load(): Observable<User[]> {
    return this.apiService.get(`/users`);
  }

  loadOne(id: number): Observable<User> {
    return this.apiService.get(`/users/${id}`);
  }

  create(user: User): Observable<User> {
    return this.apiService.post(`/users`, user);
  }

  update(user: User): Observable<User> {
    return this.apiService.patch(`/users/${user.id}`, user);
  }

  delete(id: number): Observable<User> {
    return this.apiService.delete(`/users/${id}`);
  }
}
