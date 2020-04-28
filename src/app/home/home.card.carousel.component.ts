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
    public cards: Article[] = [
        {image: "", name: "", description: "", body: "", category: "", demo: ""}
    ];
    public cardLayout = {};
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
        this.articlesService.findByCategory(CATEGORIES.SKILLS).subscribe((data: Article[]) => {
            this.cards = data;

            for (let i = 0; i < this.cards.length; i++) {
                this.cardLayout[this.cards[i]._id] = i % 2 == 0;
            }

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
