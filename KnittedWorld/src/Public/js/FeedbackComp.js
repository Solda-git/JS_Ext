
const feedback = {
    data(){
        return {
            navAPI: this.$root.$refs.nav,
        };
    },
    methods: {

    },
    template: `
        <div v-if="navAPI.semaphore.feedback" class="feedback-container">
            <div class="feedback">
                <h3 class="f-head-title">Напишите нам, о каких игушках вы мечтаете... или о чем-нибудь другом 
                </h3>
                <div class="feedback-form">
                    <div class="f-form-container">
                        <div class="f-form-content">
                            <h3 class="f-"><span>*</span>Ваше имя:</h3>
                            <input  class="f-form-name" type="text">
                            <h3  class="f-"><span>*</span>Ваш e-mail:</h3>
                            <input  class="f-form-email" type="email">
                            <h3  class="f-">Ваш мобильный телефон:</h3>
                            <input  class="f-form-mob" type="text">
                            <h3  class="f-">Тема сообщения:</h3>
                            <input  class="f-form-subject" type="text">
                        </div>    
                        <div class="f-message">
                            <h3  class="f-"><span>*</span>Текст сообщения:</h3>     
                            <textarea class="f-text-message" rows="15"> </textarea>    
                        </div>
                    </div>
                    <button type="button" class="buy-btn f-form-button">Отправить</button>
                </div>
                <h3>Об игрушках Knitted World вы можете узнать также в
                    <a href="https://www.instagram.com/knitted_world_sd/"> Инстаграм.</a>
                </h3>
            </div>    
        </div>
    `,
}
export default feedback;