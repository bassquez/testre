import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFuenteProyectoComponent } from './modal-fuente-proyecto.component';

describe('ModalFuenteProyectoComponent', () => {
  let component: ModalFuenteProyectoComponent;
  let fixture: ComponentFixture<ModalFuenteProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFuenteProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFuenteProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
