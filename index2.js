function carregarFilmeDetalhes(filmeId) {
    fetch('https://api.themoviedb.org/3/movie/' + filmeId, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmI4OGQ2NWEzZGE3ZDVkOWVlMGViNjk2MGRhNzkwMSIsInN1YiI6IjY1ZjUxOTliZDRkNTA5MDE2NGFhNzU3NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8npSSWfFE9BdG5oaeRbtRy8VKirIVikY4KAbNLeEwI8'
        }
    })
    .then(function(res) {
        if (!res.ok) {
            throw new Error('Ocorreu um erro ao carregar os detalhes do filme.');
        }
        return res.json();
    })
    .then(function(data) {
        console.log(data);
        exibirDetalhesFilme(data);
    })
    .catch(function(error) {
        console.error(error.message);
    });
}

function exibirDetalhesFilme(filme) {
    document.getElementById('filme-title').textContent = filme.title;
    document.getElementById('filme-poster').src = 'https://image.tmdb.org/t/p/w500' + filme.poster_path;
    document.getElementById('filme-sinopse').textContent = filme.overview;
    document.getElementById('filme-lancamento').textContent = filme.release_date;
    document.getElementById('filme-situacao').textContent = filme.status;
    document.getElementById('filme-duracao').textContent = filme.runtime;
    document.getElementById('filme-idioma').textContent = filme.original_language;
    document.getElementById('filme-caixa').textContent = filme.budget;
    document.getElementById('filme-renda').textContent = filme.revenue;
    document.getElementById('filme-lucro').textContent = filme.revenue - filme.budget;
}

window.onload = function() {
    var urlParams = new URLSearchParams(window.location.search);
    var filmeId = urlParams.get('id');

    carregarFilmeDetalhes(filmeId);
};