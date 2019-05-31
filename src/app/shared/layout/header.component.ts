import { Component, OnInit } from "@angular/core";

import { User, SessionService } from "../../core";

@Component({
  selector: "app-layout-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {

  public currentUser: User;
  public adminRole: boolean;
  public isAuthenticated: boolean;
  public isHome: boolean;
  public isNavbarCollapsed = true;

  constructor(
    private sessionService: SessionService
  ) {
  }

  ngOnInit() {
    this.isHome = window.location.pathname === "/";
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

  public updateIsHome(home: boolean): void {
    this.isHome = home;
  }

  public scrollView(id: string): void {
    let element = document.getElementById("home-" + id + "-scroll");
    element.scrollIntoView({
      behavior: "smooth", block: "start", inline: "nearest"
    });
  }
}
