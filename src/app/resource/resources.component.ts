import { Component, OnInit } from '@angular/core';
import {ArticlesService, ResourceService} from "../core";
import { Article } from '../core/models';
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

    public resources: Article[];
    public showCreationPage = false;

    constructor(
        private articlesService: ArticlesService,
        private resourceService: ResourceService
    ) {
    }

    ngOnInit() {
        this.updateResourceList();
    }

    private updateResourceList(): void {
        this.articlesService.query().subscribe((data) => {
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

}
