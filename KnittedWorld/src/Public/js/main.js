import {cart, cartBox} from './CartComp'
import products  from './ProductsComp'
import productInfo  from './ProductComp'
import search from './FilterComp'
import error from './ErrorComp'
import feedback from './FeedbackComp'
import navigation from './NavComp'
import about from './AboutComp'

const app = new Vue({
    el: '#app',
    components: {
        cart,
        cartBox,
        products,
        productInfo,
        search,
        error,
        feedback,
        navigation,
        about,
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
              .catch(error => {
                  this.$refs.error.setError(error);
              });
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
              .catch(error => {
                  this.$refs.error.setError(error);
              });
        },
        deleteJson(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
              .catch(error => {
                  console.log('deleteJson call error accured.');
                  this.$refs.error.setError(error);
              });
        },
    },
});

export default app;