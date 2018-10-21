import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoFuenteComponent } from './proyecto-fuente.component';

describe('ProyectoFuenteComponent', () => {
  let component: ProyectoFuenteComponent;
  let fixture: ComponentFixture<ProyectoFuenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoFuenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoFuenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
