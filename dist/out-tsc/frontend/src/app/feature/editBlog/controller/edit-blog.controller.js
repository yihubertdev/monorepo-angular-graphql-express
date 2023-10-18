"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditBlogController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
const blog_edit_schema_1 = require("src/app/core/joiSchema/blog-edit.schema");
const constants_1 = require("src/app/core/models/constants");
const users_type_1 = require("src/app/core/models/users.type");
const post_static_1 = require("src/app/core/static/post.static");
let EditBlogController = class EditBlogController {
    constructor(_router, blogService, authService, _snackBar) {
        this._router = _router;
        this.blogService = blogService;
        this.authService = authService;
        this._snackBar = _snackBar;
        this.formInputList = post_static_1.blogEditFormList;
        this.blogEditSchema = blog_edit_schema_1.blogEditSchema;
        this.loading = false;
    }
    ngOnInit() {
        const i = 1;
    }
    async save(formValue) {
        // Get current login user
        const currentUser = this.authService.getJSON();
        if (!currentUser) {
            this.loading = false;
            this._snackBar.open(users_type_1.USER_LOGIN_ERROR, constants_1.POP_UP_ACTION, {
                duration: constants_1.POP_UP_DISMISS_DURATION,
            });
            return;
        }
        this.loading = true;
        const newBlog = {
            ...formValue,
            userId: currentUser?.uid,
        };
        try {
            await this.blogService.create(newBlog);
            this._router.navigateByUrl("/posts");
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
    }
};
EditBlogController = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "edit-blog-controller",
        template: ` <form-input-list-component
    [formInputList]="formInputList"
    errorLocation="EditBlogView"
    [validatorSchema]="blogEditSchema"
    buttonName="Add Blog"
    (formValue)="save($event)"
    [loading]="loading"></form-input-list-component>`,
        styleUrls: ["../edit-blog.style.css"],
    })
], EditBlogController);
exports.EditBlogController = EditBlogController;
//# sourceMappingURL=edit-blog.controller.js.map