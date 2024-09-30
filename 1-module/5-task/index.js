function truncate(str, maxlength) {
  // ваш код...
  let rez = '';

  if (str.length <= maxlength) {
    rez = str;
    return rez;
  }

  rez = str.slice(0, maxlength - 1) + '…';

  return rez;
}
