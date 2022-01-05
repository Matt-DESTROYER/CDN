const homeController = APP.Controller("homeController");
homeController.CreateVariable("data", "some data", ["out"]);
const titleText = homeController.DOM("name", "title text");
titleText.style.cursor = "pointer";
titleText.addEventListener("click", function() {
	APP.Page = "Hi";
	APP.Render();
});
