# Randomiser
A simple tool for randomisation.

Available on NPM as `rand-pkg`:
```js
const Randomiser = require("rand-pkg");
```

## Methods:
### `int`:
```js
Randomiser.int(max);
Randomiser.int(min, max);
Randomiser.int(max, min);
```
Returns a random integer between `min` and `max` (if `min` is not expressed `0` is used). `min` is inclusive however `max` is not.

### `float`:
```js
Randomiser.float(max);
Randomiser.float(min, max);
Randomiser.float(max, min);
```
Returns a random decimal between `min` and `max` (if `min` is not expressed `0` is used). `min` is inclusive however `max` is not.

### `array`:
```js
Randomiser.array(items, length);
```
Returns a random `Array` of input length using the items from the input `Array` (`items`).

### `string`:
```js
Randomiser.string(characters, length);
```
Returns a random `String` of input length based on the input characters (in the form of either an `Array` or `String`).

### `shuffle`:
```js
Randomiser.shuffle(str);
Randomiser.shuffle(arr, ?randomiseAllDimensions);
```
Returns the input `String`/`Array` in a randomised order. `randomiseAllDimensions` (which defaults to `false`) allows you to specify whether all dimensions of the `Array` should be randomised or not.

```js
String.prototype.shuffle();
```
Returns the `String` in a randomised order.

```js
Array.prototype.shuffle(?randomiseAllDimensions);
```
Returns the `Array` in a randomised order. `randomiseAllDimensions` (which defaults to `false`) allows you to specify whether all dimensions of the `Array` should be randomised or not.

### `pick`:
```js
Randomiser.pick(str);
Randomiser.pick(arr, ?searchAllDimensions);
```
Returns a random item/character from the input `String`/`Array`. `searchAllDimensions` (which defaults to `true`) allows you to specify whether all dimensions of `Array`s should be searched (if `searchAllDimensions` is `false` and a multi-dimensional `Array` is input, this method may output an `Array` rather than a single item).

```js
String.prototype.pick();
```
Returns a random character from the input `String`.

```js
Array.prototype.pick(?randomiseAllDimensions);
```
Returns a random item from the `Array`. `searchAllDimensions` (which defaults to `true`) allows you to specify whether all dimensions of the `Array` should be searched (if `searchAllDimensions` is `false` and a multi-dimensional `Array` is input, this method may output an `Array` rather than a single item).
