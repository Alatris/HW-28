function Slider(selector) {
    this.slider = document.querySelector(selector);
    this.slides = this.slider.querySelectorAll('.slide');
    this.slideIndex = 0;
    this.autoplayInterval = 3000;

    this.showSlide = function(n) {
        this.slides[this.slideIndex].classList.remove('active');
        this.slideIndex = (n + this.slides.length) % this.slides.length;
        this.slides[this.slideIndex].classList.add('active');
    };

    this.nextSlide = function() {
        this.showSlide(this.slideIndex + 1);
    };

    this.prevSlide = function() {
        this.showSlide(this.slideIndex - 1);
    };

    this.startAutoplay = function() {
        this.intervalId = setInterval(() => {
            this.nextSlide();
        }, this.autoplayInterval);
    };

    this.stopAutoplay = function() {
        clearInterval(this.intervalId);
    };

    this.slides[0].classList.add('active');


    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    prevBtn.addEventListener('click', () => this.prevSlide());
    nextBtn.addEventListener('click', () => this.nextSlide());

    this.startAutoplay();
}

const slider = new Slider('.slider');