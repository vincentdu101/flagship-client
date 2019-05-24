import { Component, AfterContentInit } from '@angular/core';
import { NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";
import { ArticlesService, CATEGORIES, Article } from '../core';

@Component({
  selector: 'home-card-carousel',
  templateUrl: './home.card.carousel.component.html',
  styleUrls: ['./home.card.carousel.component.css']
})
export class HomeCardCarouselComponent implements AfterContentInit {

    public cards: Article[][] = [];

    constructor(
        public config: NgbCarouselConfig,
        private articlesService: ArticlesService) {
    }

    ngAfterContentInit() {
        this.articlesService.findByCategory(CATEGORIES.SKILLS).subscribe((data) => {
            let interval = []
            for (let card of data) {
                if (interval.length === 3) {
                    this.cards.push(interval);
                    interval = [];
                }
                interval.push(card);
            }
            if (interval.length > 0) {
                this.cards.push(interval);
            }
        });
    }

}
