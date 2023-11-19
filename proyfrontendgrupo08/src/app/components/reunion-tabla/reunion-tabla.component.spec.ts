import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionTablaComponent } from './reunion-tabla.component';

describe('ReunionTablaComponent', () => {
  let component: ReunionTablaComponent;
  let fixture: ComponentFixture<ReunionTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReunionTablaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReunionTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
