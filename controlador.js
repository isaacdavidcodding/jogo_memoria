const controlador = {
    
    adicionarEventoClique: () => { 
        let lista = document.querySelectorAll('.cartaMemoria')
        console.log(lista)

    }, 
    
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
        this.adicionarEventoClique()
    }
}   