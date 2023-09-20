import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { articleEditSchema } from "src/app/core/joiSchema/article-edit.schema";
import {
  ADD_ARTICLE_ERROR,
  ADD_BLOG_ERROR,
  USER_LOGIN_ERROR,
  POP_UP_ACTION,
  POP_UP_DISMISS_DURATION,
  IFormInput,
} from "sources-types";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { ArticleFireStore } from "src/app/core/services/fireStore/blog.firestore";
import { editArticleFormList } from "src/app/core/static/post.static";
import { IArticle } from "sources-types";

@Component({
  selector: "edit-article-controller",
  template: ` <form-input-list-component
    [formInputList]="formInputList"
    errorLocation="EditBlogView"
    [validatorSchema]="validatorSchema"
    buttonName="Add Article"
    (formValue)="save($event)"
    [haveEditor]="true"
    [loading]="loading"></form-input-list-component>`,
  styleUrls: [],
})
export class EditArticleController {
  public formInputList: IFormInput[] = editArticleFormList;
  public loading: boolean = false;
  public validatorSchema = articleEditSchema;
  public content: string = "";

  constructor(
    private _router: Router,
    private _articleFireStore: ArticleFireStore,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  public save = async (formValue: Record<string, number | string>) => {
    // Get current login user
    const currentUser = this.authService.get();
    if (!currentUser) {
      this.loading = false;
      this._snackBar.open(USER_LOGIN_ERROR, POP_UP_ACTION, {
        duration: POP_UP_DISMISS_DURATION,
      });
      return;
    }
    const { title, subTitle, description, quillEditor } = formValue;

    this.loading = false;
    const newArticle = {
      title,
      subTitle,
      description,
      content: quillEditor,
      userId: currentUser.userId,
    } as IArticle;

    try {
      await this._articleFireStore.create(newArticle);
      this._router.navigate(["posts"]);
      this._snackBar.open(ADD_ARTICLE_ERROR, POP_UP_ACTION, {
        duration: POP_UP_DISMISS_DURATION,
        horizontalPosition: "center",
        verticalPosition: "top",
      });
      this.loading = false;
    } catch (err) {
      this._snackBar.open(ADD_BLOG_ERROR, POP_UP_ACTION, {
        duration: POP_UP_DISMISS_DURATION,
        horizontalPosition: "center",
        verticalPosition: "top",
      });
      this.loading = false;
      return;
    }
  };
}
