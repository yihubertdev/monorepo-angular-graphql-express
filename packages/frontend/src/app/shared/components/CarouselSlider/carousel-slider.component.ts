import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
@Component({
  selector: "carousel-slider-component",
  template: ` <div
      class="slide-show-container"
      [ngStyle]="{
        height: height + 'dvh'
      }"
      *ngIf="images?.length !== 0">
      <div
        class="slide fade"
        *ngFor="let image of images; let i = index"
        [ngStyle]="{
          'background-image': 'url(' + image + ')',
          display: i === slideIndex ? 'block' : 'none'
        }"
        [ngClass]="
          isCover ? 'slide-image-cover-center' : 'slide-image-center'
        "></div>

      <a
        class="prev hide-slide"
        (click)="
          slideIndex - 1 < 0
            ? (slideIndex = images.length - 1)
            : (slideIndex = slideIndex - 1)
        "
        >❮</a
      >
      <a
        class="next hide-slide"
        (click)="
          slideIndex + 1 >= images.length
            ? (slideIndex = 0)
            : (slideIndex = slideIndex + 1)
        "
        >❯</a
      >
    </div>
    <br />

    <div style="text-align:center">
      <span
        class="dot"
        *ngFor="let image of images; let i = index"
        (click)="slideIndex = i"
        [ngClass]="i === slideIndex ? 'active' : ''"></span>
    </div>`,
  styleUrls: ["./carousel-slider.css"],
})
export class CarouselSliderComponent implements OnInit {
  @Input() images: string[] = [];
  @Input() height?: number;
  @Input() isCover: boolean = true;
  @Input() isSilding?: boolean;
  public slideIndex: number = 0;

  ngOnInit(): void {
    if (this.isSilding) {
      setInterval(() => {
        this.slideIndex =
          this.slideIndex + 1 >= this.images.length
            ? (this.slideIndex = 0)
            : (this.slideIndex = this.slideIndex + 1);
      }, 2000);
    }
  }
}

// import {
//   AfterViewInit,
//   Component,
//   ElementRef,
//   Input,
//   OnInit,
//   ViewChild,
// } from "@angular/core";
// @Component({
//   selector: "",
//   template: ` <div
//       class="slide-show-container"
//       *ngIf="images.length !== 0">
//       <!-- <div
//         class="slide fade slide-image-cover-center"
//         [ngStyle]="{ 'background-image': 'url(' + image + ')' }"
//         *ngFor="let image of images"></div> -->

//       <a
//         class="prev hide-slide"
//         (click)="plusSlides(-1)"
//         >❮</a
//       >
//       <a
//         class="next hide-slide"
//         (click)="plusSlides(1)"
//         >❯</a
//       >
//     </div>
//     <br />

//     <div style="text-align:center">
//       <span
//         class="dot"
//         (click)="currentSlide(1)"></span>
//       <span
//         class="dot"
//         (click)="currentSlide(2)"></span>
//       <span
//         class="dot"
//         (click)="currentSlide(3)"></span>
//     </div>`,
//   styleUrls: ["./carousel-slider.css"],
// })
// export class CarouselSliderPureJSComponent implements AfterViewInit {
//   @Input() images: string[] = [];
//   slideIndex = 1;
//   ngAfterViewInit(): void {
//     this.showSlides(this.slideIndex);
//   }

//   plusSlides(n: number) {
//     this.showSlides((this.slideIndex += n));
//   }

//   currentSlide(n: number) {
//     this.showSlides((this.slideIndex = n));
//   }

//   showSlides(n: number) {
//     let i;
//     let slides = document.getElementsByClassName("slide") as any;

//     let dots = document.getElementsByClassName("dot");
//     if (n > slides.length) {
//       this.slideIndex = 1;
//     }
//     if (n < 1) {
//       this.slideIndex = slides.length;
//     }
//     for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";
//     }
//     for (i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace(" active", "");
//     }
//     slides[this.slideIndex - 1].style.display = "block";
//     dots[this.slideIndex - 1].className += " active";
//   }
// }
