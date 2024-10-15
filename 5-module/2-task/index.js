function toggleText() {
  // ваш код...
  let btn = document.querySelector('.toggle-text-button');

  btn.addEventListener('click', () => {
    let elem = document.getElementById('text');
    elem.hidden = !elem.hidden;
  });
}
