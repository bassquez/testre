import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetalleProyectoComponent } from './modal-detalle-proyecto.component';

describe('ModalDetalleProyectoComponent', () => {
  let component: ModalDetalleProyectoComponent;
  let fixture: ComponentFixture<ModalDetalleProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetalleProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetalleProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
