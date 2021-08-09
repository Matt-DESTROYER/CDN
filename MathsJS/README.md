# MathsJS
A `Maths` class which provides some maths related functionality.

## Documentation/Features:
```js
Maths
```
A class containing many Math related functions.

```js
parseInt(string);
```
Converts a whole number embedded in a string into an integer. Ignores letters and non-numeric characters (with the exception of `-`).

```js
parseFloat(string);
```
Converts a decimal number embedded in a string into a decimal number. Ignores letters and non-numeric characters (with the exception of `-`).

```js
evaluate(string);
```
Evaluates an equation. In some specific circumstances it can return better results than `eval` (eg `Maths.evaluate(2^4^8) = 4294967296` whereas `eval(2**4**8) = Infinity`).

```js
ceil(number);
```
Rounds up an input number.

```js
floor(number);
```
Rounds down an input number.

```js
round(number);
```
Rounds an input number.

```js
add(number, number);
```
Adds two numbers.

```js
subtract(number, number);
```
Subtracts one number from another.

```js
multiply(number, number);
```
Multiplies two numbers together.

```js
divide(number, number);
```
Divides one number by another.

```js
remainder(number, number);
mod(number, number);
modulus(number, number);
```
Returns the remainder when one number is divided by the other.
