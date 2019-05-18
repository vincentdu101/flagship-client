import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {ArticlesService, Article, ViewService} from "../core";
import {ActivatedRoute, Router} from "@angular/router";
import {CATEGORIES} from "../core";

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

    private resource: Article;
    public resourceForm: FormGroup;
    public categories: string[] = [];

    constructor (
        private articlesService: ArticlesService,
        private route: ActivatedRoute,
        private viewService: ViewService
    ) {
        this.convertCategoriesToList();   
    }

    ngOnInit() {
        this.initEditForm();
        this.route.params.subscribe((params) => {
            this.articlesService.get(params._id).subscribe((data) => {
                this.resource = data;
                this.setupEditForm(this.resource);
            });
        });
    }

    private convertCategoriesToList(): void {
        for(let category of Object.values(CATEGORIES)) {
            this.categories.push(category);
        }
    }

	private initEditForm(): void {
		this.resourceForm = new FormGroup({
			name: new FormControl(),
			description: new FormControl(),
			image: new FormControl()
		});
	}

	private setupEditForm(resourceData): void {
		this.resourceForm = new FormGroup({
			name: new FormControl({value: resourceData.name}),
			description: new FormControl({ value: resourceData.description }),
			image: new FormControl({ value: resourceData.image })
		});
    }  
  
    public getResourceValue(attr: string): string {
        return this.viewService.getResourceValue(this.resourceForm, attr);
    }

    public getSelectedCategoryName(): string {
        if (!!this.resource) {
            return this.categories[this.resource.category];
        }
    }

}
