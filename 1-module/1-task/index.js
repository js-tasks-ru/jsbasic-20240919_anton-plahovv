function factorial(n) {
  // ваш код...
  let rez = 1;
  if (n < 2) {
    return rez;
  }

  while (n > 0) {
    rez *= n;
    n--;
  }
  return rez;
  /*
  // 2 способ: через рекурсию
  if (n < 2) {
    return 1;
  }

  return n * factorial(n - 1);
  */
}
