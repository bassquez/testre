import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInterventoriaComponent } from './modal-interventoria.component';

describe('ModalInterventoriaComponent', () => {
  let component: ModalInterventoriaComponent;
  let fixture: ComponentFixture<ModalInterventoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInterventoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalInterventoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
