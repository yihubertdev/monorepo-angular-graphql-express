import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
  OnInit,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { LINK_PREVIEW } from "sources-types";

export interface ILinkPreview {
  description: string;
  image: string;
  title: string;
  url: string;
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
  ],
  selector: "preview-link-card",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card *ngIf="preview">
      <mat-card-header>
        <mat-card-title-group>
          <mat-card-subtitle
            ><a
              [href]="url"
              target="_blank"
              >{{ preview.url }}</a
            ></mat-card-subtitle
          >

          <mat-card-title>{{ preview.title }}</mat-card-title>
          <img
            mat-card-lg-image
            [src]="preview.image" />
        </mat-card-title-group>
      </mat-card-header>
      <mat-card-content>
        <p
          #content
          class="text-overflow-card"
          [ngStyle]="{ display: '-webkit-box' }"
          [innerHTML]="preview.description"></p>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ["./post-card.component.css"],
})
export class PreviewLinkComponent implements OnInit {
  @Input() url?: string;

  public preview?: ILinkPreview;
  public isShowMore: boolean = false;
  constructor(private http: HttpClient, private ref: ChangeDetectorRef) {
    ref.detach();
  }

  ngOnInit(): void {
    if (!this.url) return;
    this.http
      .get(
        LINK_PREVIEW.LINK_PREVIEW_NET_URL +
          LINK_PREVIEW.LINK_PREVIEW_NET_KEY +
          `&q=${this.url}`
      )
      .subscribe({
        next: (data: any) => {
          this.preview = data;
          this.ref.detectChanges();
        },
      });
  }
}
