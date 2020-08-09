import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevgrowthComponent } from './revgrowth.component';

describe('RevgrowthComponent', () => {
  let component: RevgrowthComponent;
  let fixture: ComponentFixture<RevgrowthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevgrowthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevgrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
