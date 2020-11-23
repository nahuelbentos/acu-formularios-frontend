import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioGroupCustomComponent } from './radio-group-custom.component';

describe('RadioGroupCustomComponent', () => {
  let component: RadioGroupCustomComponent;
  let fixture: ComponentFixture<RadioGroupCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioGroupCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioGroupCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
