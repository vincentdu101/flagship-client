import {Injectable} from "@angular/core";
import { User } from "../models";

@Injectable() 
export class Config {

	public get imagePath() {
		return "/app/images/";
	}

	public get serverHost(): string {
		return "http://localhost:8080/";
	}

	public get serverArticlesPath(): string {
		return "/articles";
	}

	public get serverCategoriesPath(): string {
		return "/categories";
	}

	public get serverSkillsPath(): string {
		return "/skills";
	}
	
}

export interface IUserConfig {
	auth: boolean;
	token: string;
	user: User;
	role: string;
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
	SKILLS = "skills",
	PROJECTS = "projects",
	SLIDESHOW = "slideshow"
}

export interface ISkill {
	_id: string;
	name: string;
	level: number;
	_v?: number;
	category_id: string;
	created_at?: Date;
}