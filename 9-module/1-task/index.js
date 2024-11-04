export default function promiseClick(button) {
  // ваш код...
  let promise = new Promise(resolve => {
    button.addEventListener('click', (event) => {
      resolve(event);}, { once: true });
  });

  return promise.then(result => result);
}
