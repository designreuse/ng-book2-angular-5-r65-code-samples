import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathMatchTestComponent } from './path-match-test.component';

describe('PathMatchTestComponent', () => {
  let component: PathMatchTestComponent;
  let fixture: ComponentFixture<PathMatchTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathMatchTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathMatchTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
