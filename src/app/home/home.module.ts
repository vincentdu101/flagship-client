import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import { HomeComponent } from './home.component';
import { HomeCarouselComponent } from "./home-carousel.component";
import { HomeBarGraphComponent } from "./home.bar.graph.component";
import { HomeAuthResolver } from './home-auth-resolver.service';
import { SharedModule } from '../shared';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  imports: [
    SharedModule,
    HomeRoutingModule,
    NgbModule
  ],
  declarations: [
    HomeComponent,
    HomeCarouselComponent,
    HomeBarGraphComponent
  ],
  providers: [
    HomeAuthResolver
  ]
})
export class HomeModule {}
