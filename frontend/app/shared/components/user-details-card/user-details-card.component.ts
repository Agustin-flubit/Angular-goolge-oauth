import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { User } from '../../../core/user/user';

@Component({
  selector: 'app-user-details-card',
  templateUrl: './user-details-card.component.html',
  styleUrls: ['./user-details-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsCardComponent implements OnInit {

  @Input() user: User;
  @Output() edit = new EventEmitter<User>();
  @Output() remove = new EventEmitter<User>();

  constructor() { }

  ngOnInit() {
  }

}
