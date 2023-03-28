const express = require('express');
const router = express.Router();
const axios = require('axios');

//using dotenv
if (process.env.NODE_ENV != 'production') {
  require('dotenv').config()
}
const apiKey = process.env.API_KEY;

async function fetchTopRatedMovies() {
  const language = 'en-US';

  let currentPage = 1;
  let topRatedMovies = [];
  //fetch top 100 movies from TMDB website with English languages.This loop going for all pages to get data
  while (topRatedMovies.length < 100) {
    const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated', {
      params: {
        api_key: apiKey,
        language,
        page: currentPage,
      },
    });
    //I set a filter for original language of the movie for English
    const movies = response.data.results.filter(movie => movie.original_language === 'en');
    topRatedMovies = [...topRatedMovies, ...movies];

    currentPage++;
  }

  return topRatedMovies.slice(0, 100);
}


router.get('/', async (req, res) => {
  const topRatedMovies = await fetchTopRatedMovies();
  res.render('bestmovies', { movies: topRatedMovies });
});



module.exports = router;

