Vue.component('navigation', {
    data(){
        return {};
    },
    methods: {

    },
    template: `
        <div class="navigation">
            <nav> 
                <button type="button" class="nav-btn" @click="">Главная </button>
                <button type="button" class="nav-btn" @click="">Каталог </button>
                <button type="button" class="nav-btn" @click="">Корзина </button>
                <button type="button" class="nav-btn" @click="">Контакты</button>
            </nav>
        </div>
    `,
});