import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostViewComponent } from "./view/post.view";
import { PostRoutingModule } from "./post-routing.module";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { PostCategoryModule } from "src/app/feature/postCategory/post-category.module";
import { MatIconModule } from "@angular/material/icon";
import { AddTextEditorModule } from "src/app/feature/addTextEditor/add-text-editor.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { HomePagePostModule } from "src/app/feature/homePagePost/home-page-post.module";
import { GridListResponsiveDirectiveModule } from "src/app/shared/directives/matGridListResponsive/matGridListResponsive.module";
import { CarouselSliderModule } from "src/app/shared/components/CarouselSlider/carousel-slider.module";
import { UserProfileModule } from "src/app/feature/userProfile/user-profile.module";
import { ArticleViewComponent } from "./view/article.view";

@NgModule({
  declarations: [PostViewComponent, ArticleViewComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    MatGridListModule,
    MatCardModule,
    PostCategoryModule,
    MatIconModule,
    AddTextEditorModule,
    MatProgressSpinnerModule,
    HomePagePostModule,
    GridListResponsiveDirectiveModule,
    CarouselSliderModule,
    UserProfileModule,
  ],
  exports: [PostViewComponent, ArticleViewComponent],
})
export class PostModule {}
