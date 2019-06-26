import { Component, OnInit } from '@angular/core';
import {ArticlesService, ResourceService, CategoryService} from "../core";
import { Article } from '../core/models';
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

    public resources: Article[];
    public categories: string[] = ["test"];
    public showCreationPage = false;
    public params = {};
    public searchName = "";

    constructor(
        private articlesService: ArticlesService,
        private resourceService: ResourceService,
        private categoryService: CategoryService
    ) {
        this.categories = this.categoryService.convertCategoriesToList();
        this.categories.push("All");
    }

    ngOnInit() {
        this.updateResourceList();
    }

    private updateResourceList(params = {}): void {
        this.articlesService.query(params).subscribe((data) => {
            this.resources = data;
        });
    }

    public deleteResource(id: string): void {
        this.resourceService.deleteResource(id).subscribe(() => {
            this.updateResourceList();
        });
    }

    public closeNewView(article: Article): void {
        if (!!article) {
            this.updateResourceList();
        }
        this.showCreationPage = false;
    }

    public addNewResource(): void {
        this.showCreationPage = true;
    }

    public categorySelected(category: string): void {
        if (category === "All") {
            delete this.params["category"];
        } else {
            this.params["category"] = category;
        }
        this.updateResourceList(this.params);
    }

    public onKey(event: any): void {
        if (!!event) {
            this.searchName = event.target.value;
            this.params["name"] = this.searchName;
            this.updateResourceList(this.params);
        }
    }

}
