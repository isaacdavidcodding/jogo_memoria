const controlador = {
    // Variaveis
    cartas: document.querySelectorAll('.memory-card'),

    sequencia: [],
    
    quadroTravado: false,
    temCartaVirada: false,

    primeiraCarta: null, 
    segundaCarta: null,

    /*
    (function shuffle() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 12)
            card.style.order = randomPos
        })
    })(), */

    // Funcoes
    

    desvirarCartas: () => {
        lockBoard = true
        setTimeout(() => {
            primeiraCarta.classList.remove('flip')
            segundaCarta.classList.remove('flip')
            resetarQuadro()
        }, 1500)
    },

    desabilitarCartas: () => {
        primeiraCarta.removeEventListener('click', virarCarta)
        segundaCarta.removeEventListener('click', virarCarta)
        resetarQuadro()
    },

    checarCombinacao: () => {
        let isMatch = primeiraCarta.dataset.framework === segundaCarta.dataset.framework

        isMatch ? desabilitarCartas() : unflipCards()
    },

    resetarQuadro: () => {
        [temCartaVirada, quadroTravado] = [false, false]
        [primeiraCarta, segundaCarta] = [null, null]
    },

    render: (template, value) => { return Mustache.render(template, value) },

    virarCarta: () => {
        /* if (this.quadroTravado) return

        if (this === this.primeiraCarta) return   

        // this.classList.add('flip')

        if (!this.temCartaVirada) {
            this.temCartaVirada = true
            this.primeiraCarta = this

            return
        } 

        this.segundaCarta = this
        checarCombinacao() */

        console.log(this)
    },
    
    adicionarEventoClique: (cartas, virarCarta) => { 
        cartas.forEach(carta => carta.addEventListener('click', virarCarta))
    },

    iniciarControle: function() {
        this.adicionarEventoClique(this.cartas, this.virarCarta.bind(controlador))
    }
}