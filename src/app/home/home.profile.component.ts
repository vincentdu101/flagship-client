import { Component, OnInit } from '@angular/core';
import { Article, ArticlesService, CATEGORIES, ViewService } from '../core';

@Component({
    selector: 'home-profile',
    templateUrl: './home.profile.component.html',
    styleUrls: ['./home.profile.component.css']
})
export class HomeProfileComponent implements OnInit {

    public cards: Article[] = [];
    public jobs: Article[] = [];
    public jobCategories: string[] = [];
    public profileSlideIn: boolean = false;
    public jobsSlideIn: boolean = false;
    public active: string = "top";
    public selectedCategory: string;

    constructor(
        private articlesService: ArticlesService,
        private viewService: ViewService
    ) { }

    ngOnInit() {
        this.loadProfileInfo();
        this.loadEmploymentInfo();
        this.addEventListeners();
        this.showVisibleViews();
    }

    selectCategory(category: string): void {
        this.selectedCategory = category;
    }

    private loadProfileInfo(): void {
        this.articlesService.findByCategory(CATEGORIES.PERSONAL).subscribe((data) => {
            this.cards = data;
        });
    }

    private loadEmploymentInfo(): void {
        this.articlesService.findByCategory(CATEGORIES.EMPLOYMENT).subscribe((data) => {
            this.jobs = data;

            for (let job of this.jobs) {
                if (!this.selectedCategory) {
                    this.selectedCategory = job.name;
                }
                this.jobCategories.push(job.name);
            }
        });
    }

    private addEventListeners(): void {
        window.addEventListener("scroll", () => {
            this.showVisibleViews();
        });

        window.addEventListener("resize", () => {
            this.showVisibleViews();
        });
    }

    private showVisibleViews(): void {
        if (this.cards.length > 0 && this.jobs.length > 0) {
            this.profileSlideIn = this.viewService.isScrolledIntoView("profile-view");
            this.jobsSlideIn = this.viewService.isScrolledIntoView("jobs-summary");
        }
    }

}
