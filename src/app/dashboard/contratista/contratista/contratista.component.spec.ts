import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratistaComponent } from './contratista.component';

describe('ContratistaComponent', () => {
  let component: ContratistaComponent;
  let fixture: ComponentFixture<ContratistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
