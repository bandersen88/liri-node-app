# liri-node-app
Command Line Interactive app

Liri-node-app gives you the ability to run 4 different commands through the command line interface.  Users can lookup the concert dates for their favorite band, search for song info on spotify off of their favorite song track name, lookup movie info from the omdb database, or have the app surprise them with it's own choice!

### See it in action

First, launch the app by navigating to the direcotory and running it with 
```
node liri.js
```
Next, select which of the 4 commands you want to execute, using the arrow keys to navigate the different options.

![Select a command](images/1-choose_command.jpg)

1. Lookup Concert Dates
    1. Select *"Check if a band is in town"*
    ![Lookup Dates for A Band](images/2-selecct_band)

    1. Return Concert Dates from API call to the *Bands in Town* API
    ![Concert Dates Returned](images/5-concert_return)
1. 