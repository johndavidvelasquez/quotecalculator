import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetquoteComponent } from './getquote.component';

describe('GetquoteComponent', () => {
  let component: GetquoteComponent;
  let fixture: ComponentFixture<GetquoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetquoteComponent]
    });
    fixture = TestBed.createComponent(GetquoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
