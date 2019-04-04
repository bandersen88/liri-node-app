//Includes
var fs = require("fs");
require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

var axios = require("axios");
var moment = require("moment");
var inquirer = require("inquirer");
var Promise = require('promise');

// console.log(keys);


var spotify = new Spotify(keys.spotify);
var logQueue = [];

// console.log(spotify);


inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
        type: "list",
        message: "What would you like to do?",
        choices: ["Check if a band is in town", "Look up song info", "Look up movie info","Surprise Me"],
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
            break;
            case "Look up movie info":
                omdbAPI();
            break;
            case "Surprise Me":
                surpriseMe();
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
            
            axios
            .get("https://rest.bandsintown.com/artists/" + inquirerResponse.artist + "/events?app_id=codingbootcamp")
            .then(function(response) {
                // console.log(response);
                var data = response.data;
                if (data == "\n{warn=Not found}\n") {
                    // Artist not found
                    console.log("Artist not found");
                } else if (data.length == 0) {
                    // No planned concerts
                    console.log("No concerts are planned for this artist");
                } else {
                    data.forEach(function(element){
                        console.log(moment(element.datetime).format("MM/DD/YYY"));
                    })
                }
            })
            .catch(function(error) {
                console.log(error);
            });
        });
};

function spotifyAPI(){

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
    console.log("Artist: " + data.tracks.items[i].album.artists[0].name + '\n' +
                "Track Name: " + data.tracks.items[i].name + '\n' +
                "Link to track: " + data.tracks.items[i].album.artists[0].external_urls.spotify + '\n' +
                "Album: " + data.tracks.items[i].album.name);
}

function omdbAPI() {
    
    inquirer
        .prompt([
            {
                type: "input",
                messsage: "What movie do you want to lookup?",
                name: "title"
            }
        ])
        .then(function(res){
            var titleLookup = res.title;
            if(titleLookup.trim() === ""){
                titleLookup = "Mr. Nobody";
            }
            axios.get('https://www.omdbapi.com/?apikey=trilogy', 
            {
                // port: 8080,
                params: {
                  t: titleLookup
                }
              })
              .then(function (response) {
                // console.log(response);
                // console.log(response.data.Response);

                if(response.data.Response === "True"){
                var index = response.data.Ratings.findIndex(findRTRating)
                var rottenTomatoesRating = ""

                if (index === -1){
                    rottenTomatoesRating = "Not Available";
                } else {
                    rottenTomatoesRating = response.data.Ratings[index].Value;
                }

                console.log("Title: " + response.data.Title + '\n' 
                            + "Year: " + response.data.Year + '\n' 
                            + "IMDB Rating: " + response.data.imdbRating + '\n'
                            + "Rotten Tomatoes Rating: " + rottenTomatoesRating + '\n'
                            + "Country: " + response.data.Country + '\n'
                            + "Language: " + response.data.Language + '\n'
                            + "Plot: " + response.data.Plot + '\n' 
                            + "Actors: " + response.data.Actors + '\n' 
                            );
                
                logQueue.push("Title: " + response.data.Title);
                logQueue.push("Year: " + response.data.Year);
                logQueue.push("IMDB Rating: " + response.data.imdbRating);
                logQueue.push("Rotten Tomatoes Rating: " + rottenTomatoesRating);
                logQueue.push("Country: " + response.data.Country);
                logQueue.push("Language: " + response.data.Language);
                logQueue.push("Plot: " + response.data.Plot);
                logQueue.push("Actors: " + response.data.Actors);
                writeToLog();
                } else {
                    console.log("Movie not Found");
                    console.log(response.data);
                }

              })

              
              .catch(function (error) {
                console.log(error);
              });

        })
};

function findRTRating(element) {
    if (element.Source === "Rotten Tomatoes") {
        return element;
    }
}

function surpriseMe() {
    var filename = "random.txt";
    var dataArray = [];

    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) throw err;
        console.log('OK: ' + filename);
        console.log(data)
        dataArray = data.split(',');
        dataArray.forEach(function(element){
            element.replace(/['"]+/g, '');
        })
        console.log(dataArray[0]);

        //TODO: add callback or promise here
        if(dataArray[0] === "spotify-this-song") {
          spotify.search({type: 'track', query: dataArray[1]}, function(err, data){
              if(err) {
                  return console.log('Error occurred: ' + err);
              }
              printSpotifyResults(0, data);
          })
        }
      });

};

function writeToLog() {
    // console.log("In Write to Log");
    logQueue.forEach(function(element){
        fs.appendFile("log.txt", element + "\n", function (err) {
            if (err) throw err;
        });
    })

    logQueue = [];
}

