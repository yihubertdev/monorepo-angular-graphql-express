import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditRoutingModule } from "./edit-routing.module";
import { EditBlogViewComponent } from "./view/edit-blog.view";
import { MatGridListModule } from "@angular/material/grid-list";
import { EditArticleView } from "./view/edit-article.view";
import { EditControllerModule } from "src/app/feature/edit/edit.module";

@NgModule({
  declarations: [EditBlogViewComponent, EditArticleView],
  imports: [
    CommonModule,
    EditRoutingModule,
    MatGridListModule,
    EditControllerModule,
  ],
  exports: [EditBlogViewComponent, EditArticleView],
})
export class EditModule {}
