import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '../../../core/user/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']

})
export class UserFormComponent implements OnChanges {
  @Input() user: User = {
    id: undefined,
    first_name: '',
    last_name: '',
    own: null,
    iban: ''
  };
  @Input() validationErrors: Object;

  @Output() save = new EventEmitter<User>();

  form: FormGroup;
  submitted = false;

  constructor(public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      'id': [this.user.id],
      'first_name': [this.user.first_name, [Validators.required]],
      'last_name': [this.user.last_name, [Validators.required]],
      'iban': [this.user.iban, [Validators.required]],
      'own': true
    });
  }

  ngOnChanges(changes) {
    if (changes.validationErrors) {
      this.bindErrors();
    }

    if (changes.user) {
      this.form.patchValue({...this.user});
    }
  }

  submit() {
    this.submitted = true;

    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }

  bindErrors() {
    if (this.validationErrors) {
      Object.keys(this.validationErrors).forEach((item) => {
        if (this.form.get(item)) {
          this.form.get(item).setErrors([this.validationErrors[item][0]]);
        }
      });
    }
  }
}
