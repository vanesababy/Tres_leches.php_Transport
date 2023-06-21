import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenciasModalComponent } from './competencias-modal.component';

describe('CompetenciasModalComponent', () => {
  let component: CompetenciasModalComponent;
  let fixture: ComponentFixture<CompetenciasModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetenciasModalComponent]
    });
    fixture = TestBed.createComponent(CompetenciasModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
