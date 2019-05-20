import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import { Article, ArticlesService, ViewService, ResourceService, CATEGORIES } from '../core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-resource',
  templateUrl: './create.resource.component.html',
  styleUrls: ['./create.resource.component.css']
})
export class CreateResourceComponent implements OnInit {

    @Output() close: EventEmitter<any> = new EventEmitter();
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
        this.resource = {
            name: "",
            description: "",
            body: "",
            category: "",
            image: ""
        }
        this.initNewForm();
    }

    private convertCategoriesToList(): void {
        for(let category of Object.values(CATEGORIES)) {
            this.categories.push(category);
        }
    }

    private initNewForm(): void {
        this.resourceForm = new FormGroup({
            name: new FormControl(),
            description: new FormControl(),
            image: new FormControl(),
            body: new FormControl(),
            category: new FormControl()
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

    public selectCategory(cat: string): void {
        this.resourceForm.controls.category.setValue(cat);
        this.resource.category = cat;
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
        this.resourceService.createResource(this.resource).subscribe((data) => {
            this.close.emit(this.resource);
        });
    }


    public cancel(): void {
        this.close.emit();
    }
}
