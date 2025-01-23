import { Component, ElementRef, OnInit, ViewChild, Renderer2, HostListener } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.scss']
})
export class ProyectsComponent implements OnInit {
  @ViewChild('magnifierLens', { static: false }) magnifierLens: ElementRef;
  @ViewChild('imgContainer', { static: false }) imgContainer: ElementRef;
  projects = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    navSpeed: 700,
    items: 1,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
  };

  constructor(
    public analyticsService: AnalyticsService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {

  }


  openModal(imageSrc: string): void {
    const modal = document.getElementById('imageModal') as HTMLElement;
    const modalImage = document.getElementById('modalImage') as HTMLImageElement;

    if (modal && modalImage) {
      modalImage.src = imageSrc;

      modalImage.onload = () => {
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';

        const imgAspectRatio = modalImage.naturalWidth / modalImage.naturalHeight;
        const viewportWidth = window.innerWidth * 0.65; // 80% of the viewport width
        const viewportHeight = window.innerHeight * 0.65; // 80% of the viewport height

        if (imgAspectRatio > 1) {
          modalImage.style.width = `${Math.min(viewportWidth, modalImage.naturalWidth)}px`;
          modalImage.style.height = 'auto';
        } else {
          modalImage.style.height = `${Math.min(viewportHeight, modalImage.naturalHeight)}px`;
          modalImage.style.width = 'auto';
        }
      };
    }
  }

  closeModal(): void {
    const modal = document.getElementById('imageModal') as HTMLElement;
    const modalImage = document.getElementById('modalImage') as HTMLImageElement;

    if (modal && modalImage) {
      modal.style.display = 'none';
      modalImage.src = ''; // Clear the image source
    }
  }
  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent): void {
    const modal = document.getElementById('imageModal') as HTMLElement;
    if (modal) {
      modal.style.display = 'none'; // Hide the modal on Escape key press
    }
  }



  debug(): void {
    if (this.imgContainer?.nativeElement) {
      this.imgContainer.nativeElement.scroll({
        top: this.imgContainer.nativeElement.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    } else {
      console.error('Image container is not available.');
    }
  }
}
