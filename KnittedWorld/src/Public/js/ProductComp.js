const productInfo = {
    data() {
        return {
            productItem: {},
            cartAPI: this.$root.$refs.cart,
            navAPI: this.$root.$refs.nav,
        }
    },
    methods: {
        getProductInfo(id_product) {
            this.navAPI.activate('product');
            console.log(`GetProductInfo(${id_product})`);
            this.$parent.getJson(`/api/product/${id_product}`)
            .then(data => {
                    console.log(`responded: ${data})`);
                    this.productItem = data;
                    console.log(`porductItem: ${this.productItem.id_product}, ${this.productItem.product_name})`);
                });
        },
    },
    mounted(){
        //this.getProductInfo(1);   

    },
    template:`
    <div v-if="navAPI.semaphore.product" class="product-info-container">
        <div class="product-info">   
            <div class="pr-info-short">
                <img :src="productItem.img" alt="Some image" class="pr-img">
                <h2 class="pr-info-title">
                    {{productItem.product_name}}
                </h2>
                <h3 class="pr-info-price">
                    Цена: {{productItem.price}}₽
                </h3>
                <div class="pr-info-buy">
                    <button class="buy-btn" @click="cartAPI.addProduct(productItem)">
                    <i class="fas fa-shopping-cart"></i></button>
                </div>
            </div>
            <div class="pr-info-details">
                <h3 class="pr-info-size">Размер: </h3> 
                <p class="pr-info-text">{{productItem.size}}</p>
                <h3 class="pr-info-stuff">Материал: </h3>
                <p class="pr-info-text"> {{productItem.stuff}}</p>
                <h3 class="pr-info-descr"> Описание: </h3>
                    <p class="pr-info-text"> {{productItem.description}}</p>
            </div>
        </div>
    </div>
    `
}

export default productInfo;