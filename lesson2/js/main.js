class ProductList {
    #privateProp;

    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this.#privateProp = '123';
        this.fetchProducts();
        this.render();
    }
    // Описываем по новому геттер для удобного получения данных. Обращаемся как к обычному свойству объекта
    get prop() {
        return this.#privateProp;
    }
    // Аналогично можно описать сеттер. Аналогичное обращение.
    set prop(value) {
        this.#privateProp = value;
    }

    // По старинке пишем метод-геттер
    // getProp() {
    //     return this.#privateProp;
    // }

    fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 20000},
            {id: 2, title: 'Mouse', price: 1500},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500},
        ]
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }

////////////////////////////////////////////
// Lesson 2.
// Task 2.
    getSum() {
        let sum = 0;
        for (let product of this.goods) {
            sum += product.price;
        }
        return sum;
    } 
////////////////////////////////////////////
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

const list = new ProductList();

// Lesson 2
// Task 1. 
// class basketItem
class BasketItem {
    constructor (id, productId, name, price, amount = 1) {
        this.id = id;                       // id (number) of basket item record (1, 2, 3, 4, ... etc)
        this.productId = productId;         // product ID of basket item record
        this.name = name;                   // name of basket item
        this.price = price;                 // price of basket item
        ths.amount = amount;               // amount of basket item
    }
 
    render() {                                 
// rendering of items, f.e. in table format within basket 
    }
}
// class basket

class Basket {
    constructor(container = '.basket') {
        this.container = container;
        this.basketGoods = [];
        this.basketItems = [];
        this.render();                       
    }
    //properties
    render() {                              
// builds basket table in specified container 
// and if the basket is not empty calls BasketItem render function
// for each item to fulfill the basket table   
    }  

    calcItems () {                          
    // calculates number of different items (records) within the basket     
        return this.basketGoods.length;
    }

    isInBasket (productId) {                
//returns true if product with productId is in basket, otherwise false

    }

    addBasketItem (productId) {
// checks if the Item is already in the basket. If basket contains it
// just increments "amount" property, otherwise creates and adds new BasketItem to the Basket
    }

    delBasketItem (productId) {
// checks the amount of Item with specified productId in the basket. If the basket contains more 
// then 1 aomunt of Item - just decrement "amount" property. If there is only one item in the basket -
// deletes productItem from the basket and calls renewId function 
    }
    renewId (id) {
//  renews all IDs of BasketItems after specified id
    }
    deleteBasketItem (productId) {
// deletes BasketItem record with specified productId
    }
    clearBasket() {
// deletes all basket items from the basket 
    } 

    placeOrder() {
 //calls appropiate function to place an order according to the basket content       
    }

    calcBasketSum() {
//calculates total sum of the basket
    }
}
