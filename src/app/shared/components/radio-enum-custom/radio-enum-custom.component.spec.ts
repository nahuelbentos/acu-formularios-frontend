import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioEnumCustomComponent } from './radio-enum-custom.component';

describe('RadioEnumCustomComponent', () => {
  let component: RadioEnumCustomComponent;
  let fixture: ComponentFixture<RadioEnumCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioEnumCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioEnumCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
