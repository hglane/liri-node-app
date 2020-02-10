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