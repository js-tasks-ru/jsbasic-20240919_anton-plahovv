function showSalary(users, age) {
  // ваш код...
  let filtredUsers = users
    .filter(user => user.age <= age)
    .map(user => `${user.name}, ${user.balance}`);
  //let resultUsers = filtredUsers.map(user => `${user.name}, ${user.balance}`);

  return filtredUsers.join('\n');

}
