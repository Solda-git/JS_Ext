Vue.component('error', {
    
    data(){
        return {
            errorMessage: '',
            showError: false,
        }
    },

    template:  `
        <div class='error-block' v-show="showError">
            <h1> Ошибка приложения:</h1>
            <p>{{errorMessage}}</p>
            <button class="er-button" @click="showError=false"> Закрыть </button>
        </div>
        `
});
