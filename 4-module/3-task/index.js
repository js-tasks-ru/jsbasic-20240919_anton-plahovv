function highlight(table) {
  // ваш код...
  let tableBody = table.querySelector('tbody');
  let tableRows = tableBody.querySelectorAll('tr');

  for (let tr of tableRows) {
    // hidden : available/unavailable
    if (tr.cells[3].hasAttribute('data-available')) {
      if (tr.cells[3].getAttribute('data-available') === 'true') {
        tr.classList.add('available');
      }
      else {
        tr.classList.add('unavailable');
      }
    }
    else {
      tr.hidden = true;
    }
    // male/female
    if (tr.cells[2].textContent == 'm') {
      tr.classList.add('male');
    }
    else if (tr.cells[2].textContent == 'f') {
      tr.classList.add('female');
    }
    // Age
    if (Number(tr.cells[1].textContent) < 18) {
      tr.style.textDecoration = 'line-through';
    }
  }
}