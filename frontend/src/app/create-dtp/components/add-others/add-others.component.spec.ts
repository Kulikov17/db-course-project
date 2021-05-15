import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOthersComponent } from './add-others.component';

describe('AddOthersComponent', () => {
  let component: AddOthersComponent;
  let fixture: ComponentFixture<AddOthersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOthersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
