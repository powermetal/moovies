import axios from 'axios';
import noimg from '../images/noimg.png';
import nocastimg from '../images/nocastimg.png';

const KEY = '57a5a9ae326f1c29514a7197e6eb9ccd';
const POSTER_SIZE = 'w500'

const moviedb = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: KEY
    }
})

const movieImage = (path, size = 'original') => {
    if (path !== null)
        return `https://image.tmdb.org/t/p/${size}${path}`;
    return noimg;
}

const personImage = (path) => {
    if (path !== null)
        return `https://image.tmdb.org/t/p/w138_and_h175_face${path}`
    return nocastimg;
}

const toGenre = genre => {
    return {
        id: genre.id,
        name: genre.name
    }
}

const toVideo = video => {
    return {
        key: video.key,
        site: video.site,
        type: video.type
    }
}

const toDirector = crew => {
    const director = crew.find(e => e.job === 'Director')
    return director ? director.name : ''
}

const toMovie = m => {
    return {
        id: m.id,
        title: m.title,
        overview: m.overview,
        date: m.release_date,
        poster: movieImage(m.poster_path, POSTER_SIZE)
    }
}

const toCast = p => {
    return {
        name: p.name,
        role: p.character,
        photo: personImage(p.profile_path)
    }
}

const toCrew = p => {
    return {
        name: p.name,
        role: p.job,
        photo: personImage(p.profile_path)
    }
}

const toMovieDetails = (details, credits, videos) => {
    return {
        ...toMovie(details),
        backdrop: movieImage(details.backdrop_path),
        genres: details.genres.map(genre => toGenre(genre)),
        tagline: details.tagline,
        userScore: details.vote_average,
        duration: details.runtime,
        director: toDirector(credits.crew),
        videos: videos.map(video => toVideo(video)),
        cast: credits.cast.map(p => toCast(p)),
        crew: credits.crew.map(p => toCrew(p))
    }
}

export const getMovie = id => {
    const details = moviedb.get(`/movie/${id}`)
    const credits = moviedb.get(`/movie/${id}/credits`)
    const videos = moviedb.get(`/movie/${id}/videos`)

    return axios.all([details, credits, videos])
        .then(axios.spread((...responses) => {
            const [detailsResponse, creditsResponse, videosResponse] = responses
            const results = toMovieDetails(detailsResponse.data, creditsResponse.data, videosResponse.data.results)
            return results;
        }))
}

export const searchMovie = (query, page) => {
    return moviedb.get('/search/movie', { params: { query, page } })
        .then(response => {
            return {
                results: response.data.results.map(m => toMovie(m)),
                page: response.data.page,
                totalPages: response.data.total_pages
            }
        })
}