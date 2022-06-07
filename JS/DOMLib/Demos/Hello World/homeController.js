const homeController = APP.Controller("homeController");

homeController.CreateVariable("pi", Math.PI, ["out"]);

const titleText = homeController.DOM("name", "title text");
titleText.style.cursor = "pointer";
titleText.addEventListener("click", function() {
	APP.Render("Hi");
});
