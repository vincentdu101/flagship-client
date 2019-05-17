import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {ArticlesService, Article} from "../core";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  private resource: Article;
  public resourceForm: FormGroup;

  constructor(
      private articlesService: ArticlesService,
      private route: ActivatedRoute 
  ) { }

  ngOnInit() {
    this.initEditForm();
    this.route.params.subscribe((params) => {
      this.articlesService.get(params._id).subscribe((data) => {
        this.resource = data;
        this.setupEditForm(this.resource);
      });
    });
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
		// this.editorBody = resourceData.body;
	}  

}
