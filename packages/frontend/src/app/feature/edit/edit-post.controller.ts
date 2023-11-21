import { Component } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { blogEditSchema } from "../../core/joiSchema/blog-edit.schema";
import { IFormInput, LINK_PREVIEW, ILinkPreview } from "sources-types";
import { AuthService } from "../../core/services/fireAuth/auth";
import { PostFireStore as PostService } from "../../core/services/fireStore/blog.firestore";
import { postEditFormList } from "../../core/static/post.static";
import { IPost } from "sources-types";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { FormInputListComponent } from "../../shared/components/formInputList/form-input-list.component";
import { HomePagePostCache } from "../../core/services/cache/extend.cache";

@Component({
  standalone: true,
  providers: [AuthService],
  imports: [FormInputListComponent, HttpClientModule, MatSnackBarModule],
  selector: "edit-post-controller",
  template: ` <form-input-list-component
    [formInputList]="formInputList"
    errorLocation="EditBlogView"
    [validatorSchema]="blogEditSchema"
    buttonName="Add Blog"
    (formValue)="save($event)"
    [loading]="loading"></form-input-list-component>`,
})
export class EditPostController {
  formInputList: IFormInput[] = postEditFormList;
  blogEditSchema: any = blogEditSchema;
  public loading: boolean = false;
  private _urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  private _tranformURL(value: string) {
    return value.replace(this._urlRegex, function (url) {
      return '<a href="' + url + '" target="_blank">' + url + "</a>";
    });
  }
  private _mentionRegex = /\B@[a-z0-9_-]+/gi;
  private _transformMention(value: string) {
    return value.replace(this._mentionRegex, function (url) {
      return '<a href="/users/' + url.substring(1) + '/posts">' + url + "</a>";
    });
  }
  constructor(
    private _router: Router,
    private _postService: PostService,
    private authService: AuthService,
    private http: HttpClient,
    private _homePageCache: HomePagePostCache
  ) {}
  async save(formValue: Record<string, number | string | string[]>) {
    // Get current login user
    const currentUser = this.authService.get();
    if (!currentUser) {
      throw Error("user not exist");
    }
    const { userId, displayName, photoURL } = currentUser;
    this.loading = true;

    let content = this._tranformURL(formValue["content"] as string);
    const links = content.match(this._urlRegex);
    let preview: ILinkPreview | null = null; // firestore only accept null value.

    if (links) {
      preview = (await firstValueFrom(
        this.http.get(
          LINK_PREVIEW.LINK_PREVIEW_NET_URL +
            LINK_PREVIEW.LINK_PREVIEW_NET_KEY +
            `&q=${links[0]}`
        )
      )) as ILinkPreview;
    }

    content = this._transformMention(content);
    const newBlog = {
      ...formValue,
      content,
      preview,
      userId,
      displayName,
      photoURL,
    } as unknown as IPost;

    this._postService.create(newBlog);
    this._router.navigate(["home", "posts"]);
  }
}
