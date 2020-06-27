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
        ///////////////////////////////////////////////////////////
        this.title = product.product_name; // Lesson 3: bug  fixed!
        ///////////////////////////////////////////////////////////
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




// Lesson 3
// Task 2. 
// some methods implemented
// class basketItem
class BasketItem {
    constructor (productId, name, price, amount = 1) {
        //this.id = id;                       // id (number) of basket item record (1, 2, 3, 4, ... etc)
        this.productId = productId;         // product ID of basket item record
        this.name = name;                   // name of basket item
        this.price = price;                 // price of basket item
        this.amount = amount;               // amount of basket item
    }
 
    render() {                                 
// rendering of items, f.e. in table format within basket 
        return `<div class="basket-item" data-id="${this.id}">
                    <div class="desc">
                        
                        <p>Product ID: <strong>${this.productId}</strong>
                        <p>Description: <strong>${this.name}</strong>
                        <p>price: <strong>${this.price}</strong>
                        <p>amount: <strong>${this.amount}</strong>
                    </div>
                </div>`;
    }
}
// class basket
class Basket {
    constructor(container = '.basket') {
        this.container = container;
        this.basketItems = [];
        this.amount = 0;
        this.countGoods = 0;
        this.render();                       
    }
    //properties
    render() {                              
        const elem = document.querySelector('.basket');
        for (let item of this.basketItems) { 
            elem.insertAdjacentHTML('beforeend', item);
        }
    }  

    getBasket() {
        fetch(`${API}/getBasket.json`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.amount = data.amount;
                this.countGoods = data.countGoods;
                data.contents.forEach((item, i) => {
                     let bItem = new BasketItem(item.id_product,
                                               item.product_name,
                                                item.price,
                                               item.quantity);  
                    this.basketItems.push(bItem);
                });
            })
            .catch(error => console.log(error));
            console.log(this);

    }



    calcItems () {                          
    // calculates number of different items (records) within the basket     
        return this.basketGoods.length;
    }

    isInBasket (productId) {                
//returns true if product with productId is in basket, otherwise false

    }



    addBasketItem (productId, name, price, amount) {
// checks if the Item is already in the basket. If basket contains it
// just increments "amount" property, otherwise creates and adds new BasketItem to the Basket
        fetch(`${API}/addToBasket.json`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.result === 1) { //if 1 - the item added successfully on the server side
                                         // the "basket" object is also able to add item to itself
                    let index = this.basketItems.findIndex(item => item.productId === productId);
                     this.amount += amount*price;
                    this.countGoods += amount;
                    if (index >= 0) {
                        this.basketItems[index].amount += amount;  
                    } else {
                        this.basketItems.push(new BasketItem(productId,
                                                             name,
                                                             price,
                                                             amount));
                    }
                } else {
                    new Promise((res, rej) => {
                        throw new Error("Bad insert basket item response.");//!!! как штатно обработать???
                    });
                }
                console.log(this);
            })
            .catch(error => console.log(`Error by adding basket item: ${error}`));
            console.log(this);
    }




    delBasketItem (productId, amount = 1) {
// checks the amount of Item with specified productId in the basket. If the basket contains more 
// then 1 aomunt of Item - just decrement "amount" property. If there is only one item in the basket -
// deletes productItem from the basket and calls renewId function 
         fetch(`${API}/deleteFromBasket.json`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.result === 1) { //if 1 - the item deleted successfully on the server side
                                         // the "basket" object is also able to delete item
                     let index = this.basketItems.findIndex(item => item.productId === productId);
                     if (index < 0) {
                        new Promise((res, rej) => {
                        throw new Error("There are no such product in the Basket.");//!!! как штатно обработать???
                    });   
                    } else if (this.basketItems[index].amount < amount) {
                        new Promise((res, rej) => {
                        throw new Error("Not enought product in the Basket.");//!!! как штатно обработать???
                        })
                    } else  {
                        let iPrice = this.basketItems[index].price;
                        if (this.basketItems[index].amount === amount) {
                            delete this.basketItems[index];
                            this.basketItems.splice(index, 1);
                        } else {
                        this.basketItems[index].amount -= amount;
                        }                        
                        this.countGoods -= amount;
                        this.amount -= iPrice*amount;
                    } 
                console.log(this);
                }
            })
            .catch(error => console.log(`Error by deleting basket item: ${error}`));
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

new ProductList();
 
let basket; 

let btn1 = document.querySelector("#getBasketBtn");
btn1.addEventListener('click', (event) => {
    console.log(`Button ${event.target.id} pressed.`)
    basket = new Basket();
    basket.getBasket();
})

let btn2 = document.querySelector("#addBasketBtn");

btn2.addEventListener('click', (event) => {
    console.log(`Button ${event.target.id} pressed.`)
    if (basket === undefined) {
        basket = new Basket();
        basket.getBasket();
    }
    basket.addBasketItem(123, "Ноутбук", 45600, 2)
})

let btn3 = document.querySelector("#delBasketBtn");
btn3.addEventListener('click', (event) => {
    console.log(`Button ${event.target.id} pressed.`)
    if (basket === undefined) {
        basket = new Basket();
        basket.getBasket();
    }
    basket.delBasketItem(123,1);
})