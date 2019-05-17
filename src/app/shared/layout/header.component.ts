import { Component, OnInit } from "@angular/core";

import { User, SessionService } from "../../core";

@Component({
  selector: "app-layout-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {

  public currentUser: User;
  public adminRole: boolean;
  public isAuthenticated: boolean;

  constructor(
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    this.sessionService.currentUser.subscribe((userData) => {
        this.currentUser = userData;
    });

    this.sessionService.isAuthenticated.subscribe((auth) => {
      this.isAuthenticated = auth;
    })

    this.sessionService.isRoleSaved.subscribe((role) => {
      this.adminRole = role;
    });
  }
}
