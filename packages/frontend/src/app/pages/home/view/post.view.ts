import { Component } from "@angular/core";

@Component({
  selector: "post-view",
  template: `
    <div
      class="container "
      style="max-width: 100% !important">
      <!-- desktop 90dvh content, mobile 10dvh category and 90dvh content-->
      <!--justify-content-center center the inner col-->
      <div class="row mb-3 justify-content-center">
        <!-- container responsive-height-container max-width-container container-overflow-vertical -->
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-sm-12">
          <home-page-post-controller
            [isPagination]="true"></home-page-post-controller>
        </div>
      </div>

      <add-text-editor-controller></add-text-editor-controller>
    </div>
  `,
  styleUrls: ["../home.style.css"],
})
export class PostViewComponent {}
