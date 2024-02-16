// import { NgIf, NgStyle } from "@angular/common";
// import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
// import { MatButtonModule } from "@angular/material/button";
// import { MatCardModule } from "@angular/material/card";
// import { Router, RouterModule } from "@angular/router";
// import { LINK_PREVIEW } from "sources";

// @Component({
//   standalone: true,
//   imports: [NgIf, NgStyle, MatButtonModule, MatCardModule, RouterModule],
//   selector: "preview-link-card",
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   template: `
//     <mat-card (click)="redirect(preview!.url)">
//       <div
//         class="image-frame-rounded slide-image-cover-center image-height-responsive"
//         *ngIf="preview.image"
//         [ngStyle]="{
//           backgroundImage: 'url(' + preview.image + ')',
//         }"></div>
//       <mat-card-header>
//         <mat-card-title-group>
//           <mat-card-title>{{ preview.title }}</mat-card-title>
//           <!--single image display-->
//         </mat-card-title-group>
//       </mat-card-header>
//       <mat-card-content>
//         <p
//           #content
//           class="text-overflow-card"
//           [ngStyle]="{ display: '-webkit-box' }"
//           [innerHTML]="preview.description"></p>
//       </mat-card-content>
//     </mat-card>
//   `,
//   styleUrls: ["./post-card.component.css"],
// })
// export class PreviewLinkComponent {
//   private _urlRegex =
//     /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
//   @Input({ required: true }) preview!: LINK_PREVIEW;
//   constructor(private _router: Router) {}

//   redirect(url: string) {
//     url.match(this._urlRegex)
//       ? window.open(url, "_blank")
//       : this._router.navigateByUrl(url);
//   }
// }
