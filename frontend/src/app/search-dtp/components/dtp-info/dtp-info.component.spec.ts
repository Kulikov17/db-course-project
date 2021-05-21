import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtpInfoComponent } from './dtp-info.component';

describe('DtpInfoComponent', () => {
  let component: DtpInfoComponent;
  let fixture: ComponentFixture<DtpInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DtpInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DtpInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
