import { Component, OnInit } from '@angular/core';
import {ArticlesService, ResourceService} from "../core";
import { Article } from '../core/models';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

    private resources: Article[];

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

}
