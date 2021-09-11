# CodifyJS
A library providing some simple functions to add colour to code.

## Documentation/Features:
```js
codifyJS(code);
```
Adds spans to the input code so that you can apply classes (see below) which will colour your code.

The CSS classes with example colours.
```css
.code-keyword {
	color: blue;
}
.code-variable {
	color: orangered;
}
.code-number {
	color: yellow;
}
.code-string {
	color: brown;
}
.code-operation {
	color: red;
}
.code-comment {
	color: green;
}
```

```js
cleanInner(code);
```
Removes all `span`s from the input code (code should be taken from the `innerHTML` of an element) and replaces the start of `div`s with line breaks (and removes the ends).
