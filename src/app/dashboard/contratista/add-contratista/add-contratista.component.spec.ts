import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContratistaComponent } from './add-contratista.component';

describe('AddContratistaComponent', () => {
  let component: AddContratistaComponent;
  let fixture: ComponentFixture<AddContratistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContratistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContratistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
