document.addEventListener("DOMContentLoaded", function () {
    initBanner();
});

function initBanner(){
    const slides = document.querySelector(".slides");
    const images = document.querySelectorAll(".slides img");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    const dots = document.querySelectorAll(".dot");

    let index = 0;
    let slideInterval;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    function showSlide(i) {
        if (i < 0) i = images.length - 1;
        if (i >= images.length) i = 0;
        index = i;
        slides.style.transform = `translateX(-${index * 100}%)`;
        updateDots();
    }
    function updateDots() {
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

    function startAutoSlide() {
        slideInterval = setInterval(() => showSlide(index + 1), 3000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    prevButton.addEventListener("click", () => { showSlide(index - 1); stopAutoSlide(); startAutoSlide(); });
    nextButton.addEventListener("click", () => { showSlide(index + 1); stopAutoSlide(); startAutoSlide(); });

    dots.forEach(dot => {
        dot.addEventListener("click", () => {
            showSlide(parseInt(dot.dataset.index));
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // 手機觸控滑動
    slides.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
    slides.addEventListener("touchend", e => {
        const diff = e.changedTouches[0].clientX - startX;
        if (diff > 50) showSlide(index - 1);
        else if (diff < -50) showSlide(index + 1);
    });

    // 電腦滑鼠拖曳
    slides.addEventListener("mousedown", e => {
        isDragging = true;
        startX = e.clientX;
        slides.style.cursor = "grabbing";
    });
    slides.addEventListener("mouseup", e => {
        if (!isDragging) return;
        isDragging = false;
        slides.style.cursor = "grab";
        const diff = e.clientX - startX;
        if (diff > 50) showSlide(index - 1);
        else if (diff < -50) showSlide(index + 1);
    });
    slides.addEventListener("mouseleave", () => { isDragging = false; slides.style.cursor = "grab"; });

    // 初始化
    showSlide(0);
    startAutoSlide();
}
