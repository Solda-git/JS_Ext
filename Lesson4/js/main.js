
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переведено на промисы
// let getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open("GET", url, true);
//         xhr.onreadystatechange = () => {
//             if(xhr.readyState === 4){
//                 if(xhr.status !== 200){
//                     reject('Error');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         };
//         xhr.send();
//     })
// };

/**
 * Описываем базовые классы
 */
class List {
    constructor(url, container, list = listContext) {
        this.container = container;
        this.list = list; // словарь для классов строка 213
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this.filtered = []; // отфильтрованные товары
        this._init();
    }

    /**
     * получение данных с сервера
     * @param url
     * @returns {Promise<any | never>}
     */
    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    /**
     * обработка полученных данных
     * @param data
     */
    handleData(data) {
        this.goods = [...data];
        this.render();
    }

    /**
     * подсчет стоимости всех товаров
     * @returns {*|number}
     */
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            console.log(this.constructor.name);

            // if (this.constructor.name === 'ProductList') {
            //     const productObj = new ProductItem();
            // } else {
            //     const productObj = new CartItem();
            // }

            const productObj = new this.list[this.constructor.name](product);
            console.log(productObj);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }

    /**
     * метод поиска товаров
     * @param value - поисковый запрос
     */
    filter(value) {
        const regexp = new RegExp(value, 'i'); // /ноут/i
        this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
        this.allProducts.forEach(el => {
            const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
            if (!this.filtered.includes(el)) {
                block.classList.add('invisible');
            } else {
                block.classList.remove('invisible');
            }
        })
    }

    _init() {
        return false
    }
}

class Item {
    constructor(el, img = 'https://placehold.it/200x150') {
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img;
    }

    render() {
        return ``;
    }
}

/**
 * Наследуемся от базовых классов
 */
class ProductsList extends List {
    constructor(cart, container = '.products', url = "/catalogData.json") {
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }

    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('buy-btn')) {
                this.cart.addProduct(e.target);
            }
        });
        document.querySelector('.search-form').addEventListener('submit', e => {
            e.preventDefault();
            this.filter(document.querySelector('.search-field').value)
        })
    }


}

class ProductItem extends Item {
    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} ₽</p>
                    <button class="buy-btn"
                    data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>`;
    }
}

class Cart extends List {
    constructor(container = ".cart-block", url = "/getBasket.json") {
        super(url, container);
        this.getJson()
            .then(data => {
                this.handleData(data.contents);
            });
    }

    /**
     * добавление товара
     * @param element
     */
    addProduct(element) {
        this.getJson(`${API}/addToBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find) {
                        find.quantity++;
                        this._updateCart(find);
                    } else {
                        let product = {
                            id_product: productId,
                            price: +element.dataset['price'],
                            product_name: element.dataset['name'],
                            quantity: 1
                        };
                        // goods - это своего рода "опорный" массив, отражающий список товаров, которые нужно отрендерить.
                        // При добавлении нового товара, нас интересует только он один.
                        this.goods = [product];
                        // далее вызывая метод render, мы добавим в allProducts только его, тем самым избегая лишнего перерендера.
                        this.render();
                    }
                } else {
                    alert('Error');
                }
            })
    }

    /**
     * удаление товара
     * @param element
     */
    removeProduct(element) {
        this.getJson(`${API}/deleteFromBasket.json`)
            .then(data => {
                if (data.result === 1) {
                    let productId = +element.dataset['id'];
                    let find = this.allProducts.find(product => product.id_product === productId);
                    if (find.quantity > 1) { // если товара > 1, то уменьшаем количество на 1
                        find.quantity--;
                        this._updateCart(find);
                    } else { // удаляем
                        this.allProducts.splice(this.allProducts.indexOf(find), 1);
                        document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                    }
                } else {
                    alert('Error');
                }
            })
    }

    /**
     * обновляем данные корзины
     * @param product
     * @private
     */
    _updateCart(product) {
        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
        block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
        block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
    }

    _init() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('invisible');
        });
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('del-btn')) {
                this.removeProduct(e.target);
            }
        })
    }

}

class CartItem extends Item {
    constructor(el, img = 'https://placehold.it/50x100') {
        super(el, img);
        this.quantity = el.quantity;
    }

    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
                    <div class="product-bio">
                        <img src="${this.img}" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">${this.product_name}</p>
                            <p class="product-quantity">Количество: ${this.quantity}</p>
                            <p class="product-single-price">${this.price} за ед.</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">${this.quantity * this.price} ₽</p>
                        <button class="del-btn" data-id="${this.id_product}">&times;</button>
                    </div>
                </div>`;
    }
}


const listContext = {
    ProductsList: ProductItem,
    Cart: CartItem
};

let cart = new Cart();
new ProductsList(cart);


/////////////////////////////////////////////////////
//////lesson4///////////////////////////////////////
///////task1////////////////////////////////////////

let task1 = document.querySelector('.task1')
let testText = document.querySelector('.input_text')
let resultText = document.querySelector('.output_text')
let str = testText.textContent;

task1.addEventListener('click', () => {
    resultText.textContent = str.replace(new RegExp('\'','mg'),'"');
})
///////task2////////////////////////////////////////
let task2 = document.querySelector('.task2')
task2.addEventListener('click', () => {
    str = str.replace(new RegExp('\'([^a-zA-Z])','mg'),'"');
    resultText.textContent = str.replace(new RegExp('([^a-zA-Z])\'','mg'),'"');
})
///////task3////////////////////////////////////////
const regExpressions = {
    fname: /([^a-zA-Zа-яА-я])/gm,
    fphone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
    femail: /^[a-zA-Z]+[-\.]?[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/,
}
document.querySelector('.feedback').addEventListener('change', e => {
    let isInvalid = false;
    let elemId = e.target.id;
    isInvalid = !(regExpressions[elemId].test(e.target.value));
    isInvalid = (elemId == 'fname') ? !isInvalid : isInvalid;    
    if (e.target.value != '') { 
        decorate(isInvalid ? true : false, elemId);
    } else {
        decorate(false, elemId);
    }
})

function decorate(color, elem) {
    let block1 = document.querySelector(`#${elem}`);
    let block2 = document.querySelector(`.${elem}`);
    if (color) {
        block1.classList.add('red');
        block2.classList.remove('invisible');   
    } else {
        block1.classList.remove('red');
        block2.classList.add('invisible');   
    }        
}

document.querySelector('.feedback').addEventListener('reset', () => {
    for (elem in regExpressions) {
        decorate(false, elem); 
    }
})