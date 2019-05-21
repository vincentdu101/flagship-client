import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBarGraphComponent } from './home.bar.graph.component';

describe('HomeBarGraphComponent', () => {
  let component: HomeBarGraphComponent;
  let fixture: ComponentFixture<HomeBarGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBarGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
