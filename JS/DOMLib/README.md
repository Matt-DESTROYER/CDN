# DOMLib
#### (This library is a work-in-progress...)

## What is DOMLib?
Well, to be frank, I'd like to know the answer to that too... DOMLib is a library that enables you to interact with the DOM in a web page in an interesting and specific way. All content for a web page is loaded before any HTML is displayed, then `Page`s are rendered in the _body_ of the HTML document. DOMLib provides an easy way to interact with the DOM indirectly using `DOMLibVariables` within a `DOMLibController`.

## The Basics
All `DOMLib` websites start with a `DOMLibInstance`.
```js
const APP = DOMLib.Init("App Name");
```

From there simply create `Page`s giving each one a name, the directory of a HTML partial, and the directory of a JavaScript controller.
> Note: A HTML partial is essentially any HTML that would go into the _body_ of a HTML document.
```js
APP.CreatePage("Home", "HTML partial directory.html", "JS controller directory.js");
```

After that set the start `Page`.
```js
APP.Page = "Home";
```

And after all the pages have loaded, you can direct `DOMLib` to render the current `Page`.
```js
APP.onload = function() {
	APP.Render();
};
```

It's pretty simple! Check out the demos (currently only one demo is available) [here](https://github.com/Matt-DESTROYER/CDN/tree/main/JS/DOMLib/Demos).

## Documentation
