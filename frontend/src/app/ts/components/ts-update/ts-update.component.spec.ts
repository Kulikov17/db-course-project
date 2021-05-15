import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsUpdateComponent } from './ts-update.component';

describe('TsUpdateComponent', () => {
  let component: TsUpdateComponent;
  let fixture: ComponentFixture<TsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
