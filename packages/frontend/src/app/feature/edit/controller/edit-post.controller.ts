import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { blogEditSchema } from "src/app/core/joiSchema/blog-edit.schema";
import {
  POP_UP_ACTION,
  POP_UP_DISMISS_DURATION,
} from "src/app/core/models/constants";
import {
  ADD_BLOG_ERROR,
  USER_LOGIN_ERROR,
} from "src/app/core/models/users.type";
import { IFormInput } from "src/app/core/models/view.types";
import { AuthService } from "src/app/core/services/fireAuth/auth";
import { PostFireStore as PostService } from "src/app/core/services/fireStore/blog.firestore";
import { postEditFormList } from "src/app/core/static/post.static";
import { IPost } from "blog";

@Component({
  selector: "edit-blog-controller",
  template: ` <form-input-list-component
    [formInputList]="formInputList"
    errorLocation="EditBlogView"
    [validatorSchema]="blogEditSchema"
    buttonName="Add Blog"
    (formValue)="save($event)"
    [loading]="loading"></form-input-list-component>`,
  styleUrls: ["../edit.style.css"],
})
export class EditPostController implements OnInit {
  formInputList: IFormInput[] = postEditFormList;
  blogEditSchema: any = blogEditSchema;
  public loading: boolean = false;
  constructor(
    private _router: Router,
    private _postService: PostService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    const i = 1;
  }

  async save(formValue: Record<string, number | string | string[]>) {
    // Get current login user
    const currentUser = this.authService.get();
    if (!currentUser) {
      this._snackBar.open(USER_LOGIN_ERROR, POP_UP_ACTION, {
        duration: POP_UP_DISMISS_DURATION,
        horizontalPosition: "center",
        verticalPosition: "top",
      });
      this.loading = false;
      return;
    }
    const { uid, displayName, photoURL } = currentUser;
    this.loading = true;
    const newBlog = {
      ...formValue,
      userId: uid,
      displayName,
      photoURL,
    } as unknown as IPost;

    try {
      await this._postService.create(newBlog);
      this._router.navigate(["home", "posts"]);
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
  }
}
