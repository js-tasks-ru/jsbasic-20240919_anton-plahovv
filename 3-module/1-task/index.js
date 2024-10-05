function namify(users) {
  // ваш код...
  /* // 1 способ через цикл
  let aNames = [];

  for (let user of users) {
    aNames.push(user.name);
  }

  return aNames;
  */
  //2 способ через map
  return users.map(user => user.name);
}
