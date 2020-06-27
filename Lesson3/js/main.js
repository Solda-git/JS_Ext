const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ
let getRequest = (url, cb) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
                console.log('Error');
            } else {
                cb(xhr.responseText);
            }
        }
    };
    xhr.send();
};


////Lesson 3. Task 1///////////
///////////////////////////////
////getRequest modified////////
///////////////////////////////

let getPromisesRequest = (url) => {
    return new Promise((res, rej) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status !== 200) {
                rej('Error in getPromisesRequest accured.');
            } else {
                res(xhr.responseText);
            }
        }
    };
    xhr.send();
    })  
};
///////////////////////////////
///////////////////////////////
///////////////////////////////

class ProductList {
    // #privateProp;

    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        // this.#privateProp = '123';
        // this.#fetchProducts();
        this._fetchProducts();
        //this._getProducts()
        //    .then(data => {
        //        this.goods = [...data];
        //        this.render();
        //    });
        //Lesson 3. Task 1

    }
    // Описываем по новому геттер для удобного получения данных. Обращаемся как к обычному свойству объекта
    // get prop() {
    //     return this.#privateProp;
    // }
    // Аналогично можно описать сеттер. Аналогичное обращение.
    // set prop(value) {
    //     this.#privateProp = value;
    // }

    // По старинке пишем метод-геттер
    // getProp() {
    //     return this.#privateProp;
    // }

    // #fetchProducts() {
    //     this.goods = [
    //         {id: 1, title: 'Notebook', price: 20000},
    //         {id: 2, title: 'Mouse', price: 1500},
    //         {id: 3, title: 'Keyboard', price: 5000},
    //         {id: 4, title: 'Gamepad', price: 4500},
    //     ]
    // }


    _fetchProducts() {
 //       getRequest(`${API}/catalogData.json`, (data) => {
 //            const goods = JSON.parse(data);
 //            console.log(goods);
 //            this.goods = [...goods];
 //            this.render();
 //        });

////Lesson 3. Task 1///////////
///////////////////////////////
//getRequest modified handler//
///////////////////////////////
        getPromisesRequest(`${API}/catalogData.json`)
        .then(data => {
            const goods = JSON.parse(data);
             console.log(goods);
             this.goods = [...goods];
             this.render();
         })
        .catch(error => {
            console.log(`Bad xhr respose: ${error}`);
        })
 }
///////////////////////////////
///////////////////////////////
///////////////////////////////
    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(response => response.json())
            .catch(error => {
                console.log(error);
            });
    }
    calcSum() {
        return this.goods.reduce((sum, good) => sum + good.price, 0);
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
    }
}

new ProductList();

// const products = [
//   {id: 1, title: 'Notebook', price: 20000},
//   {id: 2, title: 'Mouse', price: 1500},
//   {id: 3, title: 'Keyboard', price: 5000},
//   {id: 4, title: 'Gamepad', price: 4500},
// ];
//
// const renderProduct = (item, img='https://placehold.it/200x150') => `<div class="product-item" data-id="${this.id}">
//               <img src="${img}" alt="Some img">
//               <div class="desc">
//                   <h3>${item.title}</h3>
//                   <p>${item.price} \u20bd</p>
//                   <button class="buy-btn">Купить</button>
//               </div>
//           </div>`;
//
// const renderProducts = list => {
//   document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
// };

// renderProducts(products);

