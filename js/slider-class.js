class SlideShow {
    constructor(selector, options = {}) {
        this.slider = document.querySelector(selector);
        this.slides = this.slider.querySelectorAll('.slide');
        this.currentIndex = 0;
        this.slideWidth = this.slides[0].offsetWidth;

        this.settings = {
            autoplay: false,
            autoplayInterval: 3000,
            infinite: true,
            transitionDuration: 500
        };

        Object.assign(this.settings, options);

        if (this.settings.infinite) {
            const firstClone = this.slides[0].cloneNode(true);
            const lastClone = this.slides[this.slides.length - 1].cloneNode(true);
            this.slider.insertBefore(firstClone, this.slides[0]);
            this.slider.appendChild(lastClone);
            this.currentIndex++;
        }

        this.slider.style.transform = `translateX(-${this.slideWidth * this.currentIndex}px)`;
        this.slider.style.transition = `transform ${this.settings.transitionDuration}ms ease-in-out`;

        if (this.settings.autoplay) {
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, this.settings.autoplayInterval);
        }
    }

    nextSlide() {
        this.currentIndex++;
        this.slider.style.transform = `translateX(-${this.slideWidth * this.currentIndex}px)`;
    }

    prevSlide() {
        this.currentIndex--;
        this.slider.style.transform = `translateX(-${this.slideWidth * this.currentIndex}px)`;
    }
}