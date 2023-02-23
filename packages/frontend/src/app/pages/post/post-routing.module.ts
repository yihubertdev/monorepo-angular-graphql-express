import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostViewComponent } from "./view/post.view";
import { ArticleViewComponent } from "./view/article.view";

const routes: Routes = [
  { path: "", component: PostViewComponent },
  { path: "article/:id", component: ArticleViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
