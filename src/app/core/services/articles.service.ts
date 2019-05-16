import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Article, ArticleListConfig } from '../models';
import { map } from 'rxjs/operators';
import { CATEGORIES } from './config';

@Injectable()
export class ArticlesService {
  constructor (
    private apiService: ApiService
  ) {}

  query(config: ArticleListConfig): Observable<Article[]> {
    // Convert any filters over to Angular's URLSearchParams
    const params = {};

    // Object.keys(config.filters)
    // .forEach((key) => {
    //   params[key] = config.filters[key];
    // });

    return this.apiService
    .get(
      '/articles' + ((config.type === 'feed') ? '/feed' : ''),
      new HttpParams({ fromObject: params })
    );
  }

  get(_id): Observable<Article> {
    return this.apiService.get('/articles/' + _id)
      .pipe();
  }

  destroy(_id) {
    return this.apiService.delete('/articles/' + _id);
  }

  save(article): Observable<Article> {
    // If we're updating an existing article
    if (article._id) {
      return this.apiService.put('/articles/' + article._id, {article: article})
        .pipe(map(data => data.article));

    // Otherwise, create a new article
    } else {
      return this.apiService.post('/articles/', {article: article})
        .pipe(map(data => data.article));
    }
  }

  favorite(_id): Observable<Article> {
    return this.apiService.post('/articles/' + _id + '/favorite');
  }

  unfavorite(_id): Observable<Article> {
    return this.apiService.delete('/articles/' + _id + '/favorite');
  }

  findByCategory(category: CATEGORIES): Observable<Article[]> {
    return this.apiService.get("/articles?category=" + category);
  }


}
