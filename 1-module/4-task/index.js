function checkSpam(str) {
  // ваш код...
  let rez = false;
  let spamFilter1 = '1xBet';
  let spamFilter2 = 'XXX';

  rez = str.toUpperCase().includes(spamFilter1.toUpperCase()) || str.toUpperCase().includes(spamFilter2.toUpperCase());

  return rez;
}
