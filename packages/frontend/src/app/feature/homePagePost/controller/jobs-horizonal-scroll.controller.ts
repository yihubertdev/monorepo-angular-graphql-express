import { Component, OnInit } from "@angular/core";
import { IArticle } from "blog";
import { ArticleFireStore } from "src/app/core/services/fireStore/blog.firestore";

@Component({
  selector: "jobs-horizonal-scroll-controller",
  template: `
    <div class="horizonal-scroll-section">
      <mat-card class="horizonal-scroll-card">
        <mat-card-header>
          <mat-card-title>JobBlaBLa1</mat-card-title>
          <mat-card-subtitle>$10,000 - $12,000</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="horizonal-scroll-content">
            blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>APPLY</button>
          <button mat-button>SAVE</button>
        </mat-card-actions>
      </mat-card>
      <mat-card class="horizonal-scroll-card">
        <mat-card-header>
          <mat-card-title>JobBlaBLa1</mat-card-title>
          <mat-card-subtitle>$10,000 - $12,000</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="horizonal-scroll-content">
            blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>APPLY</button>
          <button mat-button>SAVE</button>
        </mat-card-actions>
      </mat-card>
      <mat-card class="horizonal-scroll-card">
        <mat-card-header>
          <mat-card-title>JobBlaBLa1</mat-card-title>
          <mat-card-subtitle>$10,000 - $12,000</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="horizonal-scroll-content">
            blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>APPLY</button>
          <button mat-button>SAVE</button>
        </mat-card-actions>
      </mat-card>
      <mat-card class="horizonal-scroll-card">
        <mat-card-header>
          <mat-card-title>JobBlaBLa1</mat-card-title>
          <mat-card-subtitle>$10,000 - $12,000</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="horizonal-scroll-content">
            blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>APPLY</button>
          <button mat-button>SAVE</button>
        </mat-card-actions>
      </mat-card>
      <mat-card class="horizonal-scroll-card">
        <mat-card-header>
          <mat-card-title>JobBlaBLa1</mat-card-title>
          <mat-card-subtitle>$10,000 - $12,000</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="horizonal-scroll-content">
            blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>APPLY</button>
          <button mat-button>SAVE</button>
        </mat-card-actions>
      </mat-card>
      <mat-card class="horizonal-scroll-card">
        <mat-card-header>
          <mat-card-title>JobBlaBLa1</mat-card-title>
          <mat-card-subtitle>$10,000 - $12,000</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="horizonal-scroll-content">
            blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>APPLY</button>
          <button mat-button>SAVE</button>
        </mat-card-actions>
      </mat-card>
      <mat-card class="horizonal-scroll-card">
        <mat-card-header>
          <mat-card-title>JobBlaBLa1</mat-card-title>
          <mat-card-subtitle>$10,000 - $12,000</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="horizonal-scroll-content">
            blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>APPLY</button>
          <button mat-button>SAVE</button>
        </mat-card-actions>
      </mat-card>
      <mat-card class="horizonal-scroll-card">
        <mat-card-header>
          <mat-card-title>JobBlaBLa1</mat-card-title>
          <mat-card-subtitle>$10,000 - $12,000</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="horizonal-scroll-content">
            blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>APPLY</button>
          <button mat-button>SAVE</button>
        </mat-card-actions>
      </mat-card>
      <mat-card class="horizonal-scroll-card">
        <mat-card-header>
          <mat-card-title>JobBlaBLa1</mat-card-title>
          <mat-card-subtitle>$10,000 - $12,000</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="horizonal-scroll-content">
            blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>APPLY</button>
          <button mat-button>SAVE</button>
        </mat-card-actions>
      </mat-card>
      <mat-card class="horizonal-scroll-card">
        <mat-card-header>
          <mat-card-title>JobBlaBLa1</mat-card-title>
          <mat-card-subtitle>$10,000 - $12,000</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="horizonal-scroll-content">
            blablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button>APPLY</button>
          <button mat-button>SAVE</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styleUrls: ["../home-page-post.style.css"],
})
export class JobsHorizonalScrollController implements OnInit {
  public articles?: IArticle[];

  constructor(private _articleFireStore: ArticleFireStore) {}

  async ngOnInit(): Promise<void> {
    this.articles = await this._articleFireStore.listPagination(3);
  }
}
