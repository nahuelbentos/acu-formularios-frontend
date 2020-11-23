import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavFormularioComponent } from './nav-formulario.component';

describe('NavFormularioComponent', () => {
  let component: NavFormularioComponent;
  let fixture: ComponentFixture<NavFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
