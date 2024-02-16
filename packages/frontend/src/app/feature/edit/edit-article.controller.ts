import { Component } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { articleEditSchema } from "../../core/joiSchema";
import { IUser } from "sources";
import { AuthService } from "../../core/services/fireAuth/auth";
import { ArticleFireStore } from "../../core/services/fireStore/blog.firestore";
import { IArticle } from "sources";
import { PostFireStore as PostService } from "../../core/services/fireStore/blog.firestore";
import { HttpClientModule } from "@angular/common/http";
import { FormInputListComponent } from "../../shared/components/formInputList/form-input-list.component";
import { MatDialogModule } from "@angular/material/dialog";
import { SessionStorageService } from "src/app/core/services/browserStorage/sessionStorage";
import { EDIT_ARTICLE_FORM } from "src/app/core/static/form.static";
import { POST } from "sources";

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
    [list]="list"
    [schema]="validatorSchema"
    buttonName="Add Article"
    (formValue)="save($event)"
    [haveEditor]="true"
    [loading]="loading"></form-input-list-component>`,
})
export class EditArticleController {
  public list = EDIT_ARTICLE_FORM;
  public loading: boolean = false;
  public validatorSchema = articleEditSchema;
  public content: string = "";

  constructor(
    private _router: Router,
    private _articleFireStore: ArticleFireStore,
    private _postService: PostService,
    private _sessionStorage: SessionStorageService
  ) {}

  public save = async (
    formValue: Record<string, boolean | string | number | string[]>
  ) => {
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
      document: this._postService.serializer({
        type: POST.POST_TYPE.PREVIEW,
        userId: currentUser.userId,
        content: "I published a article:",
        description: description as string,
        image: [""],
        title: title as string,
        url: "/home/article/" + articleId,
      }),
    });
    this._router.navigate(["home", "posts"]);
  };
}
