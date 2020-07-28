const navigation = {
    data(){
        return {
            semaphore: {
                about: true,
                cartBox: false,
                products: true,
                product: false,
                feedback: false
            },
        }
    },
    methods: {
        activate(mode){
            const el = document.querySelector('.products-title');
            switch(mode) {
                case 'main':
                    this.semaphore.about = true; 
                    this.semaphore.cartBox = false;
                    this.semaphore.products = true;
                    this.semaphore.product = false;
                    this.semaphore.feedback = false;
                    el.classList.remove('invisible');
                    break;
                case 'catalog':     
                    this.semaphore.about = false; 
                    this.semaphore.cartBox = false;
                    this.semaphore.products = true;
                    this.semaphore.product = false;
                    this.semaphore.feedback = false;
                    el.classList.remove('invisible');
                    break;
                case 'cartBox':        
                    this.semaphore.about = false; 
                    this.semaphore.cartBox = true;
                    this.semaphore.products = true;
                    this.semaphore.product = false;
                    this.semaphore.feedback = false;
                    el.classList.remove('invisible');
                    break;
                case 'feedback':     
                    this.semaphore.about = true; 
                    this.semaphore.cartBox = false;
                    this.semaphore.products = false;
                    this.semaphore.product = false;
                    this.semaphore.feedback = true;
                    el.classList.add('invisible');
                    break;
                case "product": 
                    this.semaphore.about = false; 
                    this.semaphore.cartBox = false;
                    this.semaphore.products = true;
                    this.semaphore.product = true;
                    this.semaphore.feedback = false;   
                    break;
                default: 
                    this.semaphore.about = true; 
                    this.semaphore.cartBox = false;
                    this.semaphore.products = true;
                    this.semaphore.product = false;
                    this.semaphore.feedback = false;
                    el.classList.remove('invisible');
                    
            }
        },
    },
    mounted(){
        //this.activate('main');
    },
    template: `
        <div class="navigation">
            <nav> 
                <button type="button" class="nav-btn" @click="activate('main')">Главная </button>
                <button type="button" class="nav-btn" @click="activate('catalog')">Каталог </button>
                <button type="button" class="nav-btn" @click="activate('cartBox')">Корзина </button>
                <button type="button" class="nav-btn" @click="activate('feedback')">Контакты</button>
            </nav>
        </div>
    `,
}

export default navigation;