import { NgFor } from "@angular/common";
import { Component, HostListener, Input, OnInit } from "@angular/core";
import { IArticle, IUser } from "type-sources";
import { SessionStorageService } from "../../core/services/browserStorage/sessionStorage";
import { ArticleFireStore } from "../../core/services/fireStore/blog.firestore";
import { ArticleCardComponent } from "../../shared/components/postCard/article-card.component";

@Component({
  standalone: true,
  selector: "home-page-article-controller",
  imports: [NgFor, ArticleCardComponent],
  template: `
    <ng-container *ngFor="let article of data">
      <article-card-component [article]="article"></article-card-component>
    </ng-container>
  `,
  styleUrls: ["./home-page-post.style.css"],
})
export class HomePageArticleController implements OnInit {
  @Input() isPagination: boolean = false;
  @Input() userId?: string;

  public data: IArticle[] = [];
  private hasFile: boolean = true;
  constructor(
    private _articleFireStore: ArticleFireStore,
    private _sessionStorage: SessionStorageService
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.data.length) return;
    if (this.userId === "me") {
      this.userId =
        this._sessionStorage.getSessionStorage<IUser>("user")?.userId;
    }
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
      const post = await this._articleFireStore.listPagination(5, [
        this.userId!,
      ]);
      this.data.push(...post.data);
      this.hasFile = post.hasFile;
    }
  }
}
