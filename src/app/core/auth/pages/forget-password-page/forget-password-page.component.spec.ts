import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ForgetPasswordPageComponent} from './forget-password-page.component';

describe('ForgetPasswordPageComponent', () => {
  let component: ForgetPasswordPageComponent;
  let fixture: ComponentFixture<ForgetPasswordPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForgetPasswordPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ForgetPasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
