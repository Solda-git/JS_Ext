const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        filtered: [],
        imgCatalog: ['https://placehold.it/200x150',
                     'https://placehold.it/50x100'],
        searchLine: '',
        cartUrl: '/getBasket.json',
        cart:[],
        isVisibleCart: false,
        noProductsFiltered: false,
        noProductsMessage: "Нет данных"
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product){
            console.log(product.id_product);
        },
        filterGoods(){
            console.log(`Method filterGoods activated. Looking for ${this.searchLine}`);
            const regexp = new RegExp(this.searchLine, 'i'); 
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            this.products.forEach(el => {
                const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
                if (!this.filtered.includes(el)) {
                    block.classList.add('invisible');
                } else {
                    block.classList.remove('invisible');
                }
            });
            if (!this.filtered.length){
                this.noProductsFiltered = true;
            } else {
                this.noProductsFiltered = false;
            }
        }

    },
    beforeCreate() {
        console.log('beforeCreate');
    },
    created() {
        console.log('created');
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            });
         console.log('Product catalog loaded.');
         this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                const cartData = [...data.contents];    
                for(let el of cartData){
                    this.cart.push(el);
                }
            });
        console.log('Basket content loaded.');
    },
    beforeMount() {
        console.log('beforeMount');
    },
    mounted(){
        console.log('mounted');
  
    },
    beforeUpdate() {
        console.log('beforeUpdate');
    },
    updated() {
        console.log('updated');
    },
    beforeDestroy() {
        console.log('beforeDestroy');
    },
    destroyed() {
        console.log('destroyed');
    }
});
