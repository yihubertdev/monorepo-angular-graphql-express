import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GuardServiceModule } from "src/app/core/services/routeGuard/guard.module";
import { UserGuardService } from "src/app/core/services/routeGuard/user.guard";
import { EditArticleView } from "./view/edit-article.view";
import { EditBlogViewComponent } from "./view/edit-blog.view";

const routes: Routes = [
  {
    path: "",
    redirectTo: "me",
    pathMatch: "full",
  },
  { path: "article", canActivate: [UserGuardService], component: EditArticleView },
  { path: "blog", canActivate: [UserGuardService], component: EditBlogViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), GuardServiceModule],
  exports: [RouterModule],
})
export class EditRoutingModule {}
