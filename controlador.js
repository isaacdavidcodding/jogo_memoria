const controlador = {
    primeiraCarta: null, segundaCarta: null, travaClique: false,

    render: (template, value) => { return Mustache.render(template, value) },
    
    renderElement: (rendered, selector) => {
        let node = document.querySelector(selector);
        if (!node) return
        node.innerHTML = rendered
    },

    reiniciarQuadro: () => {
        [controlador.primeiraCarta, controlador.segundaCarta, controlador.travaClique] = [null, null, false] 
    },

    desvirarCartas: (cartaUm, cartaDois) => {
        controlador.travaClique = true
        setTimeout(() => {
            cartaUm.classList.remove('girar')
            cartaDois.classList.remove('girar')
            cartaUm.classList.remove('primeira')
            cartaDois.classList.remove('segunda')
            controlador.reiniciarQuadro()
        }, 1200)
    },

    desabilitarGiro: (cartaUm, cartaDois) => {
        cartaUm.removeEventListener('click', controlador.virarCarta)
        cartaDois.removeEventListener('click', controlador.virarCarta)
        cartaUm.dataset["informacao"] = cartaDois.dataset["informacao"] = 'encontrouPar'
        controlador.reiniciarQuadro()
    },

    verificaPar: (cartaUm, cartaDois) => {
        let resultado = cartaUm.dataset["informacao"] === cartaDois.dataset["informacao"]
        resultado ? controlador.desabilitarGiro(cartaUm, cartaDois) : controlador.desvirarCartas(cartaUm, cartaDois) 
    },

    virarCarta: (elemento) => {
        if (controlador.travaClique) return

        if (elemento.dataset["informacao"] != 'encontrouPar') {
            if (!controlador.primeiraCarta) {
                elemento.classList.add('girar')
                elemento.classList.add('primeira')
                controlador.primeiraCarta = elemento
            } else if (!controlador.segundaCarta && !elemento.classList.contains('primeira')) {
                elemento.classList.add('girar')
                elemento.classList.add('segunda')
                controlador.segundaCarta = elemento
                controlador.verificaPar(controlador.primeiraCarta, controlador.segundaCarta) 
            }
        }
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