import { Component, OnInit } from "@angular/core";
import { IPostCategoryList } from "sources-types";

@Component({
  selector: "post-category-controller",
  template: `
    <mat-chip-listbox>
      <div class="new-chip-list-wrapper">
        <mat-chip *ngFor="let category of postCategoryList">
          <mat-icon>{{ category.icon }}</mat-icon>
          {{ category.number }}
        </mat-chip>
      </div>
    </mat-chip-listbox>
  `,
  styleUrls: ["../post-category.style.css"],
})
export class PostCategoryControllerComponent implements OnInit {
  postCategoryList: IPostCategoryList[];
  constructor() {
    this.postCategoryList = [];
  }

  ngOnInit() {
    this.postCategoryList = [
      {
        icon: "computer",
        number: 17,
        category: "technology",
      },
      {
        icon: "self_improvement",
        number: 2,
        category: "selfImprovement",
      },
      {
        icon: "sports_basketball",
        number: 24,
        category: "sport",
      },
      {
        icon: "sms",
        number: 24,
        category: "message",
      },
      {
        icon: "sms",
        number: 24,
        category: "message",
      },
      {
        icon: "sms",
        number: 24,
        category: "message",
      },
      {
        icon: "sms",
        number: 24,
        category: "message",
      },
      {
        icon: "sms",
        number: 24,
        category: "message",
      },
      {
        icon: "sms",
        number: 24,
        category: "message",
      },
      {
        icon: "sms",
        number: 24,
        category: "message",
      },
    ];
  }
}
