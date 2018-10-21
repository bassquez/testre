import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventoriasComponent } from './interventorias.component';

describe('InterventoriasComponent', () => {
  let component: InterventoriasComponent;
  let fixture: ComponentFixture<InterventoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterventoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
