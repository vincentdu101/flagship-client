import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResourceComponent } from './create.resource.component';

describe('CreateResourceComponent', () => {
  let component: Create.ResourceComponent;
  let fixture: ComponentFixture<Create.ResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Create.ResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Create.ResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
