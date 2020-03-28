const controlador = {
    cliclouDuasVezes: false,
    primeiraCarta: null, segundaCarta: null,
    telaTravada: false,

    render: (template, value) => { return Mustache.render(template, value) },
    
    renderElement: (rendered, selector) => {
        let node = document.querySelector(selector);
        if (!node) return
        node.innerHTML = rendered
    },

    virarCarta: (elemento) => {
        if (controlador.telaTravada || elemento === controlador.primeiraCarta) return

        elemento.classList.add('girar')
        
        if (!controlador.cliclouDuasVezes) {
            controlador.cliclouDuasVezes = true
            controlador.primeiraCarta = elemento
        } else {
            controlador.cliclouDuasVezes = false
            controlador.segundaCarta = elemento
            
            if (controlador.primeiraCarta.dataset["informacao"] === controlador.segundaCarta.dataset["informacao"]) {
                controlador.primeiraCarta.removeEventListener('click', controlador.virarCarta)
                controlador.segundaCarta.removeEventListener('click', controlador.virarCarta)
            } else {
                controlador.telaTravada = true
                setTimeout(() => {
                    controlador.primeiraCarta.classList.remove('girar')
                    controlador.segundaCarta.classList.remove('girar')
                    controlador.telaTravada = false
                }, 1500)
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

        while (0 !== indiceAtual) {
            indiceAleatorio = Math.floor(Math.random() * indiceAtual);
            indiceAtual--
            valorTemporario = listaCartas[indiceAtual]
            listaCartas[indiceAtual] = listaCartas[indiceAleatorio]
            listaCartas[indiceAleatorio] = valorTemporario  
        } 

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