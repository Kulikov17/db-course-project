import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDtpComponent } from './search-dtp.component';

describe('SearchDtpComponent', () => {
  let component: SearchDtpComponent;
  let fixture: ComponentFixture<SearchDtpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDtpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
