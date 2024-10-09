export function getFavoriteMovies() {
    const favorites = localStorage.getItem('favoriteMovies');
    return favorites ? JSON.parse(favorites) : [];
}

export function saveToLocalStorage(movies) {
    localStorage.setItem('favoriteMovies', JSON.stringify(movies));
}

export function isFavorite(movieId) {
    const favoriteMovies = getFavoriteMovies();
    return favoriteMovies.includes(movieId);
}

export function toggleFavorite(movieId) {
    let favoriteMovies = getFavoriteMovies();

    if (isFavorite(movieId)) {
        favoriteMovies = favoriteMovies.filter(id => id !== movieId);
    } else {
        favoriteMovies.push(movieId);
    }

    saveToLocalStorage(favoriteMovies);
}
