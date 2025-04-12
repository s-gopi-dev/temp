function initializeFeedbackCarousel() {

  const feedbackCarousel = document.querySelector('.feedback-carousel-track');
  const feedbackCards = document.querySelectorAll('.feedback-card');
  const feedbackPrevBtn = document.querySelector('.feedback-carousel-prev');
  const feedbackNextBtn = document.querySelector('.feedback-carousel-next');

  if (!feedbackCarousel || feedbackCards.length === 0) {
    console.warn("No feedback cards found. Skipping carousel initialization.");
    return;
  }

  let feedbackCurrentIndex = 0;
  const feedbackCardWidth = 320; // Width + margin
  const visibleCards = 3; // Number of visible cards
  let autoScrollInterval;

  function updateFeedbackCarousel() {
    feedbackCarousel.style.transform = `translateX(-${feedbackCurrentIndex * feedbackCardWidth}px)`;
  }
  
  function feedbackNextSlide() {
    if (feedbackCurrentIndex < feedbackCards.length - visibleCards) {
      feedbackCurrentIndex++;
    } else {
      feedbackCurrentIndex = 0; // Reset to the first slide
    }
    updateFeedbackCarousel();
  };
  
  function feedbackPrevSlide() {
    if (feedbackCurrentIndex > 0) {
      feedbackCurrentIndex--;
    } else {
      feedbackCurrentIndex = feedbackCards.length - visibleCards; // Go to last set of cards
    }
    updateFeedbackCarousel();
  };
  
  feedbackNextBtn?.addEventListener('click', () => {
    feedbackNextSlide();
    restartAutoScroll();
  });

  feedbackPrevBtn?.addEventListener('click', () => {
    feedbackPrevSlide();
    restartAutoScroll();
  });

  function startAutoScroll() {
    autoScrollInterval = setInterval(feedbackNextSlide, 3000);
  }

  function restartAutoScroll() {
    clearInterval(autoScrollInterval);
    startAutoScroll();
  }

  startAutoScroll();

  feedbackCarousel.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
  feedbackCarousel.addEventListener('mouseleave', () => startAutoScroll());

  // Star rating functionality
  const feedbackStars = document.querySelectorAll('.feedback-rating-star');
  feedbackStars.forEach(star => {
    star.addEventListener('click', () => {
      const value = parseInt(star.getAttribute('data-value'));
      feedbackStars.forEach((s, index) => {
        if (index < value) {
          s.classList.add('active');
          s.textContent = '★';
        } else {
          s.classList.remove('active');
          s.textContent = '☆';
        }
      });
    });
  });

  // Feedback tags functionality
  const feedbackTags = document.querySelectorAll('.feedback-type-tag');
  feedbackTags.forEach(tag => {
    tag.addEventListener('click', () => {
      feedbackTags.forEach(t => t.classList.remove('feedback-type-tag-active'));
      tag.classList.add('feedback-type-tag-active');
    });
  });

  // Video play/pause on hover
  const feedbackVideos = document.querySelectorAll('.feedback-video');
  feedbackVideos.forEach(video => {
    video.addEventListener('mouseenter', () => video.play());
    video.addEventListener('mouseleave', () => video.pause());
  });

}
