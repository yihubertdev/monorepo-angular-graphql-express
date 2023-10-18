"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarouselSliderComponent = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@angular/core");
let CarouselSliderComponent = class CarouselSliderComponent {
    constructor() {
        this.images = [];
        this.slideIndex = 1;
    }
    ngAfterViewInit() {
        this.showSlides(this.slideIndex);
    }
    plusSlides(n) {
        this.showSlides((this.slideIndex += n));
    }
    currentSlide(n) {
        this.showSlides((this.slideIndex = n));
    }
    showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("slide");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) {
            this.slideIndex = 1;
        }
        if (n < 1) {
            this.slideIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[this.slideIndex - 1].style.display = "block";
        dots[this.slideIndex - 1].className += " active";
    }
};
tslib_1.__decorate([
    (0, core_1.Input)()
], CarouselSliderComponent.prototype, "images", void 0);
CarouselSliderComponent = tslib_1.__decorate([
    (0, core_1.Component)({
        selector: "carousel-slider-component",
        template: ` <div
      class="slide-show-container"
      *ngIf="images.length !== 0">
      <div
        class="slide fade slide-image-container"
        [ngStyle]="{ 'background-image': 'url(' + image + ')' }"
        *ngFor="let image of images"></div>

      <a
        class="prev hide-slide"
        (click)="plusSlides(-1)"
        >❮</a
      >
      <a
        class="next hide-slide"
        (click)="plusSlides(1)"
        >❯</a
      >
    </div>
    <br />

    <div style="text-align:center">
      <span
        class="dot"
        (click)="currentSlide(1)"></span>
      <span
        class="dot"
        (click)="currentSlide(2)"></span>
      <span
        class="dot"
        (click)="currentSlide(3)"></span>
    </div>`,
        styleUrls: ["./carousel-slider.css"],
    })
], CarouselSliderComponent);
exports.CarouselSliderComponent = CarouselSliderComponent;
//# sourceMappingURL=carousel-slider.component.js.map