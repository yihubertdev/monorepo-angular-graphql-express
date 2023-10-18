"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePageMainPictureController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let HomePageMainPictureController = class HomePageMainPictureController {
    constructor(_articleFireStore) {
        this._articleFireStore = _articleFireStore;
    }
    async ngOnInit() {
        this.articles = await this._articleFireStore.listPagination(3);
        console.log(this.articles);
    }
    myFunction() {
        console.log(this.myVideo);
        if (!this.myVideo)
            return;
        if (this.myVideo.nativeElement.paused) {
            this.myVideo.nativeElement.play();
        }
        else {
            this.myVideo.nativeElement.pause();
        }
    }
};
tslib_1.__decorate([
    (0, core_1.ViewChild)("homeVideo")
], HomePageMainPictureController.prototype, "myVideo", void 0);
HomePageMainPictureController = tslib_1.__decorate([
    (0, core_1.Component)({
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
], HomePageMainPictureController);
exports.HomePageMainPictureController = HomePageMainPictureController;
//# sourceMappingURL=main-picture.controller.js.map