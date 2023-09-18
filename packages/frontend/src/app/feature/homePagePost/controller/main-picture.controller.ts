import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { IArticle } from "sources-types";
import { ArticleFireStore } from "src/app/core/services/fireStore/blog.firestore";

@Component({
  selector: "home-page-main-picture-controller",
  template: `
    <div
      class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 video-container"
      style="height: 58dvh; padding: 0;">
      <video
        autoplay
        muted
        loop
        #homeVideo>
        <source
          src="https://firebasestorage.googleapis.com/v0/b/hubert-blog.appspot.com/o/home-page%2Fhome-firework.mp4?alt=media&token=d740f05b-394b-4ddb-9f1f-fe986a87b68c"
          type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    </div>
  `,
  styleUrls: ["../home-page-post.style.css"],
})
export class HomePageMainPictureController implements OnInit {
  public articles?: IArticle[];
  @ViewChild("homeVideo") myVideo?: ElementRef;

  constructor(private _articleFireStore: ArticleFireStore) {}

  async ngOnInit(): Promise<void> {}

  myFunction() {
    console.log(this.myVideo);
    if (!this.myVideo) return;
    if (this.myVideo.nativeElement.paused) {
      this.myVideo.nativeElement.play();
    } else {
      this.myVideo.nativeElement.pause();
    }
  }
}
