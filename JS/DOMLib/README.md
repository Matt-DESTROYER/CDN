# DOMLib
#### (This library is a work-in-progress...)

## What is DOMLib?
DOMLib is a library that enables you to interact with the DOM in a web page in an interesting and specific way. All content for a web page is loaded before any HTML is displayed, then `Page`s are rendered in the _body_ of the HTML document. DOMLib provides an easy way to interact with the DOM indirectly using `DOMLibVariables` within a `DOMLibController`.

## The Basics
All `DOMLib` websites start with a `DOMLibInstance`.
```js
const APP = DOMLib.Init("App Name");
```

From there, simply create `Page`s giving each one a name, the directory of a HTML partial, and the directory of a JavaScript controller.
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
DOMLib.GET(url);
```
This method sends a get request to the input URL and returns a promise. Using `.then` you can read the resulting string and using `.catch` you can read any error that occurs preventing the get request from being completed.

```js
DOMLibInstance
```
This class allows you to piece together the components of your website. (Not available to global scope.)

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
This method returns `DOMLibController` created using the input name. This can be used to add interactivity and functionality to a `Page`.

```js
DOMLibController
```
This class is used to create interactivity and functionality in a `Page`.

```js
DOMLibController.prototype.DOM(property, value, ?tag);
```
This useful method allows you to search the document's body for an element or elements with the input property that has a certain value. For example instead of `document.getElementById("an id");` you could do `controller.DOM("id", "an id");`. Additionally you can specify a tag name (meaning you could only check paragraph elements for example). This method returns `null` if no element could be found with the input criteria, a single element if only one element could be found with the input criteria, or an array of the elements found that match the input criteria.

```js
DOMLibController.prototype.CreateVariable(name, value, settings);
```
This method creates a special variable that allows indirect access to the DOM. A variable must be named and initialised with a value. Then to link the variable to an element in the DOM, an element must be created with the tag `<variable></variable>` and a matching name `<variable name="variable name"></variable>` (in which case the variable might look like `controller.CreateVariable("variable name", "a value", ["out"])`). A variable can also be assigned settings (which is an array of strings). These settings dictate how the variable interacts with the element it is linked to. So far a variable's settings can include `"out"` and `"in"`. If a variable's settings includes `"out"`, then upon changing the variable, the linked element's `textContent` will be changed to match. If a variable's settings includes `"in"`, then upon changing the linked element, the variable's value will be changed to match.

```js
DOMLibController.prototype.SetVariable(name, value);
```
This method can be used to set the value of a variable previously created, and thus indirectly write to the DOM (if the variable's settings includes `"out"`). Returns the variable object.

```js
DOMLibController.prototype.GetVariable(name);
```
This method can be used to get the value of a variable previously created, and thus indirectly read from the DOM (if the variable's settings includes `"in"`). Returns the variable object.

> Note: Documentation is still in early stages and will evolve with this library.
