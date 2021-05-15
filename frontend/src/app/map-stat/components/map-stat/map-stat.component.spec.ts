import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapStatComponent } from './map-stat.component';

describe('MapStatComponent', () => {
  let component: MapStatComponent;
  let fixture: ComponentFixture<MapStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
