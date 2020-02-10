require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios")
var Spotify = require("node-spotify-api")
var fs = require("fs")
var spotify = new Spotify(keys.spotify);
var moment = require("moment")

var getArtistNames = function (artist) {
    return artist.name
};

var getMeSpotify = function (songName) {
    if (songName === undefined) {
        songName = "What's my age again?";
    }

    spotify.search(
        {
            type: "track",
            query: songName
        },
        function (err, data) {
            if (err) {
                console.log("Error occured: " + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("Artist: " + songs[i].artists[0].name)
                console.log("Song: " + songs[i].name);
                console.log("Preview Song: " + songs[i].preview_url);
                console.log("Album: " + songs[i].album.name);
                console.log("----------------------------------------------------------------------------------------------------------");
            }
        }
    );
};

var getMyBands = function(artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function (response) {
            var jsonData = response.data;

            if (!jsonData.length) {
                console.log("No results for " + artist);
                return;
            }

            console.log("Here's when & where you can go see " + artist + ":");
            console.log('--------------------------------------------------------------------------------------------------')

            for (var i = 0; i < jsonData.length; i++) {
                var show = jsonData[i];

                console.log(
                    show.venue.city +
                    "," +
                    (show.venue.region || show.venue.country) +
                    " at " +
                    show.venue.name +
                    " " +
                    moment(show.datetime).format("MM/DD/YY")
                );
            }
        }
    );
};

var getMeMovie = function (movieName) {
    if (movieName === undefined) {
        movieName = "Can't seem to find that movie :(";
    }

    var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

    axios.get(urlHit).then(
        function (response) {
            var jsonData = response.data;

            console.log("Title: " + jsonData.Title);
            console.log("Year: " + jsonData.Year);
            console.log("Rated: " + jsonData.Rated);
            console.log("IMDB Rating: " + jsonData.Rated);
            console.log("Country " + jsonData.Country);
            console.log("Language: " + jsonData.Language);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);
            console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
        }
    );
};

var pick = function (caseData, functionData) {
    switch (caseData) {
    case "concert-this":
        getMyBands(functionData);
        break;
    case "spotify-this-song":
        getMeSpotify(functionData);
        break;
    case "movie-this":
        getMeMovie(functionData);
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("LIRI doesn't have that knowledge");
    }
};

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv.slice(3).join(" "));


