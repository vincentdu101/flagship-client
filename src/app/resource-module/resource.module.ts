import {NgModule} from "@angular/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../shared";

import {FroalaEditorModule, FroalaViewModule} from "angular-froala-wysiwyg";
import { ResourcesComponent } from "./resources.component";
import { ResourceComponent } from "./resource.component";
import {ResourceRoutingModule} from "./resource-routing.module";
import {ArticleResolver} from "../article/article-resolver.service";

@NgModule({
    imports: [
        SharedModule,
        ResourceRoutingModule,
        NgbModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot()
    ],
    declarations: [ResourcesComponent, ResourceComponent],
    providers: [ArticleResolver]
})
export class ResourceModule {}