# liri-node-app
Command Line Interactive app

Liri-node-app gives you the ability to run 4 different commands through the command line interface.  Users can lookup the concert dates for their favorite band, search for song info on spotify off of their favorite song track name, lookup movie info from the omdb database, or have the app surprise them with it's own choice!

### See it in action

Step 1) Launch the app by navigating to the direcotory and running it with
```
node liri.js
```
Step 2) Select which of the 4 commands you want to execute, using the arrow keys to navigate the different options.

![Select a command](images/1-choose_command.jpg)

1. Lookup Concert Dates
    1. Select *Check if a band is in town*
    ![Lookup Dates for A Band](images/2-selecct_band.jpg)

    1. Return Concert Dates from API call to the *Bands in Town* API
    ![Concert Dates Returned](images/5-concert_return.jpg)
1. Lookup Song Information off Spotify
    1. Select *Look up song info* '/n'

    ![Lookup song info](images/3-lookup_song.jpg)
    
    1. Return Artist, Track Name, Spotify Link, and Album Name
    ![Song Return](images/6-song_return.jpg)

    1. If not Track Name is passed in, "The Sign" by Ace of Base is returned
    ![Return The Sign](images/9-song_retrun_the_sign.jpg)
1. Look up Movie Info off of the OMDB database
    1. Select *Look up movie info*
    ![Lookup Movie](images/4-lookup_movie.jpg)

    1. Return Movie Info
    ![Return Movie Info](images/7-movie_return.jpg)

    1. If no movie is entered, info for Mr. Nobody is returned
    ![Return Mr. Nobody](images/8-movie_return_mr_nobody.jpg)
1. Surprise Me - Let the app decide what to do
    1. Call the command in the random.txt file (currently a spotify call) with the data in the random.txt file
    ![surprise me](images/10-surprise_me.jpg)
