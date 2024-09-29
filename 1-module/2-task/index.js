/**
 * Эту функцию трогать не нужно
 */
function print(text) {
  console.log(text);
}

/**
 * Эту функцию нужно поменять так,
 * чтобы функция sayHello работала корректно
 */
function isValid(name) {
  // ваш код...
  let rez = false;
  /*//Checking null
  rez = Boolean(name);
  //checking spaces
  rez = !name.includes(' ');
  //cheking length
  rez = name.length >= 4;
  */
  rez = Boolean(name) && !name.includes(' ') && (name.length >= 4);

  return rez
}

function sayHello() {
  let userName = prompt('Введите ваше имя');

  if (isValid(userName)) {
    print(`Welcome back, ${userName}!`);
  } else {
    print('Некорректное имя');
  }
}
