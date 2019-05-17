import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {Observable, Subject, BehaviorSubject, ReplaySubject} from "rxjs";
import {Observer} from "rxjs/Observer";
import {IUserConfig} from "./config";
import {Router} from "@angular/router";
import {User} from "../models";
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import { distinctUntilChanged } from "rxjs/operators";


@Injectable()
export class SessionService {

	private admin = "admin";

	private currentUserSubject = new BehaviorSubject<User>({} as User);
	public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

	private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
	public isAuthenticated = this.isAuthenticatedSubject.asObservable().pipe(distinctUntilChanged());

	private isRoleSubject = new BehaviorSubject<string>("");
	public isRoleSaved = this.isAuthenticatedSubject.asObservable().pipe(distinctUntilChanged());

	constructor(private apiService: ApiService, private router: Router) {
		if (!!this.getSessionInfo("userToken")) {
			this.currentUserSubject.next(this.getSessionInfo("user"));
			this.isAuthenticatedSubject.next(true);
			this.isRoleSubject.next(this.getSessionInfo("role"));
		}
	}

	private getSessionInfo(attr: string): any {
		return JSON.parse(sessionStorage.getItem(attr));
	}

	private setUserInfo(data: IUserConfig): void {
		delete data.user.password;
		sessionStorage["userToken"] = JSON.stringify(data.token);
		sessionStorage["user"] = JSON.stringify(data.user);
		sessionStorage["role"] = JSON.stringify(data.role);
	}

	private getUserToken(): string {
		if (sessionStorage["userToken"]) {
			return JSON.parse(sessionStorage["userToken"]);
		} else {
			return undefined;
		}
	}

	public loginUser(formData: {username: string, password: string}): Observable<any> {
		if (formData.username && formData.password) {
			return Observable.create((observer) => {
				this.apiService.post("/login", formData).subscribe((data: IUserConfig) => {
					this.setUserInfo(data);
					this.currentUserSubject.next(data.user);
					this.isAuthenticatedSubject.next(true);
					this.isRoleSubject.next(data.role);
					observer.next({success: this.getUserToken()});
				});
			});
		} else {
			return Observable.create((observer) => { observer.next({error: "Form not complete"})});
		}
	}

	public get currentUserToken(): string {
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
		return this.isAuthenticatedSubject.value;
	}

	public isAdmin(): boolean {
		return this.isRoleSubject.value === this.admin;
	}

}