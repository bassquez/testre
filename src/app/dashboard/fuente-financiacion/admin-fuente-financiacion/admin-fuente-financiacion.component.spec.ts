import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFuenteFinanciacionComponent } from './admin-fuente-financiacion.component';

describe('AdminFuenteFinanciacionComponent', () => {
  let component: AdminFuenteFinanciacionComponent;
  let fixture: ComponentFixture<AdminFuenteFinanciacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFuenteFinanciacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFuenteFinanciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
