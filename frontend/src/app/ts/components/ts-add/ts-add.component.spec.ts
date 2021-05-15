import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsAddComponent } from './ts-add.component';

describe('TsAddComponent', () => {
  let component: TsAddComponent;
  let fixture: ComponentFixture<TsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
