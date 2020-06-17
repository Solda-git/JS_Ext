// комментарии к домашке.
//Задание 1. для аккуратности, простоты и скорости использовал компоненты bootstrap:
// - стилизовал меню и карточку товара без использования css
//Задание 2
// - добавил 2 параметра по умолчанию: currency и картинка продукта/товара.
// - скоратил (упростил) запись:
//    -- убрал () во внешней стрелочной функции - т.к. у нее только 1 параметр;
//    -- убрал () во внутренней стрелочной функции - т.к. у нее только 1 параметр;
//    -- убрал {}  и return во внутренней стрелочной функции - т.к. у нее только 1 оператор
//Задание 3
//Чтобы избавиться при рендеринге от запятых, я объединил массив строк, который возвращается методом map(), с помощью
// встроенного метода массива - join() 

const products = [
    {id: 1, title: 'Notebook', price: 20000},
    {id: 2, title: 'Mouse', price: 1500},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500},
];

const renderProduct = (title, price, currency = 'руб', img = 'img/proxy.jpg') => {
                                                                                    //task #1,#2
     return `<div class="card product-item" style="width: 18rem;">                  
      <img src=${img} class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${price} ${currency}.</p>                                  
        <a href="#" class="btn btn-primary buy-btn">Добавить в корзину</a>
      </div>
    </div>
    <br>`       
};

//const renderProducts = (list) => {
//      const productList = list.map((item) => {
//        return renderProduct(item.title, item.price);
//    });
   
const renderProducts = list => {                                                    //task #2
    const productList = list.map(item => renderProduct(item.title, item.price));    //task #2    
    document.querySelector('.products').innerHTML = productList.join(' ');          //task #3
};

renderProducts(products);
