import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventoriaComponent } from './interventoria.component';

describe('InterventoriaComponent', () => {
  let component: InterventoriaComponent;
  let fixture: ComponentFixture<InterventoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterventoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
