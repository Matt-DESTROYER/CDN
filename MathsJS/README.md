# MathsJS
A `Maths` class which provides some maths related functionality.

## Documentation/Features:
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
Evaluates an equation. In some specific circumstances `Maths.evaluate` can return better results than `eval` (eg `Maths.evaluate("2**4**8") = 4294967296` whereas `eval("2**4**8") = Infinity`). The accuracy with division can sometimes be more accurate than `eval` and sometimes be less accurate, the difference however will be miniscule.
Supported operators:
- `+` (add)
- `-` (subtract)
- `*` (multiply) [Note: a number next to parenthesis is multiplied by parenthesis eg 2 (1 + 1) is the same as 2 * (1 + 1)]
- `/` (divide)
- `%` (modulus)
- `**` (power)
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
Returns the sum of two numbers.

```js
Maths.subtract(number, number);
```
Returns one number subtracted by the other.

```js
Maths.multiply(number, number);
```
Returns the product of two numbers.

```js
Maths.divide(number, number);
```
Returns the quotient of two numbers.

```js
Maths.remainder(number, number);
Maths.mod(number, number);
Maths.modulus(number, number);
```
Returns the remainder when one number is divided by the other.
