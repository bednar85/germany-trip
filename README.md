# Germany Trip Companion App

This project is a ReactJS app I created to filter and sort through a select list of local cafes, bars, restuarants, and historical sites based on geolocation for my upcoming trip to Germany.

###[Live Project](http://ryanabednar.com/germany-trip/#/destination/berlin)

## Technology

  - ReactJS for components and functionality
  - Flux for handling routing
  - Stylus for styling
  - Browserify for watching and bundling my JS
  - Gulp for running dev tasks

## In Depth
  
  - in Destination.js I added a few functions for calculating and setting each location's current distance in miles relative to my phone and my hotel based on geolocation coordinates
  - also in Destination.js I have a function for loading a separate JSON file for each city load based on the current URL
  - in CitySelector.js I used [Flickity] to change the URL thereby changing the city data
  - in FilterBar.js I used [React Checkbox Group] to manage selections made to multiple groups of radio button inputs
  - in PlacesList.js I used lodash for filtering and sorting my list of locations based on Category, Price, and Distance selections made in FilterBar.js
  - in sources/_experiments/ I created a few simple tests for some functionality that I've included or that I plan to include, for example: In the moment folder, I grabbed data from a few locations and setup a function that loops through that list and sets the property of isOpen for each location. By using Moment's [.isBetween()] method I check whether the current time falls within the moment objects of when each location is open/closed.

[Flickity]:http://flickity.metafizzy.co/
[React Checkbox Group]:https://www.npmjs.com/package/react-checkbox-group
[.isBetween()]:http://momentjs.com/docs/#/query/is-between/
