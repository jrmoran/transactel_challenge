// BaseString contains a string of Hexadecimal digits.
//
// * Convert it to an array where each digit is an individual element
// * Convert the value of each element to base 10
// * Eliminate all the elements of the array whose index is a multiple
// of the value of the first element
// * Eliminate all the elements of the array whose value is a multiple
// of the value of the first element, including the first element
// * Add the values of all remaining elements and submit the total with
// SendAnswer
//
// Implement it however you want as long as the total is correct.
//
// Start by calling GetBaseString on the first line, run your script and
// finish calling SendAnswer.
//
// Every time you press 'Run My Code' a new base string is generated, the
// base string will expire after 3 seconds so you don't get tempted to perform
// the process manually; your script should take less than three seconds to run.

var baseStr = '64d69fe87bf2924d69fe87c031c4d69fe87c13fb4d69fe87c40424d69fe87c95904d69fe87ca52c4d69fe87cb4c94d69fe87cc46e4d69fe87cd40d4d69fe87ce3f24d69fe87d1b704d69fe87d2b0e4d69fe87d3ab34d69fe87d4a504d69fe87d59ec4d69fe87d698a4d69fe87d792a4d69fe87d88d14d69fe87d986d4d69fe87da80d';

// Solution
// --------
var jm9 = function(){

  var items = [];

  return{

    // Process a string by converting each character to a base 10
    // integer and collecting them.
    init: function(str) {

      items.length = 0;

      for (var i = 0, t = str.length; i < t; i++) {
        items.push({
            label   : str[i],
            value   : parseInt(str[i], 16),
            included: true
        });
      }

      return this;
    },

    // Flags invalid items
    clean: function() {

      // caching
      var fi  = items[0],
          fiv = fi.value;

      // first item since its value is multiple of itself
      fi.included = false;

      for (var i = 1, t = items.length; i < t; i++) {

        // items which *index* is multiple of the first item's value
        // items which *value* is multiple of the first item's value
        if ( i % fiv === 0 || items[i].value % fiv === 0) {
          items[i].included = false;
        }
      }

      return this;
    },

    // Returns the sum of all elements whose flag `included` is set to true
    sum: function() {
      var total = 0;

      for (var i = 0, t = items.length; i < t; i++) {
        total += items[i].included === true ? items[i].value : 0;
      }
      return total;
    },

    debug:function() { console.log(items); }
  };
}();

// Testing
// -------
// let's imagine baseString contains `646A95EC1F23D161`. The value of our first
// element is 6
//
// * we should eliminate the **E** because its index is `6`
// * we should eliminate the **D** because its index `12` is a multiple of `6`
// * we should eliminate the **C** because its value `12` is a multiple of `6`
// * we should eliminate the **6's** at indexes `0`, `2` and `14`, because `6`
// is a multiple of `6`

var str = '646A95EC1F23D161',
    sol = 51,
    obj = jm9.init(str);

// clean object
obj.debug();
obj.clean();

console.log('CLEANING');
obj.debug();
if( obj.sum() === sol ) console.log('OK');

// Answer
// ------
//
console.log("\nSolution");

var sum = jm9.init(baseStr).clean().sum();
console.log( 'Total sum is: ' + sum );
