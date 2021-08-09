# MathsJS
A `Maths` class which provides some maths related functionality.

## Documentation/Features:
```js
Maths
```
A class containing many Math related functions.

```js
Maths.parseInt(string);
```
Converts a whole number embedded in a string into an integer. Ignores letters and non-numeric characters (with the exception of `-`).

```js
Maths.parseFloat(string);
```
Converts a decimal number embedded in a string into a decimal number. Ignores letters and non-numeric characters (with the exception of `-`).

```js
Maths.evaluate(string);
```
Evaluates an equation. In some specific circumstances it can return better results than `eval` (eg `Maths.evaluate("2^4^8") = 4294967296` whereas `eval("2**4**8") = Infinity`).
Supported operators:
- `+` (add)
- `-` (subtract)
- `*` (multiply) [Note: a number next to parenthesis is multiplied by parenthesis eg 2 (1 + 1) is the same as 2 * (1 + 1)]
- `/` (divide)
- `%` (modulus)
- `^` (power)
- `()` (parenthesis)

```js
Maths.ceil(number);
```
Rounds up an input number.

```js
Maths.floor(number);
```
Rounds down an input number.

```js
Maths.round(number);
```
Rounds an input number.

```js
Maths.add(number, number);
```
Adds two numbers.

```js
Maths.subtract(number, number);
```
Subtracts one number from another.

```js
Maths.multiply(number, number);
```
Multiplies two numbers together.

```js
Maths.divide(number, number);
```
Divides one number by another.

```js
Maths.remainder(number, number);
Maths.mod(number, number);
Maths.modulus(number, number);
```
Returns the remainder when one number is divided by the other.
