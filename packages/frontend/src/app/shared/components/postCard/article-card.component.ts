import { Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { IArticle } from "sources";
import { RouterModule } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

@Component({
  standalone: true,
  selector: "article-card-component",
  imports: [MatCardModule, MatIconModule, RouterModule],
  template: `<mat-card class="mb-3 cursor-pointer">
    <mat-card-header [routerLink]="['../', 'article', article!.id]">
      <mat-card-title-group>
        <mat-card-title>{{ article!.title }}</mat-card-title>
        <mat-card-subtitle>{{ article!.subTitle }}</mat-card-subtitle>
        <img
          mat-card-sm-image
          src="https://material.angular.io/assets/img/examples/shiba2.jpg" />
      </mat-card-title-group>
    </mat-card-header>
    <mat-card-content>
      <p
        class="text-overflow-card"
        [innerHTML]="article!.description"></p
    ></mat-card-content>
  </mat-card>`,
  styleUrls: [],
})
export class ArticleCardComponent {
  @Input({ required: true }) article?: IArticle;
}
