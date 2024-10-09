// js/movies.js
import { toggleFavorite, isFavorite } from './storage.js';

export function renderMovies(movies) {
    const moviesContainer = document.querySelector('.movies');
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const isFav = isFavorite(movie.id);
        const heartIcon = isFav ? '../images/Heart-fill-icon.svg' : '../images/Heart-icon.svg';

        // Verifique se as propriedades existem e não são undefined
        const title = movie.title || "Título não disponível";
        const rating = movie.vote_average || "N/A";
        const overview = movie.overview || "Sem descrição disponível";
        const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '../images/default-poster.png';

        movieElement.innerHTML = `
            <div class="movie-informations">
                <div class="movie-image">
                    <img src="${posterPath}" alt="${title}">
                </div>
                <div class="movie-text">
                    <h2>${title}</h2>
                    <div class="rating-favorites">
                        <div class="rating">
                            <img src="../images/Star-icon.png" alt="Ícone de estrela">
                            <span>${rating}</span>
                        </div>
                        <div class="favorite">
                            <img src="${heartIcon}" alt="Ícone de favorito" class="favorite-icon" data-id="${movie.id}">
                            <span>Favoritar</span>
                        </div>
                    </div>
                </div>
            </div>
            <p class="movie-description">${overview}</p>
        `;

        // Adiciona o evento de clique ao ícone de coração
        movieElement.querySelector('.favorite-icon').addEventListener('click', (e) => {
            const movieId = e.target.getAttribute('data-id');
            toggleFavorite(movieId);
            e.target.src = isFavorite(movieId) ? '../images/Heart-fill-icon.svg' : '../images/Heart-icon.svg';
        });

        moviesContainer.appendChild(movieElement);
    });
}