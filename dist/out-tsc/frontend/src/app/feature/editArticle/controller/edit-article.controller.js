"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditArticleController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const article_edit_schema_1 = require("src/app/core/joiSchema/article-edit.schema");
const constants_1 = require("src/app/core/models/constants");
const users_type_1 = require("src/app/core/models/users.type");
const post_static_1 = require("src/app/core/static/post.static");
let EditArticleController = class EditArticleController {
    constructor(_router, _articleFireStore, authService, _snackBar) {
        this._router = _router;
        this._articleFireStore = _articleFireStore;
        this.authService = authService;
        this._snackBar = _snackBar;
        this.formInputList = post_static_1.editArticleFormList;
        this.loading = false;
        this.validatorSchema = article_edit_schema_1.articleEditSchema;
        this.content = "";
        this.haveEditor = true;
        this.save = async (formValue) => {
            // Get current login user
            const currentUser = this.authService.getJSON();
            if (!currentUser) {
                this.loading = false;
                this._snackBar.open(users_type_1.USER_LOGIN_ERROR, constants_1.POP_UP_ACTION, {
                    duration: constants_1.POP_UP_DISMISS_DURATION,
                });
                return;
            }
            this.loading = false;
            const article = formValue;
            const newArticle = {
                userId: currentUser.uid,
                title: article.title,
                content: article.quillEditor,
            };
            try {
                await this._articleFireStore.create(newArticle);
                this._router.navigateByUrl("/posts");
                this._snackBar.open(users_type_1.ADD_ARTICLE_ERROR, constants_1.POP_UP_ACTION, {
                    duration: constants_1.POP_UP_DISMISS_DURATION,
                    horizontalPosition: "center",
                    verticalPosition: "top",
                });
                this.loading = false;
            }
            catch (err) {
                this._snackBar.open(users_type_1.ADD_BLOG_ERROR, constants_1.POP_UP_ACTION, {
                    duration: constants_1.POP_UP_DISMISS_DURATION,
                    horizontalPosition: "center",
                    verticalPosition: "top",
                });
                this.loading = false;
                return;
            }
        };
    }
};
EditArticleController = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "edit-article-controller",
        template: ` <form-input-list-component
    [formInputList]="formInputList"
    errorLocation="EditBlogView"
    [validatorSchema]="validatorSchema"
    buttonName="Add Article"
    (formValue)="save($event)"
    [haveEditor]="haveEditor"
    [loading]="loading"></form-input-list-component>`,
        styleUrls: [],
    })
], EditArticleController);
exports.EditArticleController = EditArticleController;
//# sourceMappingURL=edit-article.controller.js.map