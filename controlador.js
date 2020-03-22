const controlador = {
    // Variaveis
    

    /*
    (function shuffle() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 12)
            card.style.order = randomPos
        })
    })(), */

    // Funcoes
   /*  desvirarCartas: () => {
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
    }, */

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
    
   /*  adicionarEventoClique: (cartas, virarCarta) => { 
        cartas.forEach(carta => carta.addEventListener('click', virarCarta))
    }, */
    
    render: (template, value) => { return Mustache.render(template, value) },

    renderElement: (rendered, selector) => {
        let node = document.querySelector(selector);
        if (!node) return;
        node.innerHTML = rendered;
    },

    carregarFigurinhas: () => {
        let listaFigurinhas = { "FIGURINHAS": [] }

        for (let x = 1; x <= 12; x++) 
            listaFigurinhas["FIGURINHAS"].push({"figura": x, "id": x}) 
        
        for (let x = 1; x <= 12; x++)
            listaFigurinhas["FIGURINHAS"].push({"figura": x, "id": 12 + x}) 

        let template = 
        '{{#FIGURINHAS}}' +
            '<div class="cartaMemoria">' +
                '<img class="verso" ' + 'id="{{id}}" ' + 'src=' + '"img/verso' + '.webp"' + ' />' +
                '<img class="frente" ' + 'id="{{id}}" ' + 'src=' + '"img/{{figura}}' + '.webp"' + ' />' +
            '</div>' +
        '{{/FIGURINHAS}}'

        let rendered = controlador.render(template, listaFigurinhas)
        controlador.renderElement(rendered, '.containerFigurinhas')
    },

    iniciarControle: function() {
        this.carregarFigurinhas()
        // this.adicionarEventoClique(this.cartas, this.virarCarta.bind(controlador))
    }
}   