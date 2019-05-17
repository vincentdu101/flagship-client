import { Component, OnInit } from '@angular/core';
import {ArticlesService} from "../core/services/articles.service";
import { Article } from '../core/models';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {

  private resources: Article[];

  constructor(private articlesService: ArticlesService) {

  }

  ngOnInit() {
    this.articlesService.query().subscribe((data) => {
      this.resources = data;
    });
  }

}
