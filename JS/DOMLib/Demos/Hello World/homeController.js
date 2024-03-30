const homeController = APP.Controller("homeController");

homeController.CreateVariable("pi", Math.PI, ["out"]);

const titleText = homeController.DOM("name", "title text");
titleText.style.cursor = "pointer";
titleText.on("click", function() {
	APP.Render("Hi");
});
