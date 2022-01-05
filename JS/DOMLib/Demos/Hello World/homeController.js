const homeController = APP.Controller();
homeController.Variables.data = "some data";
homeController.DOM["title text"].event("click", () => APP.Page = "Hi");
