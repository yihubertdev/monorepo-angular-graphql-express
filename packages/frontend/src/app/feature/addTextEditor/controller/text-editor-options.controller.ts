import { Component, OnInit } from "@angular/core";
import { MatBottomSheetRef } from "@angular/material/bottom-sheet";
import { Router } from "@angular/router";

@Component({
  selector: "bottom-sheet-overview-example-sheet",
  template: `<mat-nav-list>
    <a mat-list-item (click)="addBlog($event)">
      <span mat-line>Add Blog</span>
      <span mat-line>Edit new blog</span>
    </a>

    <a mat-list-item (click)="addArticle($event)">
      <span mat-line>Add Article</span>
      <span mat-line>Edit new article</span>
    </a>
  </mat-nav-list>`,
})
export class TextEditorOptionsComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<TextEditorOptionsComponent>, private _router: Router) {}

  async addBlog(event: MouseEvent) {
    this._router.navigateByUrl("edit/blog");
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  async addArticle(event: MouseEvent) {
    this._router.navigateByUrl("edit/article");
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
