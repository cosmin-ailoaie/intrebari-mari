import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrebareComponent } from './intrebare.component';

describe('IntrebareComponent', () => {
  let component: IntrebareComponent;
  let fixture: ComponentFixture<IntrebareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntrebareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrebareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
