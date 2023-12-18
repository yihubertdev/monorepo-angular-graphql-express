import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from "@angular/core";
import { POST } from "sources-types";
import { postCardMenu } from "../../../core/static/menu.static";
import { PostFireStore } from "../../../core/services/fireStore/blog.firestore";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { EMBED_YOUTUBE } from "sources-types";
import { NgIf, NgStyle, DatePipe, NgFor } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { UserPhotoPipe } from "../../pipes/default-photo.pipe";
import { ImagesComponent } from "../CarouselSlider/images.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { RemoveSettingCategoryDialog } from "../../dialog/remove-setting-category.dialog";
import { MatDividerModule } from "@angular/material/divider";

@Component({
  standalone: true,
  imports: [
    NgStyle,
    NgIf,
    NgFor,
    DatePipe,
    MatCardModule,
    MatIconModule,
    RouterModule,
    UserPhotoPipe,
    MatMenuModule,
    MatButtonModule,
    ImagesComponent,
    MatDialogModule,
    MatDividerModule,
  ],
  selector: "post-card-component",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card class="mt-2">
      <mat-card-header>
        <mat-card-subtitle>{{
          postCardInfo.createdAt | date : "yyyy-MM-dd h:mm:ss a"
        }}</mat-card-subtitle>
        <button
          mat-icon-button
          [matMenuTriggerFor]="menu"
          aria-label="Example icon-button with a menu"
          style="margin-left: auto;"
          *ngIf="isMe">
          <mat-icon>more_vert</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
          <button
            mat-menu-item
            *ngFor="let post of postCardMenu"
            (click)="submit(post.link)">
            <mat-icon>{{ post.iconName }}</mat-icon>
            <span>{{ post.description }}</span>
          </button>
        </mat-menu>
      </mat-card-header>

      <mat-card-content>
        <!--content-->
        <p
          #content
          class="text-overflow-card"
          [ngStyle]="{ display: isShowMore ? 'block' : '-webkit-box' }"
          [innerHTML]="postCardInfo.content"></p>
        <p
          *ngIf="content.scrollHeight > 100"
          class="cursor-pointer"
          (click)="isShowMore = !isShowMore"
          style="text-align: right; z-index: 9;">
          {{ isShowMore ? "Show Less" : "Show More" }}
        </p>

        <ng-container *ngIf="postCardInfo.type === 'PREVIEW'">
          <a
            class="unset-tag-a"
            [href]="postCardInfo.url"
            target="_blank"
            ><mat-divider></mat-divider>
            <h5
              class="mt-2 text-overflow-card"
              style="display: -webkit-box;"
              [innerHTML]="postCardInfo.title"></h5>
            <p
              class="text-overflow-card"
              style="display: -webkit-box;"
              [innerHTML]="postCardInfo.description"></p
          ></a>
        </ng-container>

        <images-component
          *ngIf="
            postCardInfo.type === 'PREVIEW' || postCardInfo.type === 'IMAGE'
          "
          [images]="postCardInfo.image"></images-component>

        <!--single video display-->
        <iframe
          *ngIf="postCardInfo.type === 'VIDEO'"
          [src]="videoByPass(postCardInfo.video)"
          frameborder="0"
          allowfullscreen=""
          class="video-frame-center image-height-responsive"></iframe>

        <!-- <image-slider-component
          [images]="postCardInfo?.image ?? []"></image-slider-component> -->
        <!--multiple image display-->
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ["./post-card.component.css"],
})
export class PostCardComponent {
  @Input({ required: true }) postCardInfo!: POST.IPost;
  @Input() isUserProfile: boolean = false;
  @Input() isMe: boolean = false;
  @ViewChild("content", { static: true }) input?: ElementRef;

  public postCardMenu = postCardMenu;
  public isShowMore: boolean = false;
  public safeSrc: SafeResourceUrl | null = null;
  public images: any;
  constructor(
    public dialog: MatDialog,
    private _PostService: PostFireStore,
    private _domSanitizer: DomSanitizer
  ) {}

  identify(index: number, link: string) {
    return link;
  }

  videoByPass(videoUrl: string) {
    return this._domSanitizer.bypassSecurityTrustResourceUrl(
      `${EMBED_YOUTUBE.EMBED_YOUTUBE_URL}${videoUrl}`
    );
  }
  submit(link: string | string[], data?: any) {
    switch (link) {
      case "delete": {
        if (this.postCardInfo) {
          const dialogRef = this.dialog.open(RemoveSettingCategoryDialog, {
            disableClose: true,
            data: {
              title: "post",
              documentId: this.postCardInfo.id,
            },
          });

          dialogRef.afterClosed().subscribe(async (result) => {
            if (!result) return;
            this._PostService.deletePost(
              this.postCardInfo!.userId,
              result.documentId
            );

            throw new Error("post deleted");
          });
        }

        break;
      }
      case "pin": {
        if (this.postCardInfo) {
          this._PostService.updateByUserId({
            userId: this.postCardInfo!.userId,
            document: {
              pin: true,
            },
          });
        }
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }
}
