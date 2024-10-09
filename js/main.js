// js/main.js
import { getPopularMovies, searchMovies } from './API.js';
import { renderMovies } from './movies.js';
import { getFavoriteMovies } from './storage.js';

// Event listeners
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

// Checkbox de favoritos
const favoriteCheckbox = document.querySelector('#onlyFavorites');
favoriteCheckbox.addEventListener('change', function () {
    if (favoriteCheckbox.checked) {
        const favoriteMovies = getFavoriteMovies();
        renderMovies(favoriteMovies);
    } else {
        getPopularMovies().then(renderMovies);
    }
});

// Carregar filmes populares na inicialização
// js/main.js
import { getPopularMovies, searchMovies } from './API.js';
import { renderMovies } from './movies.js';
import { getFavoriteMovies } from './storage.js';

// Event listeners
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

// Checkbox de favoritos
const favoriteCheckbox = document.querySelector('#onlyFavorites');
favoriteCheckbox.addEventListener('change', function () {
    if (favoriteCheckbox.checked) {
        const favoriteMovies = getFavoriteMovies();
        renderMovies(favoriteMovies);
    } else {
        getPopularMovies().then(renderMovies);
    }
});

// Carregar filmes populares na inicialização
>>>>>>> 2d26d01974c9df2731596722903a70accbbbfc98
getPopularMovies().then(renderMovies);