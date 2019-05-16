import {Component, Input} from "@angular/core";
import {ArticlesService} from "../core";
import {CATEGORIES} from "../core/services/config";

@Component({
    selector: "home-carousel",
    templateUrl: "./home-carousel.component.html"
})
export class HomeCarouselComponent {

    public slides: any[];

    constructor(private articlesService: ArticlesService) {
        this.articlesService.findByCategory(CATEGORIES.SLIDESHOW).subscribe((data) => {
            this.slides = data;
        });
    }

    

}