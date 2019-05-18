import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {ArticlesService, Article, ViewService, ResourceService} from "../core";
import {ActivatedRoute, Router} from "@angular/router";
import {CATEGORIES} from "../core";
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

    private resource: Article;
    public resourceForm: FormGroup;
    public categories: string[] = [];
    public config: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '15rem',
        minHeight: '5rem',
        placeholder: 'Enter text here...',
        translate: 'no',
        customClasses: [
          {
            name: "quote",
            class: "quote",
          },
          {
            name: 'redText',
            class: 'redText'
          },
          {
            name: "titleText",
            class: "titleText",
            tag: "h1",
          },
        ]
      };

    constructor (
        private articlesService: ArticlesService,
        private route: ActivatedRoute,
        private viewService: ViewService,
        private router: Router,
        private resourceService: ResourceService
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
            image: new FormControl(),
            body: new FormControl(),
            category: new FormControl()
		});
	}

	private setupEditForm(resourceData: Article): void {
		this.resourceForm = new FormGroup({
			name: new FormControl({value: resourceData.name}),
			description: new FormControl({ value: resourceData.description }),
            image: new FormControl({ value: resourceData.image }),
            body: new FormControl(resourceData.body),
            category: new FormControl(resourceData.category)
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

    public categorySelected(cat: string): {active: boolean} {
        return {
            active: !!this.resource && cat === this.resource.category
        }
    }

    public parseCategory(cat: string): string {
        return cat.charAt(0).toUpperCase() + cat.slice(1);
    }

	public saveProject(): void {
		this.resource.name = this.viewService.getResourceValue(this.resourceForm, "name");
		this.resource.description = this.viewService.getResourceValue(this.resourceForm, "description");
		this.resource.image = this.viewService.getResourceValue(this.resourceForm, "image");
		this.resource.category = this.viewService.getResourceValue(this.resourceForm, "category");
		this.resource.body = this.viewService.getResourceValue(this.resourceForm, "body");
		this.resourceService.saveResource(this.resource).subscribe((data) => {
			this.router.navigateByUrl("/resource");
		});
	}


    public cancel(): void {
        this.router.navigateByUrl("/resource");
    }

}
