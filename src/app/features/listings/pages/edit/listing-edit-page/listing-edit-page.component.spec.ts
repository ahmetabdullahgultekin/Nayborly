import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListingEditPageComponent} from './listing-edit-page.component';

describe('ListingEditPageComponent', () => {
  let component: ListingEditPageComponent;
  let fixture: ComponentFixture<ListingEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingEditPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListingEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
