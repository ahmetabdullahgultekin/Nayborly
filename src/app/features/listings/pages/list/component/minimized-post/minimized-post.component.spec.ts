import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MinimizedPostComponent} from './minimized-post.component';

describe('MinimizedPostComponent', () => {
  let component: MinimizedPostComponent;
  let fixture: ComponentFixture<MinimizedPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinimizedPostComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MinimizedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
