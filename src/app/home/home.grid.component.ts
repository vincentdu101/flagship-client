import { Component, OnInit } from '@angular/core';
import { Article, ArticlesService, ViewService } from "../core";
import { CATEGORIES } from "../core";
import {trigger, state, style, animate, transition} from "@angular/animations";

@Component({
    selector: 'home-grid',
    templateUrl: './home.grid.component.html',
    styleUrls: ['./home.grid.component.css'],
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
export class HomeGridComponent implements OnInit {

    public grids: Article[] = [];
    private isOpen = false;

    constructor(
        private articlesService: ArticlesService,
        private viewService: ViewService
    ) {

    }

    ngOnInit() {
        this.articlesService.findByCategory(CATEGORIES.PROJECTS).subscribe((data) => {
            this.grids = data;
            this.toggleCardsVisibleAfterScroll();
        });
    }

    private toggleCardsVisibleAfterScroll(): void {
        window.addEventListener("scroll", () => {
            if (this.viewService.isScrolledIntoView("home-grid")) {
                this.isOpen = true;
            }
        });
    }

}
