// You are the captain of a starship :-) traveling far far away,
// you are about to run out of fuel. Your ship travels by jumping
// from star to star using wormholes.
//
// Create a route to get back to the Sun Solar System based on the
// wormholes available in the table.
//
// You have enough fuel for 6 more jumps.
//
// Write the code necessary to determine the jumps you need to make to
// get back to Sun and send it to the server using JavaScript, the answer
// should be a Comma-Separated List.
//
// Use the provided functions GetPosition and SendAnswer. Start by calling
// GetPosition on the first line, run your script and finish calling SendAnswer.
//
// Every time you press 'Run My Code' a new galaxy is generated, the galaxy
// will expire after 10 seconds so you don't get tempted to perform the process
// manually; // your script should take less than ten seconds to run.
//
// You are currently in: Alnilam
//
// These are the available wormholes:
//

// Solution
// --------

// Grab all galaxies and destinations from the DOM. Tested in Chrome
var loadData = function(){
  var galaxies = [],
      table = document.getElementById('galaxy'),
      rows  = table.getElementsByTagName('tr'),
      home  = document.forms[0].getElementsByTagName('p')[0].getElementsByTagName('b')[0].textContent;

  for(var i=1, t = rows.length; i<t; i++){

    var cells = rows[i].getElementsByTagName('td');

    // The first cell in the row contains the name of the galaxy in its id attribute.
    // Destinations are inside the following cells as text
    var destinations= [];
    for(var j=1, t2 = cells.length; j<t2; j++){
      destinations.push( cells[j].textContent );
    }

    // Add galaxies and destinations to galaxies array
    galaxies.push({
        name :        cells[0].id,
        destinations: destinations
    });
  }

  return{
    galaxies: galaxies,
    home    : home
  };
};


var jm10a = function(){
  var galaxies,
  routes    = [],
  sunRoutes = [],
  sunRoute  = '';

  return{

    init: function(galaxies_obj){
      galaxies = galaxies_obj;
      return this;
    },

    // gets a galaxy
    getGalaxy: function(gname){

      for (var i = 0, t=galaxies.length; i < t; i++) {
          if(galaxies[i].name === gname){
              return galaxies[i];
          }
      }
    },
    /*
    // checks if a galaxy contains a star
    hasStar:function(gname, sname){
      var galaxy = this.getGalaxy(gname);
      for (var i = 0, t=galaxy.destinations.length; i < t; i++) {
        if(galaxy.destinations[i]===sname){
          return true;
        }
      }
      return false;
    },
    // returns the galaxy of a destination
    whereIs:function(sname){
      for (var i = 0, t=galaxies.length; i < t; i++) {
        if(this.hasStar(galaxies[i].name,sname)){
          console.log('found in ' + galaxies[i].name);
        }
      }
    },
    */

  goToSunFrom: function(sname){
    var g1 = this.getGalaxy(sname);
    for (var i = 0, t=g1.destinations.length; i < t; i++) {
      routes.push({
          id: i,
          route: [g1.name,g1.destinations[i]]
      });
    }
    // jump
    for (var j = 0; j < 5; j++) {
      var sunRoute = this.jump();

      if(typeof sunRoute!=='undefined'){
        //////////////////////////////////////
        // SUN IS HERE
        return sunRoute;
      }
    }
  },

  // jumps one level
  jump:function(){
    var counter=0;
    var newRoutes=[];

    // iterate over each route
    for (var i = 0; i < routes.length; i++) {

      // get the current route
      var currentRoute = routes[i].route;

      // get the last star in the current route
      var lasti = currentRoute.length-1;
      var lastStar = currentRoute[lasti];

      // retrieve galaxy object from the last star
      var gt = this.getGalaxy(lastStar);

      // build new routes from current route and new destinations
      for (var j = 0, t=gt.destinations.length; j < t; j++) {
        // clone current routes
        var nr = currentRoute.slice(0);
        nr.push(gt.destinations[j]);
        newRoutes.push({
            id: counter++,
            route:nr
        });

        if (gt.destinations[j] === 'Sun') {
          return nr.join(',');
        }
      }
    }
    // replace routes
    routes = newRoutes.slice(0);
  },
  debug:function(){
    for (var i = 0; i < galaxies.length; i++) {
      //console.log(galaxies[i].name + ':' + galaxies[i].destination);
    }

    //console.log(routes.length);
    //console.log(routes[0]);
  }
  };
}();



// Testing
// -------

// loadData() generates an object literal with all the galaxies and destinations.
//
// I've stored the data in the file *galaxies.js*

var data = require('./galaxies');

// ## Solution A
var start = Date.now();
var route = jm10a.init( data.galaxies ).goToSunFrom( data.home );
console.log( 'Solution A [' + (Date.now() - start) + ' ms]');
console.log( route );

