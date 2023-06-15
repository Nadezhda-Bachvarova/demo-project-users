import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUserFormComponent } from './single-user-form.component';

describe('SingleUserFormComponent', () => {
  let component: SingleUserFormComponent;
  let fixture: ComponentFixture<SingleUserFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleUserFormComponent]
    });
    fixture = TestBed.createComponent(SingleUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
