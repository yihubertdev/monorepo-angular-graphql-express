"use strict";
var HomePagePostModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePagePostModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const home_page_post_controller_1 = require("./controller/home-page-post.controller");
const icon_1 = require("@angular/material/icon");
const grid_list_1 = require("@angular/material/grid-list");
const card_1 = require("@angular/material/card");
const paginator_1 = require("@angular/material/paginator");
const chat_topic_post_controller_1 = require("./controller/chat-topic-post.controller");
const list_1 = require("@angular/material/list");
const main_picture_controller_1 = require("./controller/main-picture.controller");
const top_toolbar_controller_1 = require("./controller/top-toolbar.controller");
const toolbar_1 = require("@angular/material/toolbar");
const button_1 = require("@angular/material/button");
const jobs_horizonal_scroll_controller_1 = require("./controller/jobs-horizonal-scroll.controller");
const ngx_quill_1 = require("ngx-quill");
const article_post_controller_1 = require("./controller/article-post.controller");
let HomePagePostModule = HomePagePostModule_1 = class HomePagePostModule {
    static forChatTopic() {
        return {
            ngModule: HomePagePostModule_1,
            providers: [],
        };
    }
};
HomePagePostModule = HomePagePostModule_1 = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [
            home_page_post_controller_1.HomePagePostController,
            chat_topic_post_controller_1.ChatTopicPostController,
            main_picture_controller_1.HomePageMainPictureController,
            top_toolbar_controller_1.TopToolMenuController,
            jobs_horizonal_scroll_controller_1.JobsHorizonalScrollController,
            article_post_controller_1.ArticlePostControllerComponent,
        ],
        imports: [
            common_1.CommonModule,
            grid_list_1.MatGridListModule,
            card_1.MatCardModule,
            icon_1.MatIconModule,
            paginator_1.MatPaginatorModule,
            list_1.MatListModule,
            toolbar_1.MatToolbarModule,
            button_1.MatButtonModule,
            ngx_quill_1.QuillModule,
        ],
        exports: [
            home_page_post_controller_1.HomePagePostController,
            chat_topic_post_controller_1.ChatTopicPostController,
            main_picture_controller_1.HomePageMainPictureController,
            top_toolbar_controller_1.TopToolMenuController,
            jobs_horizonal_scroll_controller_1.JobsHorizonalScrollController,
            article_post_controller_1.ArticlePostControllerComponent,
        ],
    })
], HomePagePostModule);
exports.HomePagePostModule = HomePagePostModule;
//# sourceMappingURL=home-page-post.module.js.map