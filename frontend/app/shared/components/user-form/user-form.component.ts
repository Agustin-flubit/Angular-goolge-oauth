import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../core/user/user';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class UserFormComponent implements OnChanges {
  @Input() user: User = {
    id: undefined,
    first_name: '',
    last_name: '',
    iban: '',
    own: true
  };

  @Output() save = new EventEmitter<User>();

  form: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'id': [this.user.id],
      'first_name': [this.user.first_name, Validators.required],
      'last_name': [this.user.last_name, Validators.required],
      'iban': [this.user.iban, [Validators.required, Validators.pattern(/[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}/)]]
    });
  }

  ngOnChanges() {
    if (this.user) {
      this.form.patchValue({...this.user});
    }
  }

  submit() {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }
}
