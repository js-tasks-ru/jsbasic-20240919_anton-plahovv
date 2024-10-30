export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    // ваш код
    //1. Проверка на пустоту product
    if (product === null || product === undefined) {return;}

    //2. Проверка есть ли товар в корзине cartItems
    let cartIndex = this.cartItems.findIndex(item => 
      item.product.id === product.id
    );

    if (cartIndex != -1) {
      this.cartItems[cartIndex].count++;
    }
    else {
      this.cartItems.push({'product': product, 'count': 1});
    }
    //3. 
    this.onProductUpdate(this.cartItems);
  }

  updateProductCount(productId, amount) {
    // ваш код
    //1.Обновить количество единиц товара в массиве cartItems.
    let cartIndex = this.cartItems.findIndex(item => 
      item.product.id === productId
    );
    this.cartItems[cartIndex].count += amount;
    //2.Если количество стало 0, то этот товар нужно удалить из корзины.
    if (this.cartItems[cartIndex].count === 0) {
      this.cartItems.splice(cartIndex, 1);
    }
    //3. 
    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    // ваш код
    let result = this.cartItems.length === 0;
    return result;
  }

  getTotalCount() {
    // ваш код
    let summ = this.cartItems.reduce((sum, current) => sum + current.count, 0);
    return summ;
  }

  getTotalPrice() {
    // ваш код
    let summ = this.cartItems.reduce((sum, current) => sum + current.product.price * current.count, 0);
    return summ;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

