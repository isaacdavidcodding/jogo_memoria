const controlador = {
    cliclouDuasVezes: false,
    primeiraCarta: null, segundaCarta: null,

    render: (template, value) => { return Mustache.render(template, value) },
    
    renderElement: (rendered, selector) => {
        let node = document.querySelector(selector);
        if (!node) return
        node.innerHTML = rendered
    },

    virarCarta: (elemento) => {
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
                setTimeout(() => {
                    controlador.primeiraCarta.classList.remove('girar')
                    controlador.segundaCarta.classList.remove('girar')
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

    carregarFigurinhas: () => {
        let listaFigurinhas = { "FIGURINHAS": [] }

        for (let x = 1; x <= 12; x++) 
            listaFigurinhas["FIGURINHAS"].push({"figura": x, "id": x}) 
        
        for (let x = 1; x <= 12; x++)
            listaFigurinhas["FIGURINHAS"].push({"figura": x, "id": 12 + x}) 

        let template = 
        '{{#FIGURINHAS}}' +
            '<div class="cartaMemoria" ' + 'data-informacao="{{figura}}"' + '>' +
                '<img class="verso" '  + 'id="{{id}}" ' + 'src=' + '"img/verso'      + '.webp"' + ' />' +
                '<img class="frente" ' + 'id="{{id}}" ' + 'src=' + '"img/{{figura}}' + '.webp"' + ' />' +
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