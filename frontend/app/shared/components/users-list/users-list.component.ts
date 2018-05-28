import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../../core/user/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  @Input() users: User[];
  @Output() edit = new EventEmitter<User>();
  @Output() show = new EventEmitter<User>();
  @Output() remove = new EventEmitter<User>();
  @Output() new = new EventEmitter<any>();

  usersTrackByFn = (index: number, user: User) => user.own;

  constructor() { }

  ngOnInit() {}

  showDetails(user: User) {
    this.show.emit(user);
  }

  editUser(user: User) {
    this.edit.emit(user);
  }

  deleteUser(user: User) {
    this.remove.emit(user);
  }

  createNew(user: User) {
    this.new.emit();
  }
}
