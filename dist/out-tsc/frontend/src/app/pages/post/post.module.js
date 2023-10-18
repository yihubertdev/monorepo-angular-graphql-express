"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const post_view_1 = require("./view/post.view");
const post_routing_module_1 = require("./post-routing.module");
const grid_list_1 = require("@angular/material/grid-list");
const card_1 = require("@angular/material/card");
const post_category_module_1 = require("src/app/feature/postCategory/post-category.module");
const icon_1 = require("@angular/material/icon");
const add_text_editor_module_1 = require("src/app/feature/addTextEditor/add-text-editor.module");
const progress_spinner_1 = require("@angular/material/progress-spinner");
const home_page_post_module_1 = require("src/app/feature/homePagePost/home-page-post.module");
const matGridListResponsive_module_1 = require("src/app/shared/directives/matGridListResponsive/matGridListResponsive.module");
const carousel_slider_module_1 = require("src/app/shared/components/CarouselSlider/carousel-slider.module");
const user_profile_module_1 = require("src/app/feature/userProfile/user-profile.module");
const article_view_1 = require("./view/article.view");
const ui_1 = require("ui");
let PostModule = class PostModule {
};
PostModule = tslib_1.__decorate([
    (0, core_1.NgModule)({
        declarations: [post_view_1.PostViewComponent, article_view_1.ArticleViewComponent],
        imports: [
            common_1.CommonModule,
            post_routing_module_1.PostRoutingModule,
            grid_list_1.MatGridListModule,
            card_1.MatCardModule,
            post_category_module_1.PostCategoryModule,
            icon_1.MatIconModule,
            add_text_editor_module_1.AddTextEditorModule,
            progress_spinner_1.MatProgressSpinnerModule,
            home_page_post_module_1.HomePagePostModule,
            matGridListResponsive_module_1.GridListResponsiveDirectiveModule,
            carousel_slider_module_1.CarouselSliderModule,
            user_profile_module_1.UserProfileModule,
            ui_1.UiModule,
        ],
        exports: [post_view_1.PostViewComponent, article_view_1.ArticleViewComponent],
    })
], PostModule);
exports.PostModule = PostModule;
//# sourceMappingURL=post.module.js.map