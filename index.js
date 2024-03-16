function carregarFilmes() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Parse da resposta JSON
                var resposta = JSON.parse(xhr.responseText);
                exibirFilmes(resposta.results);
            } else {
                console.error('Ocorreu um erro ao carregar os filmes.');
            }
        }
    };
    // Substitua 'SUA_CHAVE_DE_API' pela sua chave de API
    var url = 'https://api.themoviedb.org/3/movie/popular?api_key=5fb88d65a3da7d5d9ee0eb6960da7901';

    xhr.open('GET', url, true);
    xhr.send();
};

function exibirFilmes(filmes) {
    var filmesDiv = document.getElementById('filmes');
    filmes.forEach(function(filme) {
        var filmeElement = document.createElement('div');
        filmeElement.textContent = filme.title;
        filmesDiv.appendChild(filmeElement);
    });
}

window.onload = function() {
    carregarFilmes();
};