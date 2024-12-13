const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  burger.classList.toggle("toggle");
});

// Close menu on link click
navItems.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    burger.classList.remove("toggle");
  });
});


var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(
    ".slider-wrapper .slide-button"
  );
  const sliderScrollbar = document.querySelector(
    ".staff-container .slider-scrollbar"
  );
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  // Handle scrollbar thumb drag
  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;
    const maxThumbPosition =
      sliderScrollbar.getBoundingClientRect().width -
      scrollbarThumb.offsetWidth;

    // Update thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;

      // Ensure the scrollbar thumb stays within bounds
      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );
      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };

    // Remove event listeners on mouse up
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Add event listeners for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  // Slide images according to the slide button clicks
  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });

  // Show or hide slide buttons based on scroll position
  const handleSlideButtons = () => {
    slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
    slideButtons[1].style.display =
      imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  };

  // Update scrollbar thumb position based on image scroll
  const updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
    scrollbarThumb.style.left = `${thumbPosition}px`;
  };

  // Call these two functions when image list scrolls
  imageList.addEventListener("scroll", () => {
    updateScrollThumbPosition();
    handleSlideButtons();
  });
};

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);

const slides = document.querySelectorAll(".slides img");
const bars = document.querySelectorAll(".bar");

let currentIndex = 0;
const slideDuration = 3500; // 3.5 seconds for each slide
let interval;

function updateSlider(index) {
  // Update active image
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  // Reset all progress bars
  bars.forEach((bar, i) => {
    const progressBar = bar.querySelector(".progress");
    progressBar.style.width = i === index ? "100%" : "0";
    progressBar.style.transition =
      i === index ? `width ${slideDuration}ms linear` : "none";
  });
}

function startSlider() {
  interval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider(currentIndex);
  }, slideDuration);
}

function stopSlider() {
  clearInterval(interval);
}

// Add click events to progress bars for manual navigation
bars.forEach((bar, i) => {
  bar.addEventListener("click", () => {
    stopSlider();
    currentIndex = i;
    updateSlider(currentIndex);
    startSlider();
  });
});

// Add progress divs to bars dynamically
bars.forEach((bar) => {
  const progressDiv = document.createElement("div");
  progressDiv.classList.add("progress");
  bar.appendChild(progressDiv);
});

// Initialize slider
updateSlider(currentIndex);
startSlider();

const sections = document.querySelectorAll('section');

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  },
  { threshold: 0.1 } // Trigger when 10% of the element is visible
);

sections.forEach((section) => observer.observe(section));

