import { APIKey } from './config.js';

export async function getPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${APIKey}&language=pt-BR&page=1`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro ao buscar filmes');
        const data = await response.json();
        console.log(data);
        return data.results;
    } catch (error) {
        console.error('Erro:', error);
    }
}

export async function searchMovies(query) {
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