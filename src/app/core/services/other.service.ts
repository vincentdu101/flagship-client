import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class OtherService {

	constructor(private router: Router) {}

	public goToPage(page: string, config = {}) {
		this.router.navigateByUrl("/" + page, config);
	}

}