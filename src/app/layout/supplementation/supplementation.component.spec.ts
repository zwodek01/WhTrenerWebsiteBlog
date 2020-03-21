import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplementationComponent } from './supplementation.component';

describe('SupplementationComponent', () => {
  let component: SupplementationComponent;
  let fixture: ComponentFixture<SupplementationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplementationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplementationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
