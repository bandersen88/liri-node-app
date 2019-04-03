//Includes
var fs = require("fs");
require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

var axios = require("axios");
var moment = require("moment");
var inquirer = require("inquirer");
var Promise = require('promise');

console.log(keys);


var spotify = new Spotify(keys.spotify);

console.log(spotify);


inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["Check if a band is in town", "Look up song info", "Look up movie info","Surprise me"],
        name: "action"
      }
  ])
    .then(function(inquirerResponse) {
        // console.log(inquirerResponse.action);
        switch(inquirerResponse.action) {
            case "Check if a band is in town":
                bandsInTown();
            break;
            case "Look up song info":
                spotifyAPI();
            //TODO: Spotify API
                // console.log("Look up song info");
            break;
            case "Look up movie info":
            // TODO: OMDB API
            break;
            case "Surprise Me":
            // Spotify API using random.txt
            break;
        }
      });

function bandsInTown() {
    console.log("Inside the Bands in Town API");
    inquirer
        .prompt([
            {
                type: "input",
                message: "Which band do you want to look up?",
                name: "artist"
            }
        ])
        .then(function(inquirerResponse) {
            //TODO: Clean up output
            axios
            .get("https://rest.bandsintown.com/artists/" + inquirerResponse.artist + "/events?app_id=codingbootcamp")
            .then(function(response) {
                console.log(response);
                console.log("At least I'm here");
            })
            .catch(function(error) {
                console.log("I'm in there error section");
            });
        });
};

function spotifyAPI(){
    //TODO: Consult the node-spotify-api npm package for the search functions for spotify
    console.log("Inside Spotify API");

    inquirer
    .prompt([
        {
            type: "input",
            message: "What song would you like to look up?",
            name: "trackName"
        }
    ])
    .then(function(res){

        //TODO: trim response and set to default if no characters provided

        spotify.search({type: 'track', query: res.trackName}, function(err, data){
            if(err) {
                return console.log('Error occurred: ' + err);
            }

            //TODO: console log Artist, song name, preview link from spotify, album
            console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
            console.log("Track Name: " + data.tracks.items[0].name);
            console.log("Link to track: " + data.tracks.items[0].album.artists[0].external_urls.spotify);
            console.log("Album: " + data.tracks.items[0].album.name);
        })
    })

    // spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    //     if (err) {
    //       return console.log('Error occurred: ' + err);
    //     }
       
    //   console.log(data);

//     * This will show the following information about the song in your terminal/bash window

//      * Artist(s)

//      * The song's name

//      * A preview link of the song from Spotify

//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.
};

function omdbAPI() {
    console.log("Inside OMDB API");
};

function surpriseMe() {
    console.log("Inside Surprise Me");
};
// Helper function that appends to log.txt, gets called in all response sections   

