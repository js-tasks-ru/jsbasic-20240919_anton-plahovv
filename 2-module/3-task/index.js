let calculator = {
  // ваш код
  a: 0,
  b: 0,
  read: function(num1, num2) {
    this.a = num1;
    this.b = num2;
  },
  sum: function() {
    return this.a + this.b;
  },
  mul: function() {
    return this.a * this.b;
  },
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
