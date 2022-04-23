# Input.js
A simple library to get input from HTML elements.

# Library
The library creates a variable called `Input` which has two methods: `listenTo` and `stopListening`. Both accept a HTML element as input. The former will then output an object that will be updated with user input that the input element has received. The latter will stop listening and therefore stop logging input.

### `listenTo` input
```js
// get input
const input = Input.listenTo(HTMLElement);

// input[keyCode]
// 13 is the keyCode for the enter key, to look up the keyCode of any key, use this website: https://matt-destroyer.github.io/Keycode-Info/
// returns a boolean to represent whether a key is currently pressed or not
if (input[13]) {
	// ...
}

// input[key]
// note: all characters are made uppercase
// returns a boolean to represent whether a key is currently pressed or not
if (input.W) {
	// ...
}

// input.key
// note: all characters are made uppercase
// returns the string value of the last key pressed
console.log(input.key);

// input.keyCode
// returns the numeric keyCode of the last key pressed
console.log(input.keyCode);

// input.mouseDown
// returns a boolean value to represent whether or not the mouse is currently pressed or not
if (input.mouseDown) {
	// ...
}

// input.buttons
// returns an array containing the codes of each mouse button currently pressed
if (input.buttons.includes(2)) {
	// ...
}
```

### Example:
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
