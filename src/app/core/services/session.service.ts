import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable, Subject} from "rxjs";
import {Observer} from "rxjs/Observer";
import {IUserToken} from "./config";
import {Router} from "@angular/router";
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';


@Injectable()
export class SessionService {

	constructor(private apiService: ApiService, private router: Router) {}

	private setUserToken(data: IUserToken): void {
		sessionStorage["userToken"] = JSON.stringify(data);
	}

	private getUserToken(): IUserToken {
		if (sessionStorage["userToken"]) {
			return JSON.parse(sessionStorage["userToken"]);
		} else {
			return undefined;
		}
	}	

	public loginUser(formData: {username: string, password: string}): Observable<any> {
		if (formData.username && formData.password) {
			return Observable.create((observer) => {
				this.apiService.post("/login", formData).subscribe((data: IUserToken) => {
					this.setUserToken(data);
					observer.next({success: this.getUserToken()});
				});
			});
		} else {
			return Observable.create((observer) => { observer.next({error: "Form not complete"})});
		}
	}	

	public get currentUserToken(): IUserToken {
		return this.getUserToken();
	}

	public checkLoginStatus(): void {
		if (!this.getUserToken()) {
			this.router.navigate([""], {});
		}
	}

	public clearSessionState(): void {
		sessionStorage.clear();
	}

	public isLoggedIn(): boolean {
		let userToken = this.getUserToken();
		return userToken ? userToken.auth : false;

	}

}