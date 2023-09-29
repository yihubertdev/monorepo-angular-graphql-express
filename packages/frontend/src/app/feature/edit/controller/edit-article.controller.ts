import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { articleEditSchema } from "src/app/core/joiSchema/article-edit.schema";
import {
  SNACKBAR_ACTION,
  SNACKBAR_ERROR,
  IFormInput,
  IPost,
} from "sources-types";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { ArticleFireStore } from "src/app/core/services/fireStore/blog.firestore";
import { editArticleFormList } from "src/app/core/static/post.static";
import { IArticle } from "sources-types";
import { PostFireStore as PostService } from "src/app/core/services/fireStore/blog.firestore";

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
  private _extractImageRex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;

  constructor(
    private _router: Router,
    private _articleFireStore: ArticleFireStore,
    private _postService: PostService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  public save = async (formValue: Record<string, string | number>) => {
    // Get current login user
    const currentUser = this.authService.get();
    if (!currentUser) {
      this.loading = false;
      this._snackBar.open(
        SNACKBAR_ERROR.USER_LOGIN_ERROR,
        SNACKBAR_ACTION.POP_UP_ACTION,
        {
          duration: SNACKBAR_ACTION.POP_UP_DISMISS_DURATION as number,
        }
      );
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
      const articleId = await this._articleFireStore.create(newArticle);

      await this._postService.create({
        userId: currentUser.userId,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
        content: "I published a article:",
        preview: {
          description: description as string,
          image: null,
          title: title,
          url: "/home/article/" + articleId,
        },
      } as unknown as IPost);
      this._router.navigate(["home", "posts"]);
    } catch (err) {
      console.log(err);
      this._snackBar.open(
        SNACKBAR_ERROR.ADD_BLOG_ERROR,
        SNACKBAR_ACTION.POP_UP_ACTION,
        {
          duration: SNACKBAR_ACTION.POP_UP_DISMISS_DURATION as number,
          horizontalPosition: "center",
          verticalPosition: "top",
        }
      );
      this.loading = false;
      return;
    }
  };
}
