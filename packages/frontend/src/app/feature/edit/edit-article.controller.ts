import { Component } from "@angular/core";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { articleEditSchema } from "../../core/joiSchema/article-edit.schema";
import {
  SNACKBAR_ACTION,
  SNACKBAR_ERROR,
  IFormInput,
  IPost,
  IUser,
} from "sources-types";
import { AuthService } from "../../core/services/fireAuth/auth";
import { ArticleFireStore } from "../../core/services/fireStore/blog.firestore";
import { editArticleFormList } from "../../core/static/post.static";
import { IArticle } from "sources-types";
import { PostFireStore as PostService } from "../../core/services/fireStore/blog.firestore";
import { HttpClientModule } from "@angular/common/http";
import { FormInputListComponent } from "../../shared/components/formInputList/form-input-list.component";
import { MatDialogModule } from "@angular/material/dialog";
import { SessionStorageService } from "src/app/core/services/browserStorage/sessionStorage";

@Component({
  standalone: true,
  imports: [
    FormInputListComponent,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [AuthService],
  selector: "edit-article-controller",
  template: ` <form-input-list-component
    [formInputList]="formInputList"
    errorLocation="EditBlogView"
    [validatorSchema]="validatorSchema"
    buttonName="Add Article"
    (formValue)="save($event)"
    [haveEditor]="true"
    [loading]="loading"></form-input-list-component>`,
})
export class EditArticleController {
  public formInputList: IFormInput[] = editArticleFormList;
  public loading: boolean = false;
  public validatorSchema = articleEditSchema;
  public content: string = "";

  constructor(
    private _router: Router,
    private _articleFireStore: ArticleFireStore,
    private _postService: PostService,
    private _sessionStorage: SessionStorageService
  ) {}

  public save = async (formValue: Record<string, string | number>) => {
    // Get current login user
    const currentUser = this._sessionStorage.getSessionStorage<IUser>("user")!;
    const { title, subTitle, description, quillEditor } = formValue;

    this.loading = false;
    const newArticle = {
      title,
      subTitle,
      description,
      content: quillEditor,
      userId: currentUser.userId,
    } as IArticle;

    const articleId = this._articleFireStore.create({ document: newArticle });

    this._postService.create({
      document: {
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
      } as unknown as IPost,
    });
    this._router.navigate(["home", "posts"]);
  };
}
