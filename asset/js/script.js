/*
Todo: récupérer les titres, les dates de sorties, les notes, les posters

*/
let containerBody = document.getElementById("container")
let debugJson = document.getElementById("debug")

document.addEventListener('DOMContentLoaded', () => {
    // Charger le fichier JSON
    fetch('movies.json')
        .then(response => response.json())
        .then(data => {
            const results = data.results;
            console.log(results)
            //? On boucle pour récupérer toutes nos données
            //? Titre, Poster, Note, Date de sortie. gogogogo
            for (let iteration = 0; iteration < results.length; iteration++) {
                const newMovie = document.createElement("a")
                newMovie.setAttribute("href", "movie.html?id=" + iteration)
                newMovie.setAttribute("class", "movieCard")

                //Affichage du titre
                const newTitle = document.createElement("p")
                newTitle.setAttribute("class", "movieTitle")
                newTitle.innerHTML += results[iteration].title

                //Affichage de l'image
                const newPoster = document.createElement("img")
                newPoster.setAttribute("src", "https://image.tmdb.org/t/p/original/" + results[iteration].poster_path)
                newPoster.setAttribute("class", "moviePoster")

                //Affichage de la DdS
                //Todo: réorganiser la DdS pour un affichage français
                const newReleaseDate = document.createElement("p")
                newReleaseDate.setAttribute("class", "movieReleaseDate")
                newReleaseDate.innerHTML += results[iteration].release_date

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


            //? Debugging !
            // const jsonData = JSON.stringify(data, null, 2);
            // debugJson.textContent = jsonData
            // console.log(data)
        })
        .catch(error => console.error('Une erreur s\'est produite :', error));
});