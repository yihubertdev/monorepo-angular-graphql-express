import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeViewComponent } from "./view/home.view";
import { PostRoutingModule } from "./home-routing.module";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { PostCategoryModule } from "src/app/feature/postCategory/post-category.module";
import { MatIconModule } from "@angular/material/icon";
import { AddTextEditorModule } from "src/app/feature/addTextEditor/add-text-editor.module";
import { HomePagePostModule } from "src/app/feature/homePagePost/home-page-post.module";
import { GridListResponsiveDirectiveModule } from "src/app/shared/directives/matGridListResponsive/matGridListResponsive.module";
import { CarouselSliderModule } from "src/app/shared/components/CarouselSlider/carousel-slider.module";
import { UserProfileModule } from "src/app/feature/userProfile/user-profile.module";
import { ArticleViewComponent } from "./view/article.view";
import { PostViewComponent } from "./view/post.view";
import { MatButtonModule } from "@angular/material/button";
import { ArticlesViewComponent } from "./view/articles.view";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    HomeViewComponent,
    ArticleViewComponent,
    PostViewComponent,
    ArticlesViewComponent,
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    MatGridListModule,
    MatCardModule,
    PostCategoryModule,
    MatIconModule,
    AddTextEditorModule,
    MatProgressBarModule,
    HomePagePostModule,
    GridListResponsiveDirectiveModule,
    CarouselSliderModule,
    UserProfileModule,
    MatButtonModule,
  ],
  exports: [
    HomeViewComponent,
    ArticleViewComponent,
    PostViewComponent,
    ArticlesViewComponent,
  ],
})
export class PostModule {}
