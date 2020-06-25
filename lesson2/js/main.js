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

// Lesson 2
// Task 3. 
// Hamburger


class HambSize {
    constructor(sizeType, price, calories) {
        this.sizeType = sizeType;
        this.price = price;
        this.calories = calories;
    }
    getSizeProperty(prop){
        switch(prop) {
            case(sizeType): return this.sizeType;
            case(price): return this.price;
            case(calories): return this.calories;
            return 'Error. Wrong property.'
        }
    }
    setSizeProperties(sizeType = this.sizeType, price = this.price, calories = this.calories) {
        this.sizeType = sizeType;
        this.price = price;
        this.calories = calories;
    }
}

class HambStuffing {
    constructor(stuffingType, price, calories) {
        this.stuffingType = stuffingType;
        this.price = price;
        this.calories = calories;
    }

    getStuffingProperty(prop){
        switch(prop) {
            case(stuffingType): return this.stuffingType;
            case(price): return this.price;
            case(calories): return this.calories;
            return 'Error. Wrong property.'
        }
    }
    setStuffingProperties(stuffingType = stuffingType, price = this.price, calories = this.calories) {
        this.stuffingType = stuffingType;
        this.price = price;
        this.calories = calories;
    }

} 

class HambTopping {
    constructor(toppingType, price, calories) {
        this.toppingType = toppingType;
        this.price = price;
        this.calories = calories;
    }  

    getToppingProperty(prop){
        switch(prop) {
            case(toppingType): return this.toppingType;
            case(price): return this.price;
            case(calories): return this.calories;
            return 'Error. Wrong property.'
        }
    }
    setToppingProperties(toppingType = this.toppingType, price = this.price, calories = this.calories) {
        this.toppingType = toppingType;
        this.price = price;
        this.caloriesthis.calories = calories;
    }
} 

class Hamburger {
  constructor(size, stuffing) { 
    this.size = size;
    this.stuffing = stuffing;
    this.toppings = [];
    this.calories = this.calculateCalories();
    this.price = this.calculatePrice();
  }
  addTopping(toppingType, price, calories) {    // Добавить добавку 
    this.toppings.push(new HambTopping(toppingType, price, calories));
  }
  removeTopping(toppingType) { // Убрать добавку 
    const index = this.toppings.findIndex(item => item.toppingType = toppingType);
    if (index >= 0) {
        delete this.toppings[index]; 
    }
    this.toppings.splice(index,1);

  }
  getToppings() {   // Получить список добавок 
    return toppings;
  }
  getSize() {       // Узнать размер гамбургера
    return this.size;            
  }
  getStuffing() {   // Узнать начинку гамбургера 
    return this.stuffing;
  }
  calculatePrice() {       // Узнать цену 
    let price = 0;
    this.toppings.forEach(item => price += item.price);
    return this.size.price + this.stuffing.price + price;
  }
  calculateCalories() {    // Узнать калорийность 
    let cals = 0;
    this.toppings.forEach(item => cals += item.calories);
    return this.size.calories + this.stuffing.calories + cals;
  }
}


let size, stuffing, hamburger;
//= new HambTopping("",0,0);


function setBurgerSize(event){
    if (!size) {
            size = new HambSize(event.target.id, +event.target.dataset.price, +event.target.dataset.cals);
        }
    else {
        size.setSizeProperties(event.target.id, +event.target.dataset.price, +event.target.dataset.cals);
    }    

    if (stuffing) {
        if (!hamburger) {
            hamburger = new Hamburger(stuffing, size);
        }
    }
}

function setBurgerStuffing(event){
    if (!stuffing) {
            stuffing = new HambStuffing(event.target.id, +event.target.dataset.price, +event.target.dataset.cals);
        }
    else {
        stuffing.setStuffingProperties(event.target.id, +event.target.dataset.price, +event.target.dataset.cals);
    }    

    if (size) {
        if (!hamburger) {
            hamburger = new Hamburger(stuffing, size);
        }   
    }
}

function setBurgerTopping(event){
    const checked = event.target.checked;
    if (!stuffing || !size) {
            alert('Firts you need to choose the size and the stuffing of your hamburger.');
            event.target.checked = !checked;
            return -1;
        }

    if (!hamburger) {
        hamburger = new Hamburger(stuffing, size);
    }
    
    if (checked) {
       hamburger.addTopping(event.target.id, +event.target.dataset.price, +event.target.dataset.cals); 
    }
    else {
       hamburger.removeTopping(event.target.id);     
    }
}

function getPriceCals() {
    let summary; 
    if (!stuffing || !size) {
            summary = `<h2> Firts you need to choose the size and the stuffing of your hamburger. <h2>`;
        }
    else {    
        if (!hamburger) {
            hamburger = new Hamburger(stuffing, size);
        }
        summary = `<h2> Your hamburger's price is ${hamburger.calculatePrice()} \u20bd (${hamburger.calculateCalories()} calories).
        Bonne appetit! </h2>` ;
    }
    const block = document.querySelector('.summary');
    block.innerHTML = summary; 
}