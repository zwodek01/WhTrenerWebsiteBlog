import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeryfiEmailComponent } from './veryfi-email.component';

describe('VeryfiEmailComponent', () => {
  let component: VeryfiEmailComponent;
  let fixture: ComponentFixture<VeryfiEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeryfiEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeryfiEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
