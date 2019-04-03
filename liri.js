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

        var trackLookup = res.trackName;
        var findAceOfBase = false;

        if (res.trackName.trim() === "") {
            trackLookup = "The Sign";
            findAceOfBase = true;
        }

        spotify.search({type: 'track', query: trackLookup}, function(err, data){
            if(err) {
                return console.log('Error occurred: ' + err);
            }

            //Jenky, I know.  But spotify packages for single parameter query, so 
            //here's my best guess how to find the Ace of Base "The Sign"
            if(!findAceOfBase){
                printSpotifyResults(0, data);
            } else {
                var index = data.tracks.items.findIndex(findAceOfBaseIndex);
                printSpotifyResults(index, data);
            }

            
        })
    })
};

function findAceOfBaseIndex(element) {
    if(element.album.artists[0].name === "Ace of Base"){
        return element;
    }
}

function printSpotifyResults(i, data) {
    // console.log(JSON.stringify(data));
    console.log("Artist: " + data.tracks.items[i].album.artists[0].name + '\n' +
                "Track Name: " + data.tracks.items[i].name + '\n' +
                "Link to track: " + data.tracks.items[i].album.artists[0].external_urls.spotify + '\n' +
                "Album: " + data.tracks.items[i].album.name);
}



function omdbAPI() {
    console.log("Inside OMDB API");
};

function surpriseMe() {
    console.log("Inside Surprise Me");
};
// Helper function that appends to log.txt, gets called in all response sections   

