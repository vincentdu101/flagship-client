import {NgModule} from "@angular/core";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../shared";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AngularEditorModule} from "@kolkov/angular-editor";
import { ResourcesComponent } from "./resources.component";
import { ResourceComponent } from "./resource.component";
import {ResourceRoutingModule} from "./resource-routing.module";
import {ArticleResolver} from "../article/article-resolver.service";

@NgModule({
    imports: [
        SharedModule,
        ResourceRoutingModule,
        NgbModule,
        HttpClientModule,
        AngularEditorModule,
        FormsModule, 
        ReactiveFormsModule
    ],
    declarations: [ResourcesComponent, ResourceComponent],
    providers: [ArticleResolver]
})
export class ResourceModule {}