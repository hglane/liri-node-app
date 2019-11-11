require("dotenv").config();
var keys = require("./keys.js");
var request = require("request")
var Spotify = require("node-spotify-api")
var dateFormat = require("dateFormat")
var fs = require("fs")