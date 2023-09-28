import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { LINK_PREVIEW } from "sources-types";
import { ILinkPreview } from "sources-types";
@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    RouterModule,
  ],
  selector: "preview-link-card",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card
      [routerLink]="preview!.url"
      class="cursor-pointer">
      <div
        class="image-frame-rounded slide-image-cover-center image-height-responsive"
        [ngStyle]="{
          backgroundImage: 'url(' + preview!.image + ')',
        }"></div>
      <mat-card-header>
        <mat-card-title-group>
          <mat-card-subtitle
            ><a
              [href]="preview!.url"
              target="_blank"
              >{{ preview!.url }}</a
            ></mat-card-subtitle
          >
          <mat-card-title>{{ preview!.title }}</mat-card-title>
          <!--single image display-->
        </mat-card-title-group>
      </mat-card-header>
      <mat-card-content>
        <p
          #content
          class="text-overflow-card"
          [ngStyle]="{ display: '-webkit-box' }"
          [innerHTML]="preview!.description"></p>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ["./post-card.component.css"],
})
export class PreviewLinkComponent {
  @Input({ required: true }) preview?: ILinkPreview;
}
