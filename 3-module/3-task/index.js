function camelize(str) {
  // ваш код...
  let aStrParts = [];

  aStrParts = str.split('-');

  for (let i = 1; i < aStrParts.length; i++) {
    aStrParts[i] = aStrParts[i][0].toUpperCase() + aStrParts[i].slice(1);
  }

  return aStrParts.join('');
}
