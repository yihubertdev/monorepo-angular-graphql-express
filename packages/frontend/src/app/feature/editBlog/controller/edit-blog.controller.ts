import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { blogEditSchema } from "src/app/core/joiSchema/blog-edit.schema";
import { IBlog } from "src/app/core/models/blog.type";
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
import { BlogService } from "src/app/core/services/fireStore/blog.firestore";
import { blogEditFormList } from "src/app/core/static/post.static";
import { v4 as uuidv4 } from "uuid";

@Component({
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
export class EditBlogController implements OnInit {
  formInputList: IFormInput[] = blogEditFormList;
  blogEditSchema: any = blogEditSchema;
  public loading: boolean = false;
  constructor(
    private _router: Router,
    private blogService: BlogService,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    const i = 1;
  }

  async save(formValue: Record<string, number | string>) {
    // Get current login user
    const currentUser = this.authService.getJSON();
    if (!currentUser) {
      this.loading = false;
      this._snackBar.open(USER_LOGIN_ERROR, POP_UP_ACTION, {
        duration: POP_UP_DISMISS_DURATION,
      });
      return;
    }

    this.loading = true;
    const newBlog = {
      ...formValue,
      userId: currentUser?.uid,
    } as unknown as IBlog;

    try {
      await this.blogService.create(newBlog);
      this._router.navigateByUrl("/posts");
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
