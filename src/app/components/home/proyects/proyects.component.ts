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
  @ViewChild('modalImage', { static: false }) modalImage!: ElementRef;
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
    this.closeModal();

  }
  addMagnifier() {
    const image = this.modalImage.nativeElement;
    const lens = this.magnifierLens.nativeElement;

    const zoom = 2; // Magnification level

    lens.style.backgroundImage = `url('${image.src}')`;
    lens.style.backgroundSize = `${image.width * zoom}px ${image.height * zoom}px`;

    const moveLens = (event: MouseEvent) => {
      const bounds = image.getBoundingClientRect();

      // Get cursor position relative to the image
      let x = event.pageX - bounds.left - window.pageXOffset;
      let y = event.pageY - bounds.top - window.pageYOffset;

      // Prevent the lens from going outside the image
      x = Math.max(0, Math.min(x, image.width));
      y = Math.max(0, Math.min(y, image.height));

      lens.style.left = `${x - lens.offsetWidth / 2}px`;
      lens.style.top = `${y - lens.offsetHeight / 2}px`;

      lens.style.backgroundPosition = `-${x * zoom - lens.offsetWidth / 2}px -${y * zoom - lens.offsetHeight / 2}px`;
    };

    // Add event listeners
    image.addEventListener('mousemove', moveLens);
    lens.addEventListener('mousemove', moveLens);
    image.addEventListener('mouseleave', () => {
      lens.style.display = 'none';
    });
    lens.addEventListener('mouseleave', () => {
      lens.style.display = 'none';
    });

    // Show the lens on hover
    image.addEventListener('mouseenter', () => {
      lens.style.display = 'block';
    });
    lens.addEventListener('mouseenter', () => {
      lens.style.display = 'block';
    });
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

  closeOnOutsideClick(event: MouseEvent): void {
    const modalContent = (event.target as HTMLElement).closest('.modal-content-wrapper');
    if (!modalContent) {
      this.closeModal();
    }
  }


  closeModal(): void {
    const modal = document.getElementById('imageModal') as HTMLElement;

    if (modal) {
      modal.style.display = 'none';
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
