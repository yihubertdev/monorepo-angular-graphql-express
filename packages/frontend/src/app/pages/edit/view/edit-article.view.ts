import { Component } from "@angular/core";

@Component({
  selector: "post-view",
  template: `
    <div style="width: 80vw; height: 90dvh">
      <mat-grid-list
        cols="1"
        rowHeight="90dvh">
        <mat-grid-tile
          colspan="1"
          rowspan="1">
          <div class="grid-tile-align-up-center-content">
            <edit-article-controller></edit-article-controller>
          </div>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  styleUrls: ["../edit.style.css"],
})
export class EditArticleView {
  constructor() {}
}
