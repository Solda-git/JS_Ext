const about = {
    data(){
        return {
            navAPI: this.$root.$refs.nav,
        };
        
    },
    methods: {

    },
    template: `
        <div v-if="navAPI.semaphore.about" class="about">
            <div class="about-box">
                <h2 class="welcome">welcome to</h2>
                <h1 class="knitted">knitted world</h1>
                <h3 class="toys-header">авторские вязаные игрушки</h3>
                <p class="author"><strong>автор и дизайнер - Скороглядова Дарья</strong></p>
                <p class="about-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Mauris imperdiet ultricies enim vitae mattis. Integer malesuada purus eget eros malesuada fermentum. 
                    Morbi scelerisque metus et quam iaculis condimentum. Quisque at sollicitudin lorem. Vivamus id commodo dui. 
                    Vivamus a hendrerit ipsum, eget bibendum magna. Vestibulum mollis leo leo, vitae euismod ante dictum sit amet. 
                    Cras purus tellus, convallis eget arcu vel, egestas pulvinar eros. Ut arcu ligula, iaculis sit amet fermentum 
                    at, lacinia non nunc. Praesent lobortis lorem nisi, in efficitur dolor auctor in. Proin bibendum pulvinar neque.
                </p> 
            </div>
        </div>
    `,
}
export default about;