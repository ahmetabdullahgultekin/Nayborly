import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ListingFlowComponent} from './listing-flow.component';

describe('ListingFlowComponent', () => {
  let component: ListingFlowComponent;
  let fixture: ComponentFixture<ListingFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingFlowComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListingFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
