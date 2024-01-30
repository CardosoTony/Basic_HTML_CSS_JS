const toggles = document.querySelectorAll('.faq-toggle');

toggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const isActive = toggle.parentNode.classList.contains('active');

    toggles.forEach((otherToggle) => {
      otherToggle.parentNode.classList.remove('active');
    });

    if (!isActive) {
      toggle.parentNode.classList.add('active');
    }
  });
});
