import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';

import {
  ApiService,
  ArticlesService,
  AuthGuard,
  CommentsService,
  JwtService,
  ProfilesService,
  UserService,
  SessionService, 
  CarouselService,
  CategoryService, 
  SkillsService,
  Config,
  ViewService,
  OtherService,
  PortfolioService,
  ResourceService
} from './services';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    ArticlesService,
    AuthGuard,
    CommentsService,
    JwtService,
    ProfilesService,
    UserService,
    SessionService, 
    CarouselService,
    CategoryService, 
    SkillsService,
    Config,
    ViewService,
    OtherService,
    PortfolioService,
    ResourceService
  ],
  declarations: []
})
export class CoreModule { }
