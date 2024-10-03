function renderMovie(movie) {
    // Seleciona o container onde os filmes serão inseridos
    const moviesContainer = document.querySelector('.movies');

    // Cria o container do filme
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    // Cria a estrutura de informações do filme
    const movieInformations = document.createElement('div');
    movieInformations.classList.add('movie-informations');
    
    // Adiciona a imagem do filme
    const movieImageContainer = document.createElement('div');
    movieImageContainer.classList.add('movie-image');
    const movieImage = document.createElement('img');
    movieImage.src = movie.image;
    movieImage.alt = movie.title;
    movieImageContainer.appendChild(movieImage);
    movieInformations.appendChild(movieImageContainer);

    // Adiciona o texto do filme
    const movieText = document.createElement('div');
    movieText.classList.add('movie-text');
    const movieTitle = document.createElement('h4');
    movieTitle.textContent = `${movie.title} (${movie.year})`;
    movieText.appendChild(movieTitle);
    
    // Adiciona a classificação e a opção de favoritar
    const ratingFavorites = document.createElement('div');
    ratingFavorites.classList.add('rating-favorites');

    const rating = document.createElement('div');
    rating.classList.add('rating');
    const ratingIcon = document.createElement('img');
    ratingIcon.src = './images/Star-icon.png';
    ratingIcon.alt = 'Star Icon';
    const ratingSpan = document.createElement('span');
    ratingSpan.textContent = movie.rating;
    rating.appendChild(ratingIcon);
    rating.appendChild(ratingSpan);
    ratingFavorites.appendChild(rating);

    const favorite = document.createElement('div');
    favorite.classList.add('favorite');
    const favoriteIcon = document.createElement('img');
    favoriteIcon.src = './images/Heart-icon.svg';
    favoriteIcon.alt = 'Heart Icon';
    const favoriteSpan = document.createElement('span');
    favoriteSpan.textContent = movie.isFavorited ? 'Desfavoritar' : 'Favoritar';
    favorite.appendChild(favoriteIcon);
    favorite.appendChild(favoriteSpan);
    ratingFavorites.appendChild(favorite);

    movieText.appendChild(ratingFavorites);
    movieInformations.appendChild(movieText);
    movieElement.appendChild(movieInformations);

    // Adiciona a descrição do filme
    const movieDescription = document.createElement('div');
    movieDescription.classList.add('movie-description');
    const descriptionText = document.createElement('span');
    descriptionText.textContent = movie.description;
    movieDescription.appendChild(descriptionText);
    movieElement.appendChild(movieDescription);

    // Adiciona o filme completo ao container de filmes
    moviesContainer.appendChild(movieElement);
}

// Array de filmes
const movies = [
  {
    image: 'https://img.elo7.com.br/product/original/3FBA809/big-poster-filme-batman-2022-90x60-cm-lo002-poster-batman.jpg',
    title: 'Batman',
    rating: 9.2,
    year: 2022,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    isFavorited: true,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg',
    title: 'Avengers',
    rating: 9.2,
    year: 2019,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    isFavorited: false
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg',
    title: 'Doctor Strange',
    rating: 9.2,
    year: 2022,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    isFavorited: false
  }
];

// Renderiza cada filme dinamicamente
movies.forEach(movie => renderMovie(movie));
