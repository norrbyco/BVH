<script>
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('hero-slider');
    const slidesContainer = document.getElementById('slides-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotIndicators = document.getElementById('dot-indicators');

    const slides = slidesContainer.querySelectorAll(':scope > div');
    const totalSlides = slides.length;
    let currentSlide = 0;
    const intervalTime = 6000; // Växla var 6:e sekund

    // --- Dot Indicators (Valfritt men rekommenderas för användarvänlighet) ---
    function renderDots() {
        dotIndicators.innerHTML = ''; // Rensa befintliga prickar
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add(
                'w-3', 'h-3', 'rounded-full', 'bg-white', 'opacity-50', 'transition', 'duration-300'
            );
            if (index === currentSlide) {
                dot.classList.add('opacity-100', 'bg-emerald-500'); // Aktiv prick färg
            }
            dot.addEventListener('click', () => {
                currentSlide = index;
                resetInterval();
                updateSlider();
            });
            dotIndicators.appendChild(dot);
        });
    }

    // --- Slider Logik ---
    function updateSlider() {
        // Beräkna hur mycket containern ska flyttas horisontellt
        const offset = -currentSlide * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;
        renderDots(); // Uppdatera prickarna vid varje slide-byte
    }

    // Funktion för automatisk rotation
    function nextSlide() {
        currentSlide = (currentSlide === totalSlides - 1) ? 0 : currentSlide + 1;
        updateSlider();
    }
    
    let slideInterval = setInterval(nextSlide, intervalTime);

    // Återställ timer vid manuell navigering
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    // Händelselyssnare för knappar
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide === 0) ? totalSlides - 1 : currentSlide - 1;
        resetInterval();
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    // Starta slidern
    renderDots();
    updateSlider();
});
</script>