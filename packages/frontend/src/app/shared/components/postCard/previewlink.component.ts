import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterModule } from "@angular/router";
import { ILinkPreview } from "sources-types";
import { IsFullLinkPipe } from "../../pipes/convert-link-preview.pipe";
@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    RouterModule,
    IsFullLinkPipe,
    RouterModule,
  ],
  selector: "preview-link-card",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card (click)="redirect(preview!.url)">
      <div
        *ngIf="preview!.image"
        class="image-frame-rounded slide-image-cover-center image-height-responsive"
        [ngStyle]="{
          backgroundImage: 'url(' + preview!.image + ')',
        }"></div>
      <mat-card-header>
        <mat-card-title-group>
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
  private _urlRegex =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  @Input({ required: true }) preview?: ILinkPreview;
  constructor(private _router: Router) {}

  ngOnInit(): void {
    const i = 1;
  }

  redirect(url: string) {
    console.log(url);
    url.match(this._urlRegex)
      ? window.open(url, "_blank")
      : this._router.navigateByUrl(url);
  }
}
