import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarContratistaComponent } from './editar-contratista.component';

describe('EditarContratistaComponent', () => {
  let component: EditarContratistaComponent;
  let fixture: ComponentFixture<EditarContratistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarContratistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarContratistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
