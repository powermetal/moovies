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

const toImages = images => {
    return {
        backdrops: images.backdrops.map(i => movieImage(i.file_path)),
        posters: images.posters.map(i => movieImage(i.file_path))
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
        poster: movieImage(m.poster_path, POSTER_SIZE),
        rating: m.vote_average * 10
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

const toKeyword = k => {
    return {
        id: k.id,
        name: k.name
    }
}

const toMovieDetails = (details, credits, videos, keywords, images, relatedMovies) => {
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
        crew: credits.crew.map(p => toCrew(p)),
        originalLanguage: details.original_language,
        revenue: details.revenue,
        status: details.status,
        budget: details.budget,
        keywords: keywords.map(k => toKeyword(k)),
        images: toImages(images),
        relatedMovies: relatedMovies.map(r => toMovie(r))
    }
}

export const getMovie = id => {
    const details = moviedb.get(`/movie/${id}`)
    const credits = moviedb.get(`/movie/${id}/credits`)
    const videos = moviedb.get(`/movie/${id}/videos`)
    const keywords = moviedb.get(`/movie/${id}/keywords`)
    const images = moviedb.get(`/movie/${id}/images`)
    const relatedMovies = moviedb.get(`/movie/${id}/similar`)

    return axios.all([details, credits, videos, keywords, images, relatedMovies])
        .then(axios.spread((...responses) => {
            const [detailsResponse, creditsResponse, videosResponse, keywordsResponse, imagesResponse, relatedMoviesResponse] = responses
            const results = toMovieDetails(
                detailsResponse.data,
                creditsResponse.data,
                videosResponse.data.results,
                keywordsResponse.data.keywords,
                imagesResponse.data,
                relatedMoviesResponse.data.results
            )
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