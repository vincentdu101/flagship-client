import {Injectable} from "@angular/core";
import {CategoryService} from "./category.service";
import {Observable} from "rxjs";
import {CATEGORIES} from "./config";

@Injectable()
export class PortfolioService {

	constructor(private categoryService: CategoryService) {
	}

	public getPortfolio() {
		return Observable.create((observer) => {
			this.categoryService.getResources(CATEGORIES.PROJECTS).subscribe((portfolio) => {
				observer.next(portfolio);
			});
		});
	}

	public parsePortfolio(portfolio: Array<any>) {
		return portfolio.map((data) => {
			return data.name;
		});
	}

}