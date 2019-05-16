import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Config, ICategory} from "./config";
import {Observable, Subject} from "rxjs";

@Injectable() 
export class CategoryService {

	private categories: ICategory[] = [];
	public categorySubject: Subject<ICategory[]>;

	constructor(private apiService: ApiService,
				private config: Config) {
		this.categorySubject = new Subject();
		this.loadAllCategories();
	}

	private TYPE = {
		"Projects": "primary",
		"Skill": "warning"
	};

	private generateServerUrl(category, options: string = ""): string {
		return this.config.serverArticlesPath + "?category_id=" + category._id + options;
	}

	public determineArticleCategory(category_id) {
		var category = this.findCategoryById(category_id);
		return "<span class='label label-" + this.TYPE[category.name] + "'>" + 
				category.name + "</span>";
	}

	public getArticleCategoryInfo(category_id): string {
		return this.findCategoryById(category_id).name;
	}	

	public loadAllCategories(): void {
		let observable = Observable.create((observer) => {
			this.apiService.get(this.config.serverCategoriesPath).subscribe((data: ICategory[]) => {
				// this.categories = data.json();
				this.categories = data;
				this.categorySubject.next(this.categories);
			});
		});
		observable.subscribe();
	}

	public findCategoryById(id: string) {
		return this.categories.filter((data: ICategory) => { 
			if (data._id === id) {
				return data;
			} 
		})[0];
	} 

	public findCategoryByName(name: string) {
		return this.categories.filter((data: ICategory) => {
			if (data.name === name) {
				return data;
			}
		})[0];
	}

	public getCategories(): Observable<ICategory[]> {
		return Observable.create((observer) => {
			if (this.categories.length > 0) {
				observer.next(this.categories);
			} else {
				this.categorySubject.subscribe((data) => {
					observer.next(this.categories);
				});
			}
		});
	}

	public getResources(resource: string, options: string = "") {
		return Observable.create((observer) => {
			let category = this.findCategoryByName(resource);

			if (category) {
				this.apiService.get(this.generateServerUrl(category, options)).subscribe((data) => {
					observer.next(data);
				});
			} else {
				this.categorySubject.subscribe(() => {
					category = this.findCategoryByName(resource);
					this.apiService.get(this.generateServerUrl(category, options)).subscribe((data) => {
						observer.next(data);
					});
				});
			}
		});
	}

	public getAllResources(): Observable<any> {
		return Observable.create((observer) => {
			let serverUrl = this.config.serverArticlesPath;

			this.apiService.get(serverUrl).subscribe((data) => {
				observer.next(data);
			});
		});
	}


}