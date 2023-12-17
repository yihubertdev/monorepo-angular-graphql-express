import { Component } from "@angular/core";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { blogEditSchema } from "../../core/joiSchema";
import { LINK_PREVIEW, IUser } from "sources-types";
import { AuthService } from "../../core/services/fireAuth/auth";
import { PostFireStore as PostService } from "../../core/services/fireStore/blog.firestore";
import { POST } from "sources-types";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { FormInputListComponent } from "../../shared/components/formInputList/form-input-list.component";
import { SessionStorageService } from "src/app/core/services/browserStorage/sessionStorage";
import { POST_EDIT_FORM } from "src/app/core/static/form.static";

@Component({
  standalone: true,
  providers: [AuthService],
  imports: [FormInputListComponent, HttpClientModule, MatSnackBarModule],
  selector: "edit-post-controller",
  template: ` <h5 class="mt-4 mb-4">Share Yourself</h5>
    <form-input-list-component
      [list]="list"
      [schema]="blogEditSchema"
      buttonName="Add Post"
      (formValue)="save($event)"
      [loading]="loading"></form-input-list-component>`,
})
export class EditPostController {
  list = POST_EDIT_FORM;
  blogEditSchema: any = blogEditSchema;
  public loading: boolean = false;
  private _urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  private _transformURL(value: string) {
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

  private _videoRegex =
    /^(?:https?:\/\/)?(?:(?:www\.)?youtube.com\/watch\?v=|youtu.be\/)(\w+)$/;

  private _videoRegexS =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  private _getVideoId(value: string): RegExpMatchArray | null {
    const match = value.match(this._videoRegex);
    return match ?? value.match(this._videoRegexS);
  }
  constructor(
    private _router: Router,
    private _postService: PostService,
    private http: HttpClient,
    private _sessionStorage: SessionStorageService
  ) {}
  async save(formValue: Record<string, string | number | string[]>) {
    this.loading = true;
    let { content, image } = formValue as { content: string; image: string[] };
    // Get current login user
    const currentUser = this._sessionStorage.getSessionStorage<IUser>("user")!;

    const { userId } = currentUser;
    content = this._transformMention(content);
    if (image.length) {
      await this._postService.create({
        document: this._postService.serializer({
          type: POST.POST_TYPE.IMAGE,
          image,
          content,
          userId,
        }),
      });
      this._router.navigate(["home", "posts"]);
      return;
    }

    content = this._transformURL(content);
    const links = content.match(this._urlRegex);
    if (links) {
      const preview = (await firstValueFrom(
        this.http.get(
          LINK_PREVIEW.LINK_PREVIEW_NET_URL +
            LINK_PREVIEW.LINK_PREVIEW_NET_KEY +
            `&q=${links[0]}`
        )
      )) as {
        image: string;
        description: string;
        title: string;
        url: string;
      };

      await this._postService.create({
        document: this._postService.serializer({
          ...preview,
          image: [preview.image],
          type: POST.POST_TYPE.PREVIEW,
          content,
          userId,
        }),
      });
      this._router.navigate(["home", "posts"]);
      return;
    }

    const videoId = this._getVideoId(content);
    if (videoId) {
      await this._postService.create({
        document: this._postService.serializer({
          ...formValue,
          video: videoId[1],
          type: POST.POST_TYPE.VIDEO,
          content,
          userId,
        }),
      });
      this._router.navigate(["home", "posts"]);
      return;
    }

    await this._postService.create({
      document: this._postService.serializer({
        ...formValue,
        type: POST.POST_TYPE.TEXT,
        content,
        userId,
      }),
    });
    this._router.navigate(["home", "posts"]);
    return;
  }
}
