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
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1})
                .then(data => {
                    if (data.result === 1) {
                        find.quantity++;                                
                        this.updateTotals();
                    }
                });                
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
        remove(product, quantity=1) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            console.log(find.quantity);
            if (find.quantity>quantity) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: -quantity})
                .then(data => {
                    if (data.result === 1) {
                        find.quantity -= quantity;
                        this.updateTotals();
                    }
                });             
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
            for (let el of this.cartItems) {
                totalCost = totalCost + el.quantity*el.price;
                goodsAmount += el.quantity;    
            }  
            this.amount = totalCost;
            this.countGoods = goodsAmount;
        },
        delDump(cartItem, quantity) {
            // console.log('delDump report');
            // console.log(cartItem);
            // console.log(quantity);
        }
    },

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
            navAPI: this.$root.$refs.nav,
            showCartBox: true, //false - после программирования меню по умолчанию должно быть не видимо.
        }
      },
      template: `
      <div v-if="navAPI.semaphore.cartBox" class="cart-box-container">    
            <div class="cart-box">
                <h1>Ваши покупки: </h1>
                    <tr>
                        <td class="t-img t-header">Товар</td>
                        <td class="t-pr-name"></td>
                        <td class="t-pr-size t-header">Размер</td>
                        <td class="t-price t-header">Цена</td>
                        <td class="t-amount t-header">Количество</td>
                        <td class="t-total t-header">Стоимость</td>
                        <td class="t-delete">Удалить</td>
                    </tr>
                    <cart-box-item class="cart-box-item" 
                    v-for="item of cartAPI.cartItems" 
                    :key="item.id_product"
                    :cart-box-item="item">
                    </cart-box-item>
                <div class="cart-details">
                    <h3 class="cart-info"> Количество покупок: </h3>
                    <h2 class="cart-info cart-count-goods">{{cartAPI.countGoods}}</h2>
                    <h3 class="cart-info"> Стоимость заказа: </h3>
                    <h2 class="cart-info cart-amount">{{cartAPI.amount}}₽</h2>
                    <button type="button" class="buy-btn">Оформить</button>
                </div>       
            </div>
        </div> 
      `
});

Vue.component('cart-box-item', {
    props: ['cartBoxItem'],
    data(){
        return {
            cartAPI: this.$root.$refs.cart,
        }
    },        
    template: `
      <div class="cart-box-item">
            <tr>
                <td class="t-img"><img :src="cartBoxItem.img.slice(0, cartBoxItem.img.lastIndexOf('.jpg'))+'_s.jpg'" alt="Some image"> </td>
                <td class="t-pr-name">{{cartBoxItem.product_name}}</td>
                <td class="t-pr-size">{{cartBoxItem.size}}</td>
                <td class="t-price"> {{cartBoxItem.price}}₽</td>
                <td class="t-amount">
                    <button type="button" @click="cartAPI.remove(cartBoxItem)"> <i class="fas fa-chevron-circle-left"></i></button>
                    {{cartBoxItem.quantity}}
                    <button type="button" @click="cartAPI.addProduct(cartBoxItem)"> <i class="fas fa-chevron-circle-right"></i></button> 
                </td>
                <td class="t-total">{{cartBoxItem.quantity*cartBoxItem.price}}₽</td>
                <td class="t-delete" @click="cartAPI.remove(cartBoxItem, cartBoxItem.quantity)"><i class="fas fa-times-circle"></i></td>
            </tr>
      </div> 
      `
});