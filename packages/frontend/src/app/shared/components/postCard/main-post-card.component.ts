import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { POST } from "sources-types";
import { NgIf, NgStyle, DatePipe, NgFor } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { RouterModule } from "@angular/router";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { UserPhotoPipe } from "../../pipes/default-photo.pipe";
import { GalleryImageComponent } from "../CarouselSlider/gallery.component";

@Component({
  standalone: true,
  imports: [
    NgStyle,
    NgIf,
    NgFor,
    MatCardModule,
    RouterModule,
    DatePipe,
    UserPhotoPipe,
    MatMenuModule,
    MatButtonModule,
    GalleryImageComponent,
  ],
  selector: "main-post-card-component",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card class="m-1">
      <mat-card-header
        [routerLink]="['/users', 'profile', post.userId, 'posts']"
        class="cursor-pointer">
        <div
          mat-card-avatar
          [ngStyle]="{
            backgroundImage: 'url(' + (post.photoURL | defaultUserPhoto) + ')',
            backgroundSize: 'cover'
          }"></div>
        <mat-card-title>{{ post.displayName }}</mat-card-title>
        <mat-card-subtitle>{{
          post.createdAt | date : "yyyy-MM-dd h:mm:ss a"
        }}</mat-card-subtitle>
      </mat-card-header>

      <mat-card-content class="m-0 p-0">
        <p
          #content
          class="text-overflow-card-one"
          [innerHTML]="post.content"></p>
        <ng-container *ngIf="post.type === 'PREVIEW' || post.type === 'IMAGE'">
          <gallery-component [post]="post"></gallery-component>
        </ng-container>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ["./post-card.component.css"],
})
export class MainPostCardComponent {
  @Input({ required: true }) post!: POST.IPost;
}
