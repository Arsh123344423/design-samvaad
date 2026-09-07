export function initSpeakerCarousel(carousel) {
  if (!carousel) return;

  const speakers = [...carousel.querySelectorAll('[data-speaker]')];
  const previous = carousel.querySelector('.speaker-nav--prev');
  const next = carousel.querySelector('.speaker-nav--next');
  if (!speakers.length || !previous || !next) return;

  let center = 0;
  let autoAdvance;

  const render = () => {
    speakers.forEach((speaker, index) => {
      const offset = (index - center + speakers.length) % speakers.length;
      const position = {
        0: 'center',
        1: 'right',
        2: 'far-right',
        [speakers.length - 1]: 'left',
        [speakers.length - 2]: 'far-left',
      }[offset] || 'far-right';
      speaker.dataset.pos = position;
    });
  };

  previous.addEventListener('click', () => {
    center = (center - 1 + speakers.length) % speakers.length;
    render();
  });

  next.addEventListener('click', () => {
    center = (center + 1) % speakers.length;
    render();
  });

  const stopAutoAdvance = () => {
    clearInterval(autoAdvance);
    autoAdvance = undefined;
  };

  const startAutoAdvance = () => {
    stopAutoAdvance();
    autoAdvance = setInterval(() => next.click(), 3000);
  };

  carousel.addEventListener('mouseenter', stopAutoAdvance);
  carousel.addEventListener('mouseleave', startAutoAdvance);

  render();
  startAutoAdvance();
}