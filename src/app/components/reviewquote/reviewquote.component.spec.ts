import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewquoteComponent } from './reviewquote.component';

describe('ReviewquoteComponent', () => {
  let component: ReviewquoteComponent;
  let fixture: ComponentFixture<ReviewquoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewquoteComponent]
    });
    fixture = TestBed.createComponent(ReviewquoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
