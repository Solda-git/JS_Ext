
const product = {
    props: ['product'],
    data() {
      return {
          /**
           * Создали ссылку на API нашей корзины. Т.к. все компоненты у нас регистрируются в корневом экземпляре Vue,
           * то мы легко можем получить доступ к ним используя свойство $root.
           * $parent можно использовать для доступа к родительскому экземпляру из дочернего.
           */
          cartAPI: this.$root.$refs.cart,
          productAPI: this.$root.$refs.productinfo,
      };
    },

    template: `
    <div class="product-item">
                <img :src="product.img" class="product-item-img" alt="Some img" @click="productAPI.getProductInfo(product.id_product)">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p><strong>Цена: </strong>{{product.price}} ₽</p>
                    <button class="buy-btn" @click="cartAPI.addProduct(product)">
                    <i class="fas fa-shopping-cart"></i></button>
                </div>
            </div>
    `
}

const products = {
    components: { product },
    data(){
        return {
            catalogUrl: '',
            products: [],
            filtered: [],
            navAPI: this.$root.$refs.nav,
        }
    },
    methods: {
        filter(value){
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson('/api/products')
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div v-if="navAPI.semaphore.products"  class="products">
            <product ref="refref" v-for="item of filtered" :key="item.id_product" :product="item"></product>
        </div>
    `
}
export default products;