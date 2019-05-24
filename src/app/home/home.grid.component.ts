import { Component, OnInit } from '@angular/core';
import { Article, ArticlesService } from "../core";
import { CATEGORIES } from "../core";

@Component({
  selector: 'home-grid',
  templateUrl: './home.grid.component.html',
  styleUrls: ['./home.grid.component.css']
})
export class HomeGridComponent implements OnInit {

    public grids: Article[] = [];

    constructor(private articlesService: ArticlesService) {

    }

    ngOnInit() {
        this.articlesService.findByCategory(CATEGORIES.PROJECTS).subscribe((data) => {
            this.grids = data;
        });
    }

}
