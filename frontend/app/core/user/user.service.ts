import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs/Observable';
import { User } from './user';

@Injectable()
export class UserService {

  constructor(private apiService: ApiService) { }

  load(userId?: number): Observable<User> {
    const url = userId ? `/${userId}` : '';
    return this.apiService.get(`/users${userId}`);
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
