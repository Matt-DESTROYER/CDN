# DOMLib
#### (This library is a work-in-progress...)

## What is DOMLib?
Well, to be frank, I'd like to know the answer to that to... DOMLib is a library that enables you to interact with the DOM in a web page in an interesting and specific way. All content for a web page is loaded before any HTML is displayed, then `Page`s are rendered in the `body` of the HTML document. DOMLib provides an easy way to interact with the DOM indirectly using `DOMLibVariables` within a `DOMLibController`.

## Documentation
All `DOMLib` websites start with a `DOMLibInstance`.
```js
const APP = DOMLib.Init("App Name");
```
