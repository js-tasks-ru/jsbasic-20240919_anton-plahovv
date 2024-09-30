function ucFirst(str) {
  // ваш код...
  rez = '';

  if (str == '') {
    return rez;
  }

  rez = str[0].toUpperCase() + str.slice(1);
  
  return rez;
}
