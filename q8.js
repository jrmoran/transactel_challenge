// Write the code necessary to find the most common 2-character string.
//
// For example, in the string 'EAEB2D31EFD34ED5RD3EETF' the
// answer would be 'D3', because it is the most common 2-character
// string, it appears 3 times.
//
// Just in case your string looks like this '123EEE456' be aware
// the substring 'EE' is present twice, once at offset 3, and 
// again at offset 4.

var baseStr = '4d695474c3bcd4d695474c4b594d6954d474c5afe4d695474c6a9c4d695474c7a3c4d695474c8a264d695474c997d4d695474ca91c4d695474cb8c54d695474cc8624d695474cd80d4d695474ce79d4d695474cf73e4d695474d06e04d695474d167d4d695474d261d';

// Solution
// --------
// There are many ways of solving this problem, here I'm using the
// modular pattern, to build an object literal.
var jm8 = function() {

  // Priviledge array that will store pairs of characters and keep track
  // of their number of repetitions
  var pairs = [];

  return{

    // Take a string, extract pair of characters and add them to `pairs`
    init: function(str) {

      pairs.length = 0;

      for (var i = 1; i < str.length; i++) {
        this.add(str[i - 1] + str[i]);
      }

      // maintain chainability
      return this;
    },

    // Check if a pair already exists. If it does increase the number 
    // of repetitions, otherwise add it to the array `pairs`
    add: function(pair) {
      var pix = this.hasPair(pair);

      if (pix !== -1) {
        pairs[pix].count++;
      } else {
        pairs.push({
            pair: pair,
            count:1
        });
      }
    },

    // check if a pair exists in the array. If it does return index,
    // otherwisw return -1
    hasPair: function(str){

      for (var i = 0, t = pairs.length; i < t; i++) {
        if(pairs[i].pair===str) return i;
      }

      return -1;
    },

    // returns the pair that repeats the most
    mostCommon: function(){
      var max = 0,
          maxi = -1;

      for (var i = 0, t = pairs.length; i < t; i++) {
        if(pairs[i].count > max){
          max  = pairs[i].count;
          maxi = i;
        }
      }
      //console.log(maxi);
      return pairs[maxi].pair;
    },

    // shows the current state of pairs
    debug:function() {
      console.log(pairs);
    }
  };
}();

// Testing
// -------
var str = 'EAEB2D31EFD34ED5RD3EETF',
    sol = 'D3';

if( jm8.init(str).mostCommon() === sol ) console.log( 'OK');
// jm8.debug();


// Answer
// ------
var ans = jm8.init(baseStr).mostCommon();
console.log(ans);
