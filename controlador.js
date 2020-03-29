const controlador = {
    temCartaVirada: false, telaTravada: false,
    primeiraCarta: null, segundaCarta: null, 

    render: (template, value) => { return Mustache.render(template, value) },
    
    renderElement: (rendered, selector) => {
        let node = document.querySelector(selector);
        if (!node) return
        node.innerHTML = rendered
    },

    reiniciarQuadro: () => {
       [controlador.cliclouDuasVezes, controlador.telaTravada] = [false, false]
       [controlador.primeiraCarta, controlador.segundaCarta] = [null, null]
    },

    verificaPar: (cartaUm, cartaDois) => {
        let resultado = cartaUm.dataset["informacao"] === cartaDois.dataset["informacao"]
        resultado ? controlador.desabilitarGiro(cartaUm, cartaDois) : controlador.desvirarCartas(cartaUm, cartaDois) 
        controlador.reiniciarQuadro()
    },

    desabilitarGiro: (cartaUm, cartaDois) => {
        cartaUm.removeEventListener('click', controlador.virarCarta)
        cartaDois.removeEventListener('click', controlador.virarCarta)
        controlador.reiniciarQuadro()
    },

    desvirarCartas: (cartaUm, cartaDois) => {
        controlador.telaTravada = true
        setTimeout(() => {
            cartaUm.classList.remove('girar')
            cartaDois.classList.remove('girar')
            controlador.reiniciarQuadro()
        }, 1200)
    },

    virarCarta: (elemento) => {
        if (controlador.telaTravada) return
        if (elemento === controlador.primeiraCarta) return

        elemento.classList.add('girar')
        
        if (!controlador.temCartaVirada) {
            controlador.temCartaVirada = true
            controlador.primeiraCarta = elemento
            return
        } 
        controlador.segundaCarta = elemento
        controlador.verificaPar(controlador.primeiraCarta, controlador.segundaCarta)   
    },

    adicionarEventoClique: () => { 
        let lista = document.querySelectorAll('.cartaMemoria')
        
        lista.forEach(
            atual => atual.addEventListener('click', () => { controlador.virarCarta(atual) })  
        )
    }, 

    embaralhar: (listaCartas) => {
        let indiceAtual = listaCartas.length, valorTemporario, indiceAleatorio;

        /* while (0 !== indiceAtual) {
            indiceAleatorio = Math.floor(Math.random() * indiceAtual);
            indiceAtual--
            valorTemporario = listaCartas[indiceAtual]
            listaCartas[indiceAtual] = listaCartas[indiceAleatorio]
            listaCartas[indiceAleatorio] = valorTemporario  
        }  */

        return listaCartas.map( x => { return {"figura": x} }, listaCartas)
    },

    carregarFigurinhas: () => {
        let listaNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], listaFigurinhas = {"FIGURINHAS": []}

        listaFigurinhas["FIGURINHAS"] = controlador.embaralhar(listaNum)
        Array.prototype.push.apply(listaFigurinhas["FIGURINHAS"], controlador.embaralhar(listaNum))

        let template = 
        '{{#FIGURINHAS}}' +
            '<div class="cartaMemoria" ' + 'data-informacao="{{figura}}"' + '>' +
                '<img class="verso" '  + 'src=' + '"img/verso'      + '.webp"' + ' />' +
                '<img class="frente" ' + 'src=' + '"img/{{figura}}' + '.webp"' + ' />' +
            '</div>' +
        '{{/FIGURINHAS}}'

        let rendered = controlador.render(template, listaFigurinhas)
        controlador.renderElement(rendered, '.containerFigurinhas')  
    },

    iniciarControle: function() {
        this.carregarFigurinhas()
        this.adicionarEventoClique()
    }
}   