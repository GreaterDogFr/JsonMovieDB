let containerBody = document.getElementById("container")
let carouselContainer = document.getElementById("carouselContainer")
let btnSearch = document.getElementById("btnSearch")

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTdjYzc0OTU1MTQ5YmUyM2RmODM4MTNmMjAxYTRlOCIsInN1YiI6IjYyODM5OGJiZWM0NTUyMTAzMmE5NTcxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.REF4Oi-K06F7Jq8LolG5vPQtyeiGk3nBFdDyL1FLq7E'
    }
};



btnSearch.addEventListener('click', function () {
    let movieSearch = document.getElementById("searchInput").value

    fetch(`https://api.themoviedb.org/3/search/movie?query=${movieSearch}&include_adult=false&language=fr-FR&page=1`, options)

        .then(response => response.json())
        .then(data => {
            const results = data.results;
            console.log(results)
            containerBody.innerHTML = ""
            //? On boucle pour récupérer toutes nos données
            for (let iteration = 0; iteration < results.length; iteration++) {
                const newMovie = document.createElement("a")
                newMovie.setAttribute("href", "movie.html?id=" + results[iteration].id)
                newMovie.setAttribute("class", "movieCard")

                //Affichage du titre
                const newTitle = document.createElement("p")
                newTitle.setAttribute("class", "movieTitle")
                newTitle.innerHTML += results[iteration].title

                //Affichage de l'image
                const newPoster = document.createElement("img")
                newPoster.setAttribute("src", "https://image.tmdb.org/t/p/original/" + results[iteration].poster_path)
                newPoster.setAttribute("class", "moviePoster")

                //Affichage de la Dds
                const newReleaseDate = document.createElement("p")
                newReleaseDate.setAttribute("class", "movieReleaseDate")

                const enFormat = new Date(results[iteration].release_date)
                const options = { year: 'numeric', month: 'long', day: 'numeric' }
                const frFormat = enFormat.toLocaleDateString("fr-FR", options)

                newReleaseDate.innerHTML += frFormat

                //Affichage de la note
                const newMovieRating = document.createElement("p")
                let movieRating = results[iteration].vote_average
                //? Changement de couleur/class selon note
                if (movieRating >= 7) {
                    newMovieRating.setAttribute("class", "movieRating goodRatings")
                } else if (movieRating >= 4 && movieRating < 7) {
                    newMovieRating.setAttribute("class", "movieRating middlingRatings")
                } else if (movieRating < 4) {
                    newMovieRating.setAttribute("class", "movieRating badRatings")
                }
                newMovieRating.innerHTML += movieRating

                containerBody.appendChild(newMovie)
                newMovie.appendChild(newPoster)
                newMovie.appendChild(newTitle)
                newMovie.appendChild(newReleaseDate)
                newMovie.appendChild(newMovieRating)

            }

        })
        .catch(error => console.error('Une erreur s\'est produite :', error));
})

/*
document.addEventListener('DOMContentLoaded', () => {
    // Charger le fichier JSON
    fetch('https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=1', options)
        .then(response => response.json())
        .then(data => {
            const nowPlayingMoviesList = data.results
            for (let iteration = 0; iteration < nowPlayingMoviesList.length; iteration++) {
                const carousel = document.createElement("div")
                carousel.setAttribute("class","carouselContainer")

                const newMovie = document.createElement("a")
                newMovie.setAttribute("href", "movie.html?id=" + nowPlayingMoviesList[iteration].id)
                newMovie.setAttribute("class", "movieCard")

                //Affichage de l'image
                const newPoster = document.createElement("img")
                newPoster.setAttribute("src", "https://image.tmdb.org/t/p/original/" + nowPlayingMoviesList[iteration].poster_path)
                newPoster.setAttribute("class", "moviePoster")

                carouselContainer.appendChild(carousel)
                carousel.appendChild(newMovie)
                newMovie.appendChild(newPoster)

            }
        })
        .catch(error => console.error('Une erreur s\'est produite :', error));

});
*/