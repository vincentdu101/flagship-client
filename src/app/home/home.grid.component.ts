import { Component, OnInit } from '@angular/core';
import { Article, ArticlesService, ViewService } from "../core";
import { CATEGORIES } from "../core";
import {trigger, state, style, animate, transition} from "@angular/animations";
import { Router } from '@angular/router';

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
        ]),
        trigger("popInCenter", [
            state("appear", style({
                visibility: "visible",
                opacity: 1
            })),
            state("disappear", style({
                visibility: "hidden",
                opacity: 0
            })),
            transition("appear => disappear", [
                animate("0.5s")
            ]),
            transition("disappear => appear", [
                animate("0.5s")
            ])
        ])
    ]
})
export class HomeGridComponent implements OnInit {

    public grids: Article[] = [];
    private isOpen = false;
    public gridAnims = {}; 

    constructor(
        private articlesService: ArticlesService,
        private viewService: ViewService,
        private router: Router
    ) {

    }

    ngOnInit() {
        this.articlesService.findByCategory(CATEGORIES.PROJECTS).subscribe((data) => {
            this.grids = data;
            for (let grid of this.grids) {
                this.gridAnims[grid._id] = {isPop: false};
            }
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

    public togglePopInEffect(id): void {
        this.gridAnims[id].isPop = !this.gridAnims[id].isPop;
    }

    public viewArticle(id: string): void {
        this.router.navigateByUrl("/article/" + id);
    }

}
