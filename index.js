let nav = document.getElementById('nav');

window.addEventListener('scroll', (ev) => {
  if (
    document.body.scrollTop > 2 ||
    document.documentElement.scrollTop > 2
  ) {
    nav.classList.add('chip-off');
  } else {
    nav.classList.remove('chip-off');
  }
});