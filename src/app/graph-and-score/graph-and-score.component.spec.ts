import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphAndScoreComponent } from './graph-and-score.component';

describe('GraphAndScoreComponent', () => {
  let component: GraphAndScoreComponent;
  let fixture: ComponentFixture<GraphAndScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphAndScoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphAndScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
