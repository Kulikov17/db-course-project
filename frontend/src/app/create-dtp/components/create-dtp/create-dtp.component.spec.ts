import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDtpComponent } from './create-dtp.component';

describe('CreateDtpComponent', () => {
  let component: CreateDtpComponent;
  let fixture: ComponentFixture<CreateDtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDtpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
