// Write the code necessary to revert a string and send it to the server
// using JavaScript.
//
// We will check your answer and save your code.
//
// Use the provided functions GetBaseString and SendAnswer.
//
// Every time you press 'Run My Code' a new base string is generated, the
// base string will expire after 3 seconds so you don't get tempted to
// perform the process manually; your script should take less than three
// seconds to run.

var str = "4d69d99e610974d69d99e620944d69d99e65ea64d69d99e66e444d69d99e67de34d69d99e68d844d69d99e69d224d69d99e6acc5";

// Solution
// --------
//
// This function will reverse a string and it can be used functionally
//
//     reverse('hola');
//
// but also in an object oriented fashion
//
//     'hola'.string();
//

var reverse = function(str){

  // assume the method is being called from a String object's prototype
  // chain when the parameter `str` is undefined.
  if( typeof str === 'undefined' ) str = this.toString();

  // make sure we got a string
  if (typeof str !== 'string') return '';

  var rs = '';
  for(var i = str.length-1; i >= 0; i--){
      rs += str[i];
  }
  return rs;
};


// ## Prototype
// All string objects will have a reverse method.
String.prototype.reverse = reverse;

// ## Running
if ('emiaj' === reverse('jaime'))  console.log('reverse()......... OK');
if ('jaime'.reverse() === 'emiaj') console.log('String.reverse().. OK');

console.log('Answer: ' + str.reverse() );
