Vue.component('cart', {
    data(){
      return {
          cartUrl: '/getBasket.json',
          cartItems: [],
          amount: 0,
          countGoods: 0,
          showCart: false,
      }
    },
    methods: {

        addProduct(product){
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1});
                find.quantity++;                                // дописать .then!!! Возможно, является причиной глюка!!!
                this.updateTotals();
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson('/api/cart', prod)
                  .then(data => {
                      if (data.result === 1) {
                          this.cartItems.push(prod);
                          this.updateTotals();
                      }
                  });
            }
        },
        ///////////////////////Lesson 7///////////////////////////
        remove(product) {

            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find.quantity>1) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: -1}); // дописать .then!!! Возможно, является причиной глюка!!!
                find.quantity--;
                this.updateTotals();
            } else {
                this.$parent.deleteJson('/api/cart', product)
                .then(data => {
                    if (data.result === 1) {
                        this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        this.updateTotals();
                    }
                });   
            }
        },
        updateTotals() {
            let totalCost = 0;
            let goodsAmount = 0;
            console.log(this.cartItems[0].quantity);
            for (let el of this.cartItems) {
                totalCost = totalCost + el.quantity*el.price;
                goodsAmount += el.quantity;    
            }  
            this.amount = totalCost;
            this.countGoods = goodsAmount;
        },
    },
        ////////////////////////////////////////////////////////////////
    mounted(){
        this.$parent.getJson('/api/cart')
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
                this.amount = +(data.amount);
                this.countGoods =+ (data.countGoods);
            });
    },
    template: `
        <div>
            <button class="btn-cart" type="button" @click="showCart = !showCart">
            <i class="fas fa-shopping-cart"></i> </button>
            <div class="cart-block" v-show="showCart">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item"
                @remove="remove">
                </cart-item>
            </div>
        </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
                <div class="cart-item">
                <div class="product-bio">
                    <img :src="cartItem.img.slice(0, cartItem.img.lastIndexOf('.jpg'))+'_s.jpg'" alt="Some image">
                    <div class="product-desc">
                        <p class="product-title">{{cartItem.product_name}}</p>
                        <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                        <p class="product-single-price">{{cartItem.price}}₽ за единицу</p>
                    </div>
                </div>
                <div class="right-block">
                    <p class="product-price">{{cartItem.quantity*cartItem.price}}₽</p>
                    <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                </div>
            </div>
    `
});

Vue.component('cart-box', {
    data(){
        return {
            cartAPI: this.$root.$refs.cart,
            showCartBox: true, //false - после программирования меню по умолчанию должно быть не видимо.
        }
      },
      template: `
      <div class="cart-box-container">    
            <div class="cart-box">
                <h1>Ваши покупки: </h1>
                    <tr>
                        <td class="t-img t-header">Товар</td>
                        <td class="t-pr-name"></td>
                        <td class="t-price t-header">Цена</td>
                        <td class="t-amount t-header">Количество</td>
                        <td class="t-total t-header">Стоимость</td>
                        <td class="t-total">Удалить</td>
                    </tr>
                    <cart-box-item class="cart-box-item" 
                    v-for="item of cartAPI.cartItems" 
                    :key="item.id_product"
                    :cart-box-item="item">
                    </cart-box-item>
                <div class="cart-details">
                    <h2 class="cart-info"> Количество покупок: </h2>
                    <h3 class="cart-info">{{cartAPI.countGoods}}</h3>
                    <h2 class="cart-info"> Стоимость заказа: </h2>
                    <h3 class="cart-info">{{cartAPI.amount}}₽</h3>
                    <button type="button" class="buy-btn">Оформить</button>
                </div>       
            </div>
        </div> 
      `
});

Vue.component('cart-box-item', {
    props: ['cartBoxItem'],
    template: `
      <div class="cart-box-item">
            <tr>
                <td class="t-img"><img :src="cartBoxItem.img.slice(0, cartBoxItem.img.lastIndexOf('.jpg'))+'_s.jpg'" alt="Some image"> </td>
                <td class="t-pr-name">{{cartBoxItem.product_name}}</td>
                <td class="t-price"> {{cartBoxItem.price}}₽</td>
                <td class="t-amount">
                    <i class="fas fa-chevron-circle-left"></i>
                    {{cartBoxItem.quantity}}
                    <i class="fas fa-chevron-circle-right"></i> 
                </td>
                <td class="t-total">{{cartBoxItem.quantity*cartBoxItem.price}}₽</td>
                <td class="t-delete"><i class="fas fa-times-circle"></i></td>
            </tr>
      </div> 
      `
});