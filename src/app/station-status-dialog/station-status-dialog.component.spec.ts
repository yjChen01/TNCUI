import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationStatusDialogComponent } from './station-status-dialog.component';

describe('StationStatusDialogComponent', () => {
  let component: StationStatusDialogComponent;
  let fixture: ComponentFixture<StationStatusDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationStatusDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationStatusDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
