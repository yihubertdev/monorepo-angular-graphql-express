import { Component, HostListener, Input, OnInit } from "@angular/core";
import { IArticle } from "sources-types";
import { ArticleFireStore } from "src/app/core/services/fireStore/blog.firestore";

@Component({
  selector: "home-page-article-controller",
  template: `
    <ng-container *ngFor="let article of data">
      <article-card-component [article]="article"></article-card-component>
    </ng-container>
  `,
  styleUrls: ["../home-page-post.style.css"],
})
export class HomePageArticleController implements OnInit {
  @Input() isPagination: boolean = false;

  public data: IArticle[] = [];
  private hasFile: boolean = true;
  constructor(private _articleFireStore: ArticleFireStore) {}

  async ngOnInit(): Promise<void> {
    if (this.data.length) return;
    const post = await this._articleFireStore.list(5);
    this.hasFile = post.hasFile;
    this.data = post.data;
  }

  @HostListener("window:scroll", ["$event"])
  async onWindowScroll() {
    if (
      // Check scroll position at the bottom of the page
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      this.hasFile &&
      this.isPagination
    ) {
      const post = await this._articleFireStore.listPagination(5);
      this.data.push(...post.data);
      this.hasFile = post.hasFile;
    }
  }
}
