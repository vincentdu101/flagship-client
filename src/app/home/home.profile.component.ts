import { Component, OnInit } from '@angular/core';
import { Article, ArticlesService, CATEGORIES, ViewService } from '../core';

@Component({
    selector: 'home-profile',
    templateUrl: './home.profile.component.html',
    styleUrls: ['./home.profile.component.css']
})
export class HomeProfileComponent implements OnInit {

    public cards: Article[];
    public slideIn = false;

    constructor(
        private articlesService: ArticlesService,
        private viewService: ViewService
    ) { }

    ngOnInit() {
        this.articlesService.findByCategory(CATEGORIES.PERSONAL).subscribe((data) => {
            this.cards = data;

            window.addEventListener("scroll", () => {
                if (this.viewService.isScrolledIntoViewTop("profile-view")) {
                    this.slideIn = true;
                }
            });
        });
    }

}
