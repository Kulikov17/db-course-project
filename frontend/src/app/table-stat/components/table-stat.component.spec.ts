import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableStatComponent } from './table-stat.component';

describe('TableStatComponent', () => {
  let component: TableStatComponent;
  let fixture: ComponentFixture<TableStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
