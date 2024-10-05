function getMinMax(str) {
  // ваш код...
  let result = {};
  let aElemInStr = str.split(' ');
  // filtred Number
  aElemNumber = aElemInStr.filter(elem => isFinite(elem)).map(elem => Number(elem));

  result.min = Math.min(...aElemNumber);
  result.max = Math.max.apply(null, aElemNumber);

  return result;
}
