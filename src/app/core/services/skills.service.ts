import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {CategoryService} from "./category.service";
import {Config, ISkill} from "./config";
import {Observable} from "rxjs";

@Injectable() 
export class SkillsService {

	constructor(private apiService: ApiService,
				private categoryService: CategoryService,
				private config: Config) {

	}

	public getSkills(): Observable<any> {
		return this.apiService.get(this.config.serverSkillsPath);
	}

	public getSkill(id: string): Observable<any>{
		return this.apiService.get(this.config.serverSkillsPath + "/" + id);
	}

	public createSkill(skill): Observable<any> {
		return this.apiService.post(this.config.serverSkillsPath, skill);
	}

	public saveSkill(skill): Observable<any> {
		return this.apiService.put(this.config.serverSkillsPath + "/" + skill._id, skill);
	}

	public deleteSkill(id: string): Observable<any> {
		return this.apiService.delete(this.config.serverSkillsPath + "/" + id);
	}

}