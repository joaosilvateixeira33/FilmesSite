import { APIKey } from './config.js';

function getFavoriteMovies() {
    const favorites = localStorage.getItem('favoriteMovies');
    return favorites ? JSON.parse(favorites) : [];
}

function saveToLocalStorage(movies) {
    localStorage.setItem('favoriteMovies', JSON.stringify(movies));
}

function isFavorite(movieId) {
    const favoriteMovies = getFavoriteMovies();
    return favoriteMovies.includes(movieId);
}

function toggleFavorite(movieId, iconElement) {
    let favoriteMovies = getFavoriteMovies();

    if (isFavorite(movieId)) {
        favoriteMovies = favoriteMovies.filter(id => id !== movieId);
        iconElement.src = '../images/Heart-icon.svg'; // Ícone de coração vazio
    } else {
        favoriteMovies.push(movieId);
        iconElement.src = '../images/Heart-fill-icon.svg'; // Ícone de coração preenchido
    }

    saveToLocalStorage(favoriteMovies);
}

function renderMovies(movies) {
    const moviesContainer = document.querySelector('.movies');
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const isFav = isFavorite(movie.id);
        const heartIcon = isFav ? '../images/Heart-filled-icon.svg' : '../images/Heart-icon.svg';

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
                            <img src="${heartIcon}" alt="Ícone de favorito" class="favorite-icon" data-id="${movie.id}">
                            <span>Favoritar</span>
                        </div>
                    </div>
                </div>
            </div>
            <p class="movie-description">${movie.overview}</p>
        `;

        // Adiciona o evento de clique ao ícone de coração
        movieElement.querySelector('.favorite-icon').addEventListener('click', (e) => {
            const movieId = e.target.getAttribute('data-id');
            toggleFavorite(movieId, e.target);
        });

        moviesContainer.appendChild(movieElement);
    });
}

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

document.querySelector('.searchIcon').addEventListener('click', () => {
    const movieName = document.getElementById('movie-name').value;
    if (movieName) {
        searchMovies(movieName).then(renderMovies);
    } else {
        getPopularMovies().then(renderMovies);
    }
});

document.getElementById('movie-name').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const movieName = document.getElementById('movie-name').value;
        if (movieName) {
            searchMovies(movieName).then(renderMovies);
        } else {
            getPopularMovies().then(renderMovies);
        }
    }
});

document.getElementById('movie-name').addEventListener('input', () => {
    const movieName = document.getElementById('movie-name').value;
    if (!movieName) {
        getPopularMovies().then(renderMovies);
    }
});

getPopularMovies().then(renderMovies)