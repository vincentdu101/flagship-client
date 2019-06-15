import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
  Article,
  ArticlesService,
  Comment,
  CommentsService,
  User,
  UserService
} from '../core';

@Component({
  selector: 'app-article-page',
  templateUrl: './article.component.html',
  styleUrls: ["./article.component.css"]
})
export class ArticleComponent implements OnInit {
  article: Article;
  currentUser: User;
  canModify: boolean;
  comments: Comment[];
  commentControl = new FormControl();
  commentFormErrors = {};
  isSubmitting = false;
  isDeleting = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private commentsService: CommentsService,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
    // Retreive the prefetched article
    this.route.params.subscribe((params) => {
        this.articlesService.get(params._id).subscribe((data) => {
            this.article = data;
        });
    });

    // Load the current user's data
    // this.userService.currentUser.subscribe(
    //   (userData: User) => {
    //     this.currentUser = userData;

    //     this.canModify = (this.currentUser.username === this.article.author.username);
    //   }
    // );
  }

  deleteArticle() {
    this.isDeleting = true;

    this.articlesService.destroy(this.article._id)
      .subscribe(
        success => {
          this.router.navigateByUrl('/');
        }
      );
  }

}
