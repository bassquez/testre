import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProyectoComponent } from './admin-proyecto.component';

describe('AdminProyectoComponent', () => {
  let component: AdminProyectoComponent;
  let fixture: ComponentFixture<AdminProyectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProyectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProyectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
