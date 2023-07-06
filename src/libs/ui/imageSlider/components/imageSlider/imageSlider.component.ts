import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './imageSlider.component.html',
  styleUrls: ['./imageSlider.component.css'],
})
export class ImageSliderComponent implements AfterViewInit {
  @Input() slides: string[] = [];

  @Input() isNotMobileDevice = true;

  @Input() isShowDot = true;

  @Output() clickOnImage: EventEmitter<void> = new EventEmitter();

  private imagesIsLoaded: number[] = [0];

  currentIndex = 0;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.preloadImages(1);
    });
  }

  showDots(): boolean {
    return this.isShowDot && this.slides.length > 1;
  }

  currentSlideForDot(slideIndex: number): string {
    if (slideIndex === this.currentIndex) {
      return '#316cf4';
    }
    return '#656565';
  }

  goToPrevious(): void {
    if (this.currentIndex !== 0) {
      this.currentIndex -= 1;
    }
  }

  goToNext(): void {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex += 1;
      this.preloadImages(this.currentIndex + 1);
    }
  }

  goToSlide(slideIndex: number): void {
    this.preloadImages(slideIndex);
    this.currentIndex = slideIndex;
  }

  getCurrentSlideUrl() {
    return `url('${this.slides[this.currentIndex]}')`;
  }

  onClickToImage() {
    this.clickOnImage.emit();
  }

  preloadImages(index: number) {
    if (index !== this.slides.length) {
      if (!this.imagesIsLoaded.includes(index)) {
        const image = new Image();
        image.src = this.slides[index];
        this.imagesIsLoaded.push(index);
      }
    }
  }

  checkIfMobileDevice(): boolean {
    const result = navigator.maxTouchPoints > 0 && /Android|iPhone|iPad/i.test(navigator.userAgent);
    return result;
  }
}
