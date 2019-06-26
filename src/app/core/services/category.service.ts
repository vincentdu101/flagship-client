import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Config, CATEGORIES} from "./config";
import {Article} from "../models";
import {Observable, Subject} from "rxjs";

@Injectable() 
export class CategoryService {

	constructor(private apiService: ApiService,
				private config: Config) {
		this.loadAllCategories();
	}

	private TYPE = {
		"Projects": "primary",
		"Skill": "warning"
	};

	private generateServerUrl(category, options: string = ""): string {
		return this.config.serverArticlesPath + "?category=" + category + options;
	}

	public loadAllCategories(): void {
		// let observable = Observable.create((observer) => {
		// 	this.apiService.get(this.config.serverCategoriesPath).subscribe((data: ICategory[]) => {

		// 	});
		// });
		// observable.subscribe();
	}

	public findCategoryById(id: string) {
		// return this.categories.filter((data: ICategory) => { 
		// 	if (data._id === id) {
		// 		return data;
		// 	} 
		// })[0];
	} 

	public findCategoryByName(name: string) {
		// return this.categories.filter((data: ICategory) => {
		// 	if (data.name === name) {
		// 		return data;
		// 	}
		// })[0];
	}

	public getResources(resource: CATEGORIES, options: string = ""): Observable<Article[]> {
		return this.apiService.get(this.generateServerUrl(resource, options));
	}

	public getAllResources(): Observable<any> {
		return Observable.create((observer) => {
			let serverUrl = this.config.serverArticlesPath;

			this.apiService.get(serverUrl).subscribe((data) => {
				observer.next(data);
			});
		});
	}

	public convertCategoriesToList(): string[] {
		const categories = [];
        for (const category of Object.values(CATEGORIES)) {
            categories.push(category);
		}
		return categories;
    }


}