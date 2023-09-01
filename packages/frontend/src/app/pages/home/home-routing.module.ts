import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeViewComponent } from "./view/home.view";
import { ArticleViewComponent } from "./view/article.view";
import { PostViewComponent } from "./view/post.view";
import { ArticlesViewComponent } from "./view/articles.view";

const routes: Routes = [
  { path: "", component: HomeViewComponent },
  { path: "article/:id", component: ArticleViewComponent },
  { path: "posts", component: PostViewComponent },
  { path: "articles", component: ArticlesViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
