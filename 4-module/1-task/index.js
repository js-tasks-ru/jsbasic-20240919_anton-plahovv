function makeFriendsList(friends) {
  // ваш код...
  let ulFrendsList = document.createElement('ul');

  //let liFriend = document.createElement('li');

  for (let friend of friends) {
    // Добавление через innerHTML
    //ulFrendsList.innerHTML += `<li>${friend.firstName} ${friend.lastName}/li>`;
    // Через объект
    let liFriend = document.createElement('li'); // Почему когда я выношу объявление переменной liFriend за цикл у меня добавляется только последний из списка друзей? 
    liFriend.textContent = `<li>${friend.firstName} ${friend.lastName}/li>`;
    ulFrendsList.append(liFriend);
  }

  return ulFrendsList;
}