import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContratistaComponent } from './admin-contratista.component';

describe('AdminContratistaComponent', () => {
  let component: AdminContratistaComponent;
  let fixture: ComponentFixture<AdminContratistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminContratistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContratistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
