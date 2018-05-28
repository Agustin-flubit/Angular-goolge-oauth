import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './core/auth/auth.service';
import * as fromRoot from './store';
import { StoreModule, combineReducers } from '@ngrx/store';
import { AuthStub } from './testing/stubs/auth-stub';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          layout: combineReducers(fromRoot.reducers),
        }),
        RouterTestingModule,
        SharedModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AuthService, useClass: AuthStub }
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
