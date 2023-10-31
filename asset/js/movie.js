/*
todo : backdrop
*/
let singleContainer = document.getElementById("singleContainer")
//? Prendre les paramètres passés dans l'URL
let pageURL = new URLSearchParams(window.location.search)
let movieId = pageURL.get('id')

document.addEventListener('DOMContentLoaded', () => {

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MTdjYzc0OTU1MTQ5YmUyM2RmODM4MTNmMjAxYTRlOCIsInN1YiI6IjYyODM5OGJiZWM0NTUyMTAzMmE5NTcxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.REF4Oi-K06F7Jq8LolG5vPQtyeiGk3nBFdDyL1FLq7E'
        }
    };

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=fr-FR`, options)
        .then(response => response.json())
        .then(data => {
            //? Fetch le json
            const movie = data

            const newSingleMovie = document.createElement("div")
            newSingleMovie.setAttribute("class", "singleMovieCard")

            const newContainerInfo = document.createElement("div")
            newContainerInfo.setAttribute("class", "singleContainerInfo")


            //Affichage du titre
            const newSingleTitle = document.createElement("p")
            newSingleTitle.setAttribute("class", "singleMovieTitle")
            newSingleTitle.innerHTML = movie.title

            //Affichage de l'image
            const newSinglePoster = document.createElement("img")
            newSinglePoster.setAttribute("src", "https://image.tmdb.org/t/p/original/" + movie.poster_path)
            newSinglePoster.setAttribute("class", "singleMoviePoster")

            //Affichage de la DdS

            const newSingleReleaseDate = document.createElement("p")
            newSingleReleaseDate.setAttribute("class", "singleMovieReleaseDate")

            const enFormat = new Date(movie.release_date)
            const options = { year: 'numeric', month: 'long', day: 'numeric' }
            const frFormat = enFormat.toLocaleDateString("fr-FR", options)
            newSingleReleaseDate.innerHTML += frFormat

            //Affichage de la note
            const newSingleMovieRating = document.createElement("p")
            newSingleMovieRating.setAttribute("class", "singleMovieRatings")

            //? Changement de couleur/class selon note
            if (movie.vote_average >= 7) {
                newSingleMovieRating.innerHTML += "Note des utilisateurs : <span class='goodRatings'>" + movie.vote_average + "</span>"
            } else if (movie.vote_average >= 4 && movie.vote_average < 7) {
                newSingleMovieRating.innerHTML += "Note des utilisateurs : <span class='middlingRatings'>" + movie.vote_average + "</span>"
            } else if (movie.vote_average < 4) {
                newSingleMovieRating.innerHTML += "Note des utilisateurs : <span class='badRatings'>" + movie.vote_average + "</span>"
            }

            // Affichage du Synopsis
            const newSingleSynopsis = document.createElement("p")
            newSingleSynopsis.setAttribute("class", "singleMovieSynopsis")
            newSingleSynopsis.innerHTML = "<span>Synopsis</span> <br>"
            newSingleSynopsis.innerHTML += movie.overview


            singleContainer.appendChild(newSingleMovie)
            newSingleMovie.appendChild(newSinglePoster)
            newSingleMovie.appendChild(newContainerInfo)
            newContainerInfo.appendChild(newSingleTitle)
            newContainerInfo.appendChild(newSingleReleaseDate)
            newContainerInfo.appendChild(newSingleMovieRating)
            newContainerInfo.appendChild(newSingleSynopsis)
        })
})