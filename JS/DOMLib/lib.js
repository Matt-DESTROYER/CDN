"use strict";

const DOMLib = (function () {
	function GET(url) {
		return new Promise(function (res, rej) {
			const request = new XMLHttpRequest();
			request.open("GET", url, true);
			request.onreadystatechange = function () {
				if (request.readyState === XMLHttpRequest.DONE) {
					if (request.status === 200) {
						const type = request.getResponseHeader("Content-Type");
						if (type.indexOf("text") !== 1) {
							res(request.responseText);
						} else {
							res(request.response);
						}
					} else {
						rej(request);
					}
				}
			}
			request.send(null);
		});
	}
	function Page(title, htmlDirectory, jsControllerDirectory, parent) {
		this.title = title;
		this.htmlDirectory = htmlDirectory;
		this.htmlPartial = null;
		this.htmlPartialLoaded = false;
		GET(this.htmlDirectory).then((res) => {
			this.htmlPartial = res;
			this.htmlPartialLoaded = true;
			parent.$progress();
		});
		this.jsControllerDirectory = jsControllerDirectory;
		this.jsController = null;
		this.jsControllerLoaded = false;
		GET(this.jsControllerDirectory).then((res) => {
			this.jsController = res;
			this.jsControllerLoaded = true;
			parent.$progress();
		});
	}
	function DOMLibVariable(name, value, settings) {
		this.name = name;
		this.value = value;
		this.settings = settings;
	}
	class DOMLibController {
		constructor(name) {
			this.name = name;
			this.Variables = [];
		}
		DOM(property, value, tag = null, node = null, arr = []) {
			const nodes = node ? node.childNodes : document.childNodes;
			for (let i = 0; i < nodes.length; i++) {
				if (!nodes[i]) {
					continue;
				}
				if ((tag ? nodes[i].tagName === tag.toUpperCase() : true) && "getAttribute" in nodes[i] && nodes[i].getAttribute(property) && nodes[i].getAttribute(property) === value) {
					arr.push(nodes[i]);
				}
				if (nodes[i].childNodes.length > 0) {
					this.DOM(property, value, tag, nodes[i], arr);
				}
			}
			if (arr.length === 0) {
				const pid = document.getElementById(property);
				const vid = document.getElementById(value);
				if (pid) {
					arr.push(pid);
				}
				if (vid) {
					arr.push(vid);
				}
				const ptag = Array.from(document.getElementsByTagName(property));
				const vtag = Array.from(document.getElementsByTagName(value));
				if (ptag.length > 0) {
					arr.push(...ptag);
				}
				if (vtag.length > 0) {
					arr.push(...vtag);
				}
			}
			return arr.length > 1 ? arr : arr.length === 1 ? arr[0] : null;
		}
		CreateVariable(name, value, settings = ["out"]) {
			for (let i = 0; i < this.Variables.length; i++) {
				if (this.Variables[i].name === name) {
					this.Variables[i].value = value;
					this.Variables[i].settings = settings;
					console.warn("[DOMLibController] Called APP.CreateVariable with the same name as another variable (" + name + "), previous variable overwritten (to set a variable use APP.SetVariable(name, value)).");
					return this.Variables[i];
				}
			}
			const variable = new DOMLibVariable(name, value, settings);
			if (variable.value !== undefined && variable.settings.includes("out")) {
				if (this.DOM("name", variable.name, "variable")) {
					this.DOM("name", variable.name, "variable").textContent = variable.value;
				}
			}
			if (variable.settings.includes("in")) {
				if (this.DOM("name", variable.name, "variable")) {
					variable.value = this.DOM("name", variable.name, "variable").textContent;
				}
			}
			this.Variables.push(variable);
			return variable.value;
		}
		GetVariable(name) {
			for (let i = 0; i < this.Variables.length; i++) {
				if (this.Variables[i].name === name) {
					if (this.Variables[i].settings.includes("in")) {
						if (this.DOM("name", this.Variables[i].name, "variable")) {
							this.Variables[i].value = this.DOM("name", this.Variables[i].name, "variable").textContent;
						}
					}
					return this.Variables[i];
				}
			}
			return null;
		}
		SetVariable(name, value) {
			for (let i = 0; i < this.Variables.length; i++) {
				if (this.Variables[i].name === name) {
					this.Variables[i].value = value;
					if (this.Variables[i].settings.includes("out")) {
						if (this.DOM("name", this.Variables[i].name, "variable")) {
							this.DOM("name", this.Variables[i].name, "variable").textContent = this.Variables[i].value;
						}
					}
					break;
				}
			}
			return null;
		}
	}
	class DOMLibInstance {
		constructor(name) {
			this.$appName = name;
			this.$pages = [];
			this.$pageContentLoaded = 0;
			this.Page = null;
			this.onload = function () { };
			this.Controllers = [];
			let _titles = document.getElementsByTagName("title");
			if (_titles.length > 0) {
				_titles[0].innerHTML = this.$appName;
			} else {
				const _title = document.createElement("title");
				_title.textContent = this.$appName;
				document.getElementsByTagName("head")[0].append(_title);
			}
		}
		Input(message, buttons) {
			return new Promise(function (res, rej) {
				const body = document.getElementsByTagName("body")[0];
				const dlg = document.createElement("dialog");
				dlg.style["background-color"] = "#c8c8c8";
				dlg.style["border-radius"] = "10px";
				const msg = document.createElement("h2");
				msg.textContent = message;
				dlg.appendChild(msg);
				const input = document.createElement("input");
				dlg.appendChild(input);
				dlg.appendChild(document.createElement("br"));
				dlg.appendChild(document.createElement("br"));
				for (let i = 0; i < buttons.length; i++) {
					const btn = document.createElement("button");
					btn.style["padding-left"] = btn.style["padding-right"] = "6px";
					btn.style["padding-top"] = btn.style["padding-bottom"] = "4px";
					btn.style["border-radius"] = "6px";
					btn.style.cursor = "pointer";
					if (buttons[i] === "Ok" || buttons[i] === "Submit") {
						btn.style["background-color"] = "#1e90ff";
						btn.style.border = "2px solid #4682b4";
						btn.style["border-radius"] = "4px";
						btn.style.color = "#ffffff";
					} else if (buttons[i] === "Cancel" || buttons[i] === "Close") {
						btn.style["background-color"] = "#fa7575";
						btn.style.border = "2px solid #b55757";
						btn.style["border-radius"] = "4px";
						btn.style.color = "#ffffff";
					}
					btn.textContent = buttons[i];
					btn.addEventListener("click", function () {
						if (btn.textContent === "Ok" || btn.textContent === "Submit") {
							res(input.value);
						} else if (btn.textContent === "Cancel" || btn.textContent === "Close") {
							rej("cancelled");
						}
						body.removeChild(dlg);
					});
					dlg.appendChild(btn);
				}
				body.appendChild(dlg);
				dlg.showModal();
			});
		}
		$progress() {
			this.$pageContentLoaded++;
			if (this.$pageContentLoaded === this.$pages.length * 2) {
				const onload = this.onload;
				this.onload = function () { };
				onload();
			}
		}
		GetPage(title) {
			for (let i = 0; i < this.$pages.length; i++) {
				if (this.$pages[i].title === title) {
					return this.$pages[i];
				}
			}
			return null;
		}
		CreatePage(title, htmlDirectory, jsControllerDirectory) {
			return this.$pages.push(new Page(title, htmlDirectory, jsControllerDirectory, this))
		}
		RefreshAllContent() {
			this.$pageContentLoaded = 0;
			this.$pages.forEach(function (page) {
				return page = new Page(page.title, page.htmlDirectory, page.jsControllerDirectory, this);
			});
		}
		Render(page) {
			if (page || this.Page === "" || typeof this.Page !== "string") {
				if (this.$pages.length > 0) {
					if (page) {
						this.Page = this.GetPage(page).title;
					} else {
						this.Page = this.$pages[0].title;
					}
				} else {
					throw new Error("[APP] No pages created, create at least one page before rendering the page.");
				}
			}
			const _page = this.GetPage(this.Page);
			if (!_page.htmlPartialLoaded || !_page.jsControllerLoaded) {
				throw new Error("[APP] Page cannot be rendered, content not yet loaded. (Use APP.onload to ensure page contents are not used before loaded.)");
			}
			document.getElementsByTagName("body")[0].innerHTML = _page.htmlPartial;
			const conditions = document.getElementsByTagName("condition");
			const _script = document.createElement("script");
			_script.textContent = _page.jsController;
			document.getElementsByTagName("body")[0].appendChild(_script);
		}
		Controller(name) {
			const _controller = new DOMLibController(name);
			this.Controllers.push(_controller);
			return _controller;
		}
	}
	return {
		"Init": function (name) {
			delete this.Init;
			return new DOMLibInstance(name);
		},
		"GET": GET
	};
})();
console.log("Loaded DOMLib by Matthew James");
