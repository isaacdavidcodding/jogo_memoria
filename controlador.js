const controlador = {
    // Variaveis
    cartas: document.querySelectorAll('.memory-card'),

    listaFigurinhas: {
     "FIGURINHAS": [
        {"figura": "anjinho"},
        {"figura": "bidu"},
        {"figura": "cascao"},
        {"figura": "cebolinha"},
        {"figura": "chicobento"},
        {"figura": "docontra"},
        {"figura": "franjinha"},
        {"figura": "jeremias"},
        {"figura": "magali"},
        {"figura": "marina"},
        {"figura": "monica"},
        {"figura": "nimbus"},
        {"figura": "rosinha"},
        {"figura": "sansao"},
        {"figura": "turminha"},
        {"figura": "xaveco"}]
    },
    
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

    },
    
    adicionarEventoClique: (cartas, virarCarta) => { 
        cartas.forEach(carta => carta.addEventListener('click', virarCarta))
    },
    
    render: (template, value) => { return Mustache.render(template, value) },

    renderElement: (rendered, selector) => {
        let node = document.querySelector(selector);
        if (!node) return;
        node.innerHTML = rendered;
    },

    carregarFigurinhas: () => {
        let template = 
        '{{#FIGURINHAS}}' +
            '<div class="jogo-memoria" id="jogo-memoria">' +
                '<div class="carta-memoria">' +
                    '<img class="back-face" ' + 'src=' + '"img/{{figura}}' + '.png"' + ' />' +
                '</div>' +
            '</div>' +
        '{{/FIGURINHAS}}'

        let rendered = controlador.render(template, controlador.listaFigurinhas)
        controlador.renderElement(rendered, '.containerFigurinhas')
    },

    iniciarControle: function() {
        // this.adicionarEventoClique(this.cartas, this.virarCarta.bind(controlador))
        this.carregarFigurinhas()
    }
}   