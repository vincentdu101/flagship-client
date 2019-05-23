import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCardCarouselComponent } from './home.card.carousel.component';

describe('Home.Card.CarouselComponent', () => {
  let component: HomeCardCarouselComponent;
  let fixture: ComponentFixture<HomeCardCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCardCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCardCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
