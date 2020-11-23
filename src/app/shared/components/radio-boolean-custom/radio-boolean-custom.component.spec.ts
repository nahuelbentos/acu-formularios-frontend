import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioBooleanCustomComponent } from './radio-boolean-custom.component';

describe('RadioBooleanCustomComponent', () => {
  let component: RadioBooleanCustomComponent;
  let fixture: ComponentFixture<RadioBooleanCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioBooleanCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioBooleanCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
