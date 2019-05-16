import {Injectable} from "@angular/core";

@Injectable() 
export class Config {

	public get imagePath() {
		return "/app/images/";
	}

	public get serverHost(): string {
		return "http://localhost:8080/";
	}

	public get serverArticlesPath(): string {
		return this.serverHost + "articles";
	}

	public get serverCategoriesPath(): string {
		return this.serverHost + "categories";
	}

	public get serverSkillsPath(): string {
		return this.serverHost + "skills";
	}
	
}

export interface IUserToken {
	auth: boolean;
	token: string;
}

export interface IArticle {
	_id: string;
	name: string;
	description: string;
	body: string;
	image: string;
	__v?: number;
	category_id: string;
	created_at?: Date;
}

export enum CATEGORIES {
	SKILLS = <any>"skills",
	PROJECTS = <any>"projects",
	SLIDESHOW = <any>"slideshow"
}

export interface ISkill {
	_id: string;
	name: string;
	level: number;
	_v?: number;
	category_id: string;
	created_at?: Date;
}