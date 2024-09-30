function sumSalary(salaries) {
  // ваш код...
  let rez = 0;

  for (let key in salaries) {
    if (Number.isFinite(salaries[key])) {
      rez += salaries[key];
    }
  }

  return rez;
}
