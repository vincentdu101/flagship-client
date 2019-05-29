import { Component, OnInit } from '@angular/core';
import { Article, ArticlesService, CATEGORIES } from '../core';

@Component({
    selector: 'home-profile',
    templateUrl: './home.profile.component.html',
    styleUrls: ['./home.profile.component.css']
})
export class HomeProfileComponent implements OnInit {

    public cards: Article[];

    constructor(
        private articlesService: ArticlesService
    ) { }

    ngOnInit() {
        this.articlesService.findByCategory(CATEGORIES.PERSONAL).subscribe((data) => {
            this.cards = data;
        });
    }

}
