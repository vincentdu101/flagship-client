import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {CategoryService} from "./category.service";

@Injectable()
export class CarouselService {

    constructor(private categoryService: CategoryService) {}

    public getSlides(): Observable<any> {
		return Observable.create((observer) => {
			this.categoryService.getResources("Slideshow").subscribe((slides) => {
				observer.next(slides);
			});
		});
	}

}