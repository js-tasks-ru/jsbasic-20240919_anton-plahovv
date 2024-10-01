function isEmpty(obj) {
  /*
  // 1 вариант
  let result = true;

  for (let key in obj) {
    result = false;
    break;
  }
    
  return result;
  */
  // 2 вариант :
  return Object.keys(obj).length == 0; 
}
