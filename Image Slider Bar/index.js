
const slides = document.querySelectorAll('.slide');
const nextButton = document.querySelector('.nav.next');
const prevButton = document.querySelector('.nav.prev');
let currentSlide = 0;
let slideInterval;
let userInteracted = false;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active', 'prev', 'next');
    if (i === index) {
      slide.classList.add('active');
    } else if (i === (index - 1 + slides.length) % slides.length) {
      slide.classList.add('prev');
    } else if (i === (index + 1) % slides.length) {
      slide.classList.add('next');
    }
  });


  const slider = document.querySelector('.slider');
  const offset = -index * 100;
  slider.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function startAutoSlide() {
  slideInterval = setInterval(() => {
    if (!userInteracted) {
      nextSlide();
    }
  }, 3000); 
}

function stopAutoSlide() {
  clearInterval(slideInterval);
}


nextButton.addEventListener('click', () => {
  userInteracted = true;
  stopAutoSlide();
  nextSlide();
  resumeAutoSlide();
});

prevButton.addEventListener('click', () => {
  userInteracted = true;
  stopAutoSlide();
  prevSlide();
  resumeAutoSlide();
});

function resumeAutoSlide() {
  setTimeout(() => {
    userInteracted = false;
  }, 5000); 
  startAutoSlide();
}


showSlide(currentSlide);
startAutoSlide();
