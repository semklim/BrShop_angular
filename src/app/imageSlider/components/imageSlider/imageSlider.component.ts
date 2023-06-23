import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './imageSlider.component.html',
  styleUrls: ['./imageSlider.component.css'],
})
export class ImageSliderComponent {
  @Input() slides: string[] = [];

  @Input() isShowDot = true;

  @Output() clickOnImage: EventEmitter<void> = new EventEmitter();

  currentIndex = 0;

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
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide ? this.slides.length - 1 : this.currentIndex - 1;

    this.currentIndex = newIndex;
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.slides.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;

    this.currentIndex = newIndex;
  }

  goToSlide(slideIndex: number): void {
    this.currentIndex = slideIndex;
  }

  getCurrentSlideUrl() {
    return `url('${this.slides[this.currentIndex]}')`;
  }

  onClickToImage() {
    this.clickOnImage.emit();
  }
}
