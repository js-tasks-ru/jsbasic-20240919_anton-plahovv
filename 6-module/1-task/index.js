/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = rows;
  }

  set elem(rows) {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    //thead.innerHTML = '<tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr>';
    thead.insertAdjacentHTML('beforeend',
      `<tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>`
    );
    table.appendChild(thead);

    let tbody = document.createElement('tbody');

    for (let row of rows) {
      let tr = tbody.insertRow();

      for (let attr in row) {
        let td = tr.insertCell();
        td.appendChild(document.createTextNode(`${row[attr]}`));
      }

      // Добавляем кнопку
      tr.insertAdjacentHTML('beforeend',
        `<td>
          <button class="button_row">X</button>
        </td>`
      );
      /*
      let td = tr.insertCell();
      let btn = document.createElement('button');
      btn.textContent = 'X';
      btn.classList.append('button-row');
      td.appendChild(btn);
      */
    }
    table.appendChild(tbody);
    table.addEventListener('click', this.onClick);

    this._elem = table;
  }

  get elem() {
    return this._elem;
  }

  onClick(event) {
    if (event.target.classList.contains('button_row')) {
      // Удалить строку 
      let tr = event.target.closest('tr');
      let tbl = event.target.closest('table');
      tbl.deleteRow(tr.rowIndex);
    }
    else {return;}
  }
}
