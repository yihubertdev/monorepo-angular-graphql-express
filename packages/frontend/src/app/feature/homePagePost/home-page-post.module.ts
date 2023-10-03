import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomePagePostController } from "./controller/home-page-post.controller";
import { MatIconModule } from "@angular/material/icon";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatPaginatorModule } from "@angular/material/paginator";
import { ChatTopicPostController } from "./controller/chat-topic-post.controller";
import { MatListModule } from "@angular/material/list";
import { HomePageMainPictureController } from "./controller/main-picture.controller";
import { TopToolMenuController } from "./controller/top-toolbar.controller";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { JobsHorizonalScrollController } from "./controller/jobs-horizonal-scroll.controller";
import { QuillModule } from "ngx-quill";
import { ArticlePostControllerComponent } from "./controller/article-post.controller";
import { HomePageArticleController } from "./controller/home-page-article.controller";
import { StringTransformPipe } from "../../shared/pipes/string-tranform.pipe";
import { LinkPreviewPipe } from "../../shared/pipes/convert-link-preview.pipe";
import { PostCardComponent } from "src/app/shared/components/postCard/post-card.component";
import { ArticleCardComponent } from "../../shared/components/postCard/article-card.component";
import { CarouselSliderComponent } from "src/app/shared/components/CarouselSlider/carousel-slider.component";

@NgModule({
  declarations: [
    HomePagePostController,
    ChatTopicPostController,
    HomePageMainPictureController,
    TopToolMenuController,
    JobsHorizonalScrollController,
    ArticlePostControllerComponent,
    HomePageArticleController,
  ],
  imports: [
    PostCardComponent,
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    QuillModule,
    StringTransformPipe,
    LinkPreviewPipe,
    ArticleCardComponent,
    CarouselSliderComponent,
  ],
  exports: [
    HomePagePostController,
    HomePageArticleController,
    ChatTopicPostController,
    HomePageMainPictureController,
    TopToolMenuController,
    JobsHorizonalScrollController,
    ArticlePostControllerComponent,
  ],
})
export class HomePagePostModule {
  static forChatTopic(): ModuleWithProviders<HomePagePostModule> {
    return {
      ngModule: HomePagePostModule,
      providers: [],
    };
  }
}
