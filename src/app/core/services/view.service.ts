import {Injectable} from "@angular/core";
import {FormGroup, FormControl} from "@angular/forms";

@Injectable() 
export class ViewService {

	constructor(){}

	public getResourceValue(resource: FormGroup, attr: string): string {
		let valueMap = resource.controls[attr].value;
		
		if (!!valueMap) {
			return valueMap;
		} else {
			return "";
		}
	}
	
	public isScrolledIntoView(selector: string): boolean {
		let el = document.getElementById(selector);
		
		if (!el) {
			return false;
		}

		let rect = el.getBoundingClientRect();

		// console.log("el ", el, el.id);
		// console.log("rect ", rect, el.id);
		// console.log("window ", window.scrollY, el.id);
		// console.log("visible ", (
		// 	(rect.top + rect.height) / 2 >= 50 &&
		// 	rect.top < window.scrollY + 200 + (rect.height / 2)
        // ), el.id);
        return (
			(rect.top + rect.height) / 2 >= 50 && 
			rect.top < window.scrollY + 200 + (rect.height / 2)
        );
    }

}