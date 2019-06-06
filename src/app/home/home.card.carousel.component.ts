import { Component, AfterContentInit } from '@angular/core';
import { NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";
import { ArticlesService, CATEGORIES, Article, ViewService } from '../core';
import {trigger, state, style, animate, transition} from "@angular/animations";

@Component({
    selector: 'home-card-carousel',
    templateUrl: './home.card.carousel.component.html',
    styleUrls: ['./home.card.carousel.component.css'],
    animations: [
        trigger("openClose", [
            state("open", style({
                visibility: "visible",
                opacity: 1
            })),
            state("closed", style({
                visibility: "hidden",
                opacity: 0
            })),
            transition("closed => open", [
                animate("0.5s")
            ])
        ])
    ]
})
export class HomeCardCarouselComponent implements AfterContentInit {

    private singleThreshold = 1405;
    public cards: Article[] = [];
    public isOpen = false;
    public smallWindow = window.innerWidth <= this.singleThreshold;

    constructor(
        public config: NgbCarouselConfig,
        private articlesService: ArticlesService,
        private viewService: ViewService
    ) {
        window.addEventListener("resize", () => {
            this.smallWindow = window.innerWidth <= this.singleThreshold;
        });
    }

    ngAfterContentInit() {
        this.articlesService.findByCategory(CATEGORIES.SKILLS).subscribe((data) => {
            // let interval = []
            // for (let card of data) {
            //     if (interval.length === 3) {
            //         this.cards.push(interval);
            //         interval = [];
            //     }
            //     interval.push(card);
            // }
            // if (interval.length > 0) {
            //     this.cards.push(interval);
            // }
            this.cards = data;
            this.toggleCardsVisibleAfterScroll();
        });
    }

    private toggleCardsVisibleAfterScroll(): void {
        window.addEventListener("scroll", () => {
            if (this.viewService.isScrolledIntoView("home-card-carousel")) {
                this.isOpen = true;
            }
        });
    }

}
