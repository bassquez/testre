import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFuenteFinanciacionComponent } from './add-fuente-financiacion.component';

describe('AddFuenteFinanciacionComponent', () => {
  let component: AddFuenteFinanciacionComponent;
  let fixture: ComponentFixture<AddFuenteFinanciacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFuenteFinanciacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFuenteFinanciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
