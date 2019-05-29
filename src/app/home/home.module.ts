import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatGridListModule} from "@angular/material";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import { HomeComponent } from './home.component';
import { HomeCarouselComponent } from "./home-carousel.component";
import { HomeBarGraphComponent } from "./home.bar.graph.component";
import { HomeCardCarouselComponent } from "./home.card.carousel.component";
import { HomeProfileComponent } from "./home.profile.component";
import { HomeGridComponent } from "./home.grid.component";
import { HomeAuthResolver } from './home-auth-resolver.service';
import { SharedModule } from '../shared';
import { HomeRoutingModule } from './home-routing.module';
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    HomeRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatGridListModule,
    FlexLayoutModule
  ],
  declarations: [
    HomeComponent,
    HomeCarouselComponent,
    HomeBarGraphComponent,
    HomeCardCarouselComponent,
    HomeGridComponent,
    HomeProfileComponent
  ],
  providers: [
    HomeAuthResolver
  ]
})
export class HomeModule {}
