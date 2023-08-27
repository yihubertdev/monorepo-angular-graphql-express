import { Component } from "@angular/core";

@Component({
  selector: "edit-blog-view",
  template: `
    <div style="width: 100vw; height: 90dvh">
      <mat-grid-list
        cols="1"
        rowHeight="90dvh">
        <mat-grid-tile
          colspan="1"
          rowspan="1">
          <div class="grid-content-up-center">
            <edit-blog-controller></edit-blog-controller>
          </div>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  styleUrls: ["../edit.style.css"],
})
export class EditBlogViewComponent {
  constructor() {}
}
