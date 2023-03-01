import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
@Component({
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
export class CarouselSliderComponent implements AfterViewInit {
  @Input() images: string[] = [];
  slideIndex = 1;
  ngAfterViewInit(): void {
    this.showSlides(this.slideIndex);
  }

  plusSlides(n: number) {
    this.showSlides((this.slideIndex += n));
  }

  currentSlide(n: number) {
    this.showSlides((this.slideIndex = n));
  }

  showSlides(n: number) {
    let i;
    let slides = document.getElementsByClassName("slide") as any;

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
}
