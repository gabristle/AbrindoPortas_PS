var paginaAtual = 1;
var filmesPorPagina = 10;

function carregarFilmes(pagina) {
    fetch('https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=' + pagina, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmI4OGQ2NWEzZGE3ZDVkOWVlMGViNjk2MGRhNzkwMSIsInN1YiI6IjY1ZjUxOTliZDRkNTA5MDE2NGFhNzU3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8npSSWfFE9BdG5oaeRbtRy8VKirIVikY4KAbNLeEwI8'
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Ocorreu um erro ao carregar os filmes.');
        }
        return res.json();
    })
    .then(data => {
        exibirFilmes(data.results);
        exibirPaginacao(data.total_pages);
    })
    .catch(err => {
        console.error(err.message);
    });
}

function carregarFilmeDetalhes(filmeId) {
    fetch('https://api.themoviedb.org/3/movie/' + filmeId, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmI4OGQ2NWEzZGE3ZDVkOWVlMGViNjk2MGRhNzkwMSIsInN1YiI6IjY1ZjUxOTliZDRkNTA5MDE2NGFhNzU3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8npSSWfFE9BdG5oaeRbtRy8VKirIVikY4KAbNLeEwI8'
        }
    })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Ocorreu um erro ao carregar os detalhes do filme.');
            }
            return response.json();
        })
        .then(function(data) {
            exibirDetalhesFilme(data);
        })
        .catch(function(error) {
            console.error(error.message);
        });
}

function exibirDetalhesFilme(filme) {
    document.getElementById('filme-title').textContent = filme.title;
    document.getElementById('filme-poster').src = 'https://image.tmdb.org/t/p/w500' + filme.poster_path;
    document.getElementById('filme-overview').textContent = filme.overview;
    document.getElementById('filme-popularidade').textContent = 'Popularidade: ' + filme.popularity;
}

function exibirFilmes(filmes) {
    var filmesDiv = document.getElementById('filmes');
    filmesDiv.innerHTML = '';
    filmes.forEach(function(filme) {
        var filmeDiv = document.createElement('div');
        filmeDiv.classList.add('filme');

        var posterUrl = 'https://image.tmdb.org/t/p/w500' + filme.poster_path;
        var posterImg = document.createElement('img');
        posterImg.src = posterUrl;
        posterImg.classList.add('posters');
        filmeDiv.appendChild(posterImg);
        
        var gradient = document.createElement('div');
        gradient.classList.add('gradient');
        filmeDiv.appendChild(gradient);

        var filmeTitle = document.createElement('h1');
        filmeTitle.textContent = filme.title.toUpperCase();
        filmeDiv.appendChild(filmeTitle);

        filmeDiv.addEventListener('click', function() {
            carregarFilmeDetalhes(filme.id);
        });

        filmesDiv.appendChild(filmeDiv);
    });
}

function exibirPaginacao(totalPaginas) {
    var paginacaoDiv = document.getElementById('paginacao');
    paginacaoDiv.innerHTML = '';

    var inicio = Math.max(1, paginaAtual - 1);
    var fim = Math.min(totalPaginas, paginaAtual + 2);

    var botaoAnterior = document.createElement('button');
    var linkAnterior = document.createElement('a');
    linkAnterior.href = '#';
    linkAnterior.textContent = '<';
    linkAnterior.addEventListener('click', function(event) {
        event.preventDefault();
        if (paginaAtual > 1) {
            paginaAtual--;
            carregarFilmes(paginaAtual);
        }
    });
    botaoAnterior.appendChild(linkAnterior);
    paginacaoDiv.appendChild(botaoAnterior);

    for (var i = inicio; i <= fim; i++) {
        var botaoPagina = document.createElement('button');
        var paginaLink = document.createElement('a');
        paginaLink.href = '#';
        paginaLink.textContent = i;
        paginaLink.dataset.pagina = i;
        paginaLink.addEventListener('click', function(event) {
            event.preventDefault();
            var pagina = parseInt(event.target.dataset.pagina);
            paginaAtual = pagina;
            carregarFilmes(pagina);
        });
        botaoPagina.appendChild(paginaLink);
        paginacaoDiv.appendChild(botaoPagina);
    }

    var botaoProxima = document.createElement('button');
    var linkProxima = document.createElement('a');
    linkProxima.href = '#';
    linkProxima.textContent = '>';
    linkProxima.addEventListener('click', function(event) {
        event.preventDefault();
        if (paginaAtual < totalPaginas) {
            paginaAtual++;
            carregarFilmes(paginaAtual);
        }
    });
    botaoProxima.appendChild(linkProxima);
    paginacaoDiv.appendChild(botaoProxima);
}

window.onload = function() {
    carregarFilmes(paginaAtual);
};