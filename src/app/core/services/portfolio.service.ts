import {Injectable} from "@angular/core";
import {CategoryService} from "./category.service";
import {Observable} from "rxjs";

@Injectable()
export class PortfolioService {

	constructor(private categoryService: CategoryService) {
	}

	public getPortfolio() {
		return Observable.create((observer) => {
			this.categoryService.getResources("Portfolio").subscribe((portfolio) => {
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