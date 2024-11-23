class Slider {
    constructor(selector, config = {}) {
        this.sliderList = document.querySelector(selector);
        this.slides = this.sliderList.querySelectorAll(".slide");
        this.currentIndex = 0;
        this.config = {
            interval: 5000,
            showIndicators: true,
            showControls: true,
            ...config
        };

        this.init();
    }

    init() {
        this.createControls();
        this.createIndicators();
        this.startSlide();
        this.addHoverListeners();
    }

    createControls() {
        const controlsContainer = document.createElement("div");
        controlsContainer.className = "controls";

        this.prevButton = document.createElement("button");
        this.prevButton.className = "prev";
        this.prevButton.textContent = "Previous";
        controlsContainer.appendChild(this.prevButton);

        this.nextButton = document.createElement("button");
        this.nextButton.className = "next";
        this.nextButton.textContent = "Next";
        controlsContainer.appendChild(this.nextButton);

        this.pauseButton = document.createElement("button");
        this.pauseButton.className = "pause";
        this.pauseButton.textContent = "Pause";
        controlsContainer.appendChild(this.pauseButton);

        this.sliderList.parentNode.appendChild(controlsContainer);

        if (!this.prevButton || !this.nextButton || !this.pauseButton) {
            console.error('Не удалось создать кнопки управления');
            return;
        }

        this.bindControlEvents();
    }

    bindControlEvents() {
        this.prevButton.addEventListener('click', this.prevSlide.bind(this));
        this.nextButton.addEventListener('click', this.nextSlide.bind(this)); 1

        this.pauseButton.addEventListener("click", () => {
            if (this.paused) {
                this.startSlide();
                this.pauseButton.textContent = "Pause";
            } else {
                this.stopSlide();
                this.pauseButton.textContent = "Play";
            }
            this.paused = !this.paused;
        });
    }

    createIndicators() {
        const indicatorsContainer = document.createElement("div");
        indicatorsContainer.className = "indicators";

        this.indicators = [];
        this.slides.forEach((_, index) => {
            const indicator = document.createElement("button");
            indicator.className = "indicator";
            indicator.textContent = index + 1;
            indicator.setAttribute("data-index", index);
            indicatorsContainer.appendChild(indicator);
            this.indicators.push(indicator);
        });

        this.sliderList.parentNode.appendChild(indicatorsContainer);

        this.bindIndicatorEvents();
    }

    bindIndicatorEvents() {
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener("click", () => {
                this.stopSlide();
                this.goToSlide(index);
                if (!this.paused) this.startSlide();
            });
        });
    }

    startSlide() {
        this.autoSlide = setInterval(() => {
            this.nextSlide();
        }, this.config.interval);
    }

    stopSlide() {
        clearInterval(this.autoSlide);
        this.autoSlide = null;
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.sliderList.style.transform = `translateX(-${index * 100}%)`;
        this.updateIndicators();
    }

    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }

    addHoverListeners() {
        this.sliderList.addEventListener('mouseenter', () => this.stopSlide());
        this.sliderList.addEventListener('mouseleave', () => {
            if (!this.paused) this.startSlide();
        });
    }
}

const slider = new Slider(".slider", {
    interval: 3000,
    showIndicators: true,
    showControls: true
});