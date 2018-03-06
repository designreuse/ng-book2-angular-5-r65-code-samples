import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HijComponent } from './hij.component';

describe('HijComponent', () => {
  let component: HijComponent;
  let fixture: ComponentFixture<HijComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HijComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HijComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
