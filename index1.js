var filmesPorPagina = 10;
var paginaAtual = 1;
    const request = require('request');

    const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/changes?page=1',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmI4OGQ2NWEzZGE3ZDVkOWVlMGViNjk2MGRhNzkwMSIsInN1YiI6IjY1ZjUxOTliZDRkNTA5MDE2NGFhNzU3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8npSSWfFE9BdG5oaeRbtRy8VKirIVikY4KAbNLeEwI8'
    }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });

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

        filmesDiv.appendChild(filmeDiv);
    });
}

window.onload = function() {
    carregarFilmes(paginaAtual);
};