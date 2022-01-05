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
```js
DOMLib
```
`DOMLib` is an object used to setup your initial `DOMLibInstance`.

```js
DOMLib.Init(name);
```
This method is used to setup your initial `DOMLibInstance` which gets all the components you need for you website. It takes in the name to be used as the title of your website.

```js
DOMLibInstance
```
This class allows you to piece together the components of your website.

```js
DOMLibInstance.prototype.Page;
```
This string allows you to set the current `Page`, this is used when rendering if no `Page` title is input. This is also used internally by the `DOMLibInstance`.

```js
DOMLibInstance.prototype.Input(message, buttons);
```
> Note: This method is currently a **prototype**. This method could be subject to dramatic change until a stable acceptable version is released.
This method can be used to get input from a user. It takes in the message which will be displayed to the user while taking in input and an array of buttons to be displayed. Supported buttons include `"Submit"`, `"Ok"`, `"Cancel"`, and `"Close"`. This method will return a promise. You can use `.then` to receive input in string format and `.catch` if the user declines to give input.

```js
DOMLibInstance.prototype.CreatePage(title, htmlPartialDirectory, jsControllerDirectory);
```
This method can be used to add a `Page` to your website. This method takes in the title of the `Page`, the directory of the HTML partial that contains the `Page`'s content, and the directory of the JavaScript controller that will add interactivity and functionality to the `Page`.

```js
DOMLibInstance.prototype.GetPage(title);
```
This method can be used to get a `Page` based on its title from the `Page`s already created.

```js
DOMLibInstance.prototype.RefreshAllContent();
```
This method can be used to refresh all HTML partials and JavaScript controllers. This could be useful if the HTML partials, for exmaple, were updated constantly so the user could refresh the content.

```js
DOMLibInstance.prototype.Render(?page);
```
This method renders either the `Page` with the input title or if no input is receive the current `Page` stored in `DOMLibInstance.prototype.Page`. If the page being rendered is not fully loaded or no have been created, an error will be triggered.

```js
DOMLibInstance.prototype.Controller(name);
```
This method returns `DOMLibController` created using the input name.

```js
DOMLibController
```
[UNFINISHED]
