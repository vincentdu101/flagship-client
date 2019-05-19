import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {ResourceComponent} from "./resource.component";
import {ResourcesComponent} from "./resources.component";
import {CreateResourceComponent} from "./create.resource.component";
import {ArticleResolver} from "../article/article-resolver.service";

const routes: Routes = [
    {
        path: ":_id",
        component: ResourceComponent,
        resolve: {
            article: ArticleResolver
        }
    },
    {
        path: "",
        component: ResourcesComponent,
        children: [
            {
                path: ":new",
                component: CreateResourceComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResourceRoutingModule {}