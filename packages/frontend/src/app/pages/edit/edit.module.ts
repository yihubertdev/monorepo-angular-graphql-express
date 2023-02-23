import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditRoutingModule } from "./edit-routing.module";
import { EditBlogViewComponent } from "./view/edit-blog.view";
import { MatGridListModule } from "@angular/material/grid-list";
import { EditBlogModule } from "src/app/feature/editBlog/edit-blog.module";
import { EditArticleModule } from "src/app/feature/editArticle/edit-article.module";
import { EditArticleView } from "./view/edit-article.view";

@NgModule({
  declarations: [EditBlogViewComponent, EditArticleView],
  imports: [CommonModule, EditRoutingModule, MatGridListModule, EditBlogModule, EditArticleModule],
  exports: [EditBlogViewComponent, EditArticleView],
})
export class EditModule {}
