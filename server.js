const axios = require("axios");
const fs = require("fs");
const rusMovies = [];
require("dotenv").config();


const fetchRusMovies = async () =>{
         try {
            for (let genre = 1; genre<=23; genre++){
                // We don't need genre #18, cause it's cartoons, another category.
                if (genre !== 18){
                // Api can return only 20 pages, 20 movies per page 
                // maximum 400 movies total per each filter. 
                    for(let page = 1; page<=20; page++){
                        console.log(`Genre is : ${genre}, page is : ${page}`);
               await axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films?countries=34&genres=${genre}&order=RATING&type=FILM&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=${page}`, {
                    headers:{
                        // You've got to register, to get the API key, link in the Readme
                        'X-API-KEY': process.env.KINOPOISK_API_KEY ,
                        'Content-Type': 'application/json',
                    }
                })
                .then(response=>{response.data.items.forEach(movie=>{
                    // Here guys you can check if that movie already in your db, and if
                    // it's not, save it. Or you can do it later, after full array of names
                    // is built.
                    rusMovies.push(movie.nameRu);
                })})
                .catch(err=>{console.log(err);})  }
            }}} catch (error) {
                console.log(error);
            }
console.log(`Looks like array finally created, total items: ${rusMovies.length + 1}`);
// Let's create the txt file that lists all the movies
fs.writeFileSync("russianMovies.txt", rusMovies.join('\n'), "utf8");


};


fetchRusMovies();



