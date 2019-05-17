import {NgModule} from "@angular/core";
import {SharedModule} from "../shared";
import { ResourcesComponent } from "../resources/resources.component";
import { ResourceComponent } from "../resource/resource.component";
import {ResourceRoutingModule} from "./resource-routing.module";
import {ArticleResolver} from "../article/article-resolver.service";

@NgModule({
    imports: [
        SharedModule,
        ResourceRoutingModule
    ],
    declarations: [ResourcesComponent, ResourceComponent],
    providers: [ArticleResolver]
})
export class ResourceModule {}