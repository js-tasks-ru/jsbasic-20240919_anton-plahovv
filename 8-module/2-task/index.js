import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.render();
    this.filters = {};
    this.update();
  }

  matchFilters = {
    noNuts: 'nuts',
    vegeterianOnly: 'vegeterian',
    maxSpiciness: 'spiciness',
    category: 'category'
  };

  render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">
          <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
        </div>
      </div>
    `);
  }

  filtredProduct() { 
    let filtredProduct = [];
    for (let product of this.products) {
      let hide = 0;
      let show = 0;
      // нет активных фильтров, показываем все
      if (Object.keys(this.filters).length == 0) {
        show++;
      }

      for (let filter in this.filters) {
        let filtervalue = this.filters[filter];
        let prop = this.matchFilters[filter];

        if (filter == 'noNuts' && filtervalue == true) {
          if (product.hasOwnProperty(prop) && product[prop] == true) {
            hide++; break;
          }
          else { show++; }
        }
        else if (filter == 'vegeterianOnly' && filtervalue == true) {
          if (product.hasOwnProperty(prop) && product[prop] == true) {
            show++;
          }
          else { hide++; break;}
        }
        else if (filter == 'maxSpiciness') {
          if (product.hasOwnProperty(prop) && product[prop] <= filtervalue) {
            show++;
          }
          else { hide++; break;}
        }
        if (filter == 'category' && filtervalue != '') {
          if (product.hasOwnProperty(prop) && product[prop] == filtervalue) {
            show++;
          }
          else { hide++; break;}
        }
        else {show++;}
      }

      if (show > 0 && hide == 0) {
        filtredProduct.push(product);
      }
    }
    return filtredProduct;
  }

  appendProduct(products) {
    products.forEach(product => {
      this.sub('inner').appendChild(new ProductCard(product).elem);
    });
  }

  updateFilter(filters) {
    //обновляем фильтр this.filters
    Object.assign(this.filters, filters);
    //обновляем список по фильтру
    this.update();
  }

  clear() {
    let productsGrid = document.querySelector('.products-grid__inner');
    if (productsGrid) {
      while (productsGrid.firstChild) {
        productsGrid.removeChild(productsGrid.firstChild);
      }
    }
  }

  update() {
    this.clear();

    let products = this.filtredProduct();
    this.appendProduct(products);
  }

  sub(className) {
    return this.elem.querySelector(`.products-grid__${className}`);
  }
}
