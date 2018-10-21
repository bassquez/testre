import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuenteFinanciacionComponent } from './fuente-financiacion.component';

describe('FuenteFinanciacionComponent', () => {
  let component: FuenteFinanciacionComponent;
  let fixture: ComponentFixture<FuenteFinanciacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuenteFinanciacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuenteFinanciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
