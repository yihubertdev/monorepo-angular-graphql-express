import { Component } from "@angular/core";

@Component({
  selector: "edit-blog-view",
  template: `
    <div style="width: 100vw; height: 90vh">
      <mat-grid-list
        cols="1"
        rowHeight="90vh">
        <mat-grid-tile
          colspan="1"
          rowspan="1">
          <div class="grid-tile-align-up-content">
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
