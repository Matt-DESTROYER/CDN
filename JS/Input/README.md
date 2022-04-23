# Input.js
A simple library to get input from HTML elements.

# Library
The library creates a variable called `Input` which has two methods: `listenTo` and `stopListening`. Both accept a HTML element as input. The former will then output an object that will be updated with user input that the input element has received. The latter will stop listening and therefore stop logging input.

Example:
```js
// start listening to input
const _docInput = Input.listenTo(document);

// ...

// check if the shift key is being pressed
if (_docInput[13]) {
	// ...
}

// ...

// stop listening to input
Input.stopListening(document);
```
