import {Injectable} from "@angular/core";
import {FormGroup, FormControl} from "@angular/forms";

@Injectable() 
export class ViewService {

	constructor(){}

	public getResourceValue(resource: FormGroup, attr: string): string {
		let valueMap = resource.controls[attr].value;
		if (valueMap && valueMap.value) {
			return valueMap.value;
		} else if (valueMap) {
			return valueMap;
		} else {
			return "";
		}
	} 

	public isScrolledIntoView(selector: string): boolean {
        let el = document.getElementById(selector);
        let rect = el.getBoundingClientRect();
        
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.scrollY
        );
    }

}