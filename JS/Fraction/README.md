# Fraction.js
> A small, simple, lightweight library that allows you to operate on/with fractions (which allows a lot more precision than with decimals).

```js
new Fraction(/* int */ numerator, /* int */ denominator);
```
Creates a new `Fraction` object.

```js
Fraction.prototype.simplify();
```
Simplifies a `Fraction`.

```js
Fraction.prototype.add(/* Fraction */ fraction);
/* OR */
Fraction.prototype.add(/* int */ numerator, /* int */ denominator);
```
Adds the input `Fraction` to a `Fraction`.

```js
Fraction.prototype.subtract(/* Fraction */ fraction);
/* OR */
Fraction.prototype.subtract(/* int */ numerator, /* int */ denominator);
```
Subtracts the input `Fraction` from a `Fraction`.

```js
Fraction.prototype.multiply(/* Fraction */ fraction);
/* OR */
Fraction.prototype.multiply(/* int */ numerator, /* int */ denominator);
```
Multiplies a `Fraction` by an input `Fraction`.

```js
Fraction.prototype.divide(/* Fraction */ fraction);
/* OR */
Fraction.prototype.divide(/* int */ numerator, /* int */ denominator);
```
Divides a `Fraction` by an the input `Fraction`.

> All _above_ methods of `Fraction`s are **chainable**!

```js
Fraction.prototype.toArray();
```
Returns a `Fraction` in array fromat: `[ numerator, denominator ]`.

```js
Fraction.prototype.toString();
```
Returns a `Fraction` in string format: `"numerator/denominator"`.
