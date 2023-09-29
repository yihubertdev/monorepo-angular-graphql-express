import { NgModule, inject } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { isUserLogin } from "../../core/services/routeGuard/index.guard";
import { EditArticleView } from "./view/edit-article.view";
import { EditBlogViewComponent } from "./view/edit-blog.view";

const routes: Routes = [
  {
    path: "",
    redirectTo: "article",
    pathMatch: "full",
  },
  {
    path: "article",
    canActivate: [isUserLogin],
    component: EditArticleView,
  },
  {
    path: "post",
    canActivate: [isUserLogin],
    component: EditBlogViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRoutingModule {}
