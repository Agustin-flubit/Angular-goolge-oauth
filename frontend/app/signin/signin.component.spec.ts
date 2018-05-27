import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './signin.component';
import { SharedModule } from '../shared/shared.module';
import { GoogleAuthStub } from '../testing/stubs/google-auth-stub';
import { GoogleAuthService } from '../core/auth/auth.service';

describe('SigninComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule ],
      declarations: [ SignInComponent ],
      providers: [
        { provide: GoogleAuthService, userClass: GoogleAuthStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
