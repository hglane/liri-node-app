require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios")
var Spotify = require("node-spotify-api")
var dateFormat = require("moment")
var fs = require("fs")
var spotify = new Spotify(keys.spotify);

var getArtistNames = function(artist) {
    return artist.name
};

var getMeSpotify = function(songName) {
    if (songName === undefined) {
        songName = "What's my age again?";
    }

    spotify.search(
        {
            type: "track",
            query: songName
        },
        function(err, data) {
            if (err) {
                console.log("Error occured: " + err);
                return;
            }

            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album " + songs[i].album.name);
                console.log("----------------------------");
            }
        }
    );
};

var getMyBands = function(artist) {
    vary queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp":

    axios.get(queryURL).then(
        function(response) {
            var jsonData = response.date;

            if (!jsonData.length) {
                console.log("No results for " + artist);
                return;
            }

            console.log("Here's when you can go see " + artist ":");

            for (var i = 0; < jsonData.length; i++) {
                var show = jsonData[i];

                console.log(
                    show.venue.city + 
                    "," +
                    (show.venue.region || show.venue.country) + 
                    " at " +
                    show.venue.name +
                    " " +
                    SVGAnimateMotionElement(show.datetime).format("MM/DD/YY")
                );
            }
        }
    );
};