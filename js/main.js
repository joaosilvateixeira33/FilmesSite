import { APIKey } from './config.js';

async function getPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=pt-BR&page=1`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro ao buscar filmes');
        const data = await response.json();
        return data.results; // Retorna os filmes
    } catch (error) {
        console.error('Erro:', error);
    }
}

function renderMovies(movies) {
  const moviesContainer = document.querySelector('.movies');
  moviesContainer.innerHTML = ''; // Limpa o conteúdo anterior

  movies.forEach(movie => {
      // Cria o elemento de cada filme
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');

      // Monta o HTML interno de cada filme
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

      // Adiciona o filme ao container
      moviesContainer.appendChild(movieElement);
  });
}

getPopularMovies().then(renderMovies);
