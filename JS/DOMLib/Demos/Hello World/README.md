# A simple Hello World DOMLib webpage
> A live demo is available [here](https://domlib-demo-hello-world.mattdestroyer.repl.co/)

The website starts with your average empty `index.html` file.
```html
<!DOCTYPE html>
<html>

<head>
</head>

<body>
</body>

</html>
```

First of all we need to load the `DOMLib` scripts using this tag in the document's head `<script src="https://Matt-DESTROYER.github.io/CDN/JS/DOMLib/lib.js"></script>`.
Then we will add a script tag in the document's body which will contain the code that runs the website.

All `DOMLib` websites start with a `DOMLibInstance`, we need to initialise the website in the script tag we created.
```js
const APP = DOMLib.Init("Hello World");
```

From there we have to create `Page`s. Each one must have a name, a HTML partial, and a JavaScript controller (you could in theory use the same HTML partial or JavaScript controller in multiple different pages, although circumstances requiring that are unlikely).
> Note: A HTML partial is essentially any HTML that would go into the _body_ of a HTML document.
For this website we are going to have two pages, a "Home" page, and a "Hi" page that greets a user once they input a name. Feel free to name the files differently, it won't impact the website.
```js
APP.CreatePage("Home", "home.html", "homeController.js");
APP.CreatePage("Hi", "hi.html", "hiController.js");
```

After that we need to set the start `Page`. You probably already guessed the start page is our "Home" page.
```js
APP.Page = "Home";
```

And after `DOMLib` loads the pages we want `DOMLib` to render the "Home" page.
```js
APP.onload = function() {
	APP.Render();
};
```

Our final `index.html` file should look something like this:
```html
<!DOCTYPE html>
<html>

<head>
	<script src="https://Matt-DESTROYER.github.io/CDN/JS/DOMLib/lib.js"></script>
</head>

<body>
	<script>
		const APP = DOMLib.Init("Hello World");
		APP.CreatePage("Home", "home.html", "homeController.js");
		APP.CreatePage("Hi", "hi.html", "hiController.js");
		APP.Page = "Home";
		APP.onload = function() {
			APP.Render();
		};
	</script>
</body>

</html>
```
