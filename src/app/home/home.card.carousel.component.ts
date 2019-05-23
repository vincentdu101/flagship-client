import { Component, AfterContentInit } from '@angular/core';
import { NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'home-card-carousel',
  templateUrl: './home.card.carousel.component.html',
  styleUrls: ['./home.card.carousel.component.css']
})
export class HomeCardCarouselComponent implements AfterContentInit {

    public cards = [
        [
            {name: "test", description: "yes"},
            {name: "test", description: "yes"},
            {name: "test", description: "yes"}
        ],
        [
            {name: "test1", description: "yes"},
            {name: "test1", description: "yes"},
            {name: "test2", description: "yes"}
        ]
    ];

    constructor(public config: NgbCarouselConfig) {
    }

    ngAfterContentInit() {
    }

}
