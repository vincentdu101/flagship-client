import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {CategoryService} from "./category.service";
import {CATEGORIES} from "./config";

@Injectable()
export class CarouselService {

    constructor(private categoryService: CategoryService) {}

    public getSlides(): Observable<any> {
		return Observable.create((observer) => {
			this.categoryService.getResources(CATEGORIES.SLIDESHOW).subscribe((slides) => {
				observer.next(slides);
			});
		});
	}

}