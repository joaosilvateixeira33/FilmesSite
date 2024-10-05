import { APIKey } from './config.js';

// Função para buscar os filmes populares
async function getPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=pt-BR&page=1`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro ao buscar filmes');
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Função para buscar filmes com base no nome digitado pelo usuário
async function searchMovies(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=${query}&language=pt-BR&page=1`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro ao buscar filmes');
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Função para renderizar os filmes
function renderMovies(movies) {
    const moviesContainer = document.querySelector('.movies');
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = `
            <div class="movie-informations">
                <div class="movie-image">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                </div>
                <div class="movie-text">
                    <h2>${movie.title}</h2>
                    <div class="rating-favorites">
                        <div class="rating">
                            <img src="../images/Star-icon.png" alt="Ícone de estrela">
                            <span>${movie.vote_average}</span>
                        </div>
                        <div class="favorite">
                            <img src="../images/Heart-icon.svg" alt="Ícone de favorito" onclick="toggleFavorite(this)">
                            <span>Favoritar</span>
                        </div>
                    </div>
                </div>
            </div>
            <p class="movie-description">${movie.overview}</p>
        `;

        moviesContainer.appendChild(movieElement);
    });
}

// Função para capturar a busca de filmes pelo nome
document.querySelector('.searchIcon').addEventListener('click', () => {
    const movieName = document.getElementById('movie-name').value;
    if (movieName) {
        searchMovies(movieName).then(renderMovies);
    } else {
        getPopularMovies().then(renderMovies); // Se campo vazio, retorna filmes populares
    }
});

// Captura da tecla "Enter" no campo de pesquisa
document.getElementById('movie-name').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const movieName = document.getElementById('movie-name').value;
        if (movieName) {
            searchMovies(movieName).then(renderMovies);
        } else {
            getPopularMovies().then(renderMovies); // Se campo vazio, retorna filmes populares
        }
    }
});

// Adiciona um evento para monitorar mudanças no campo de input (campo vazio retorna os filmes populares)
document.getElementById('movie-name').addEventListener('input', () => {
    const movieName = document.getElementById('movie-name').value;
    if (!movieName) {
        getPopularMovies().then(renderMovies); // Se campo vazio, retorna filmes populares
    }
});

// Exibe os filmes populares ao carregar a página
getPopularMovies().then(renderMovies);