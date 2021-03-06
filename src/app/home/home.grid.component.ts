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
    public isOpen = false;
    public gridAnims = {};
    public categories = {};
    public currentCategory = "";

    constructor(
        private articlesService: ArticlesService,
        private viewService: ViewService,
        private router: Router
    ) {

    }

    ngOnInit() {
        this.articlesService.findByCategory(CATEGORIES.PROJECTS).subscribe((data: Article[]) => {
            this.grids = data;
            for (const grid of this.grids) {
                this.gridAnims[grid._id] = {isPop: false};
                if (!this.categories[grid.description]) {
                    this.categories[grid.description] = true;
                }
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

    public getCategories(): string[] {
        return Object.keys(this.categories);
    }

    public setCategory(category: string): void {
        this.currentCategory = category;
    }

    public getGridListClasses(grid: Article): {} {
        return {
            'hide': grid.description !== this.currentCategory && this.currentCategory !== "",
            'show': grid.description === this.currentCategory || this.currentCategory === ""
        }
    }

}
