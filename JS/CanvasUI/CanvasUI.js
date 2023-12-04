const InitCanvasUI = function(canvas) {
	let rect = canvas.getBoundingClientRect();
	const ui_components = [];
	const ui_container = document.createElement("div");
	ui_container.style.position = "absolute";
	ui_container.style.left = ui_container.style.top = "0px";
	ui_container.style.width = ui_container.style.height = "100%";
	const body = document.querySelector("body");
	body.appendChild(ui_container);
	function initComponent(type, component) {
		component.style.position = "absolute";
		component.style.left = rect.left + "px";
		component.style.top = rect.top + "px";
		component.hidden = false;
		switch (type) {
			case "button":
				component.textContent = "Untitled Button";
				break;
			case "dropdown":
				component.option = function(content, value) {
					const option = document.createElement("option");
					component.textContent = content;
					component.value = value;
					component.appendChild(option);
				};
				break;
			case "text":
				component.textContent = "Some text";
				break;
		}
		if (["input", "textarea"].includes(type)) {
			component.text = function(content) {
				component.value = content;
				return component;
			};
		} else {
			component.text = function(content) {
				component.textContent = content;
				return component;
			};
		}
		component.x = component.left = function(x) {
			component.style.left = (rect.left + x) + "px";
			return component;
		};
		component.y = component.top = function(y) {
			component.style.top = (rect.top + y) + "px";
			return component;
		};
		component.position = function(x, y) {
			component.style.left = (rect.left + x) + "px";
			component.style.top = (rect.top + y) + "px";
			return component;
		};
		component.moveX = function(dist) {
			component.style.left = (parseFloat(component.style.left) + dist) + "px";
			return component;
		};
		component.moveY = function(dist) {
			component.style.top = (parseFloat(component.style.top) + dist) + "px";
			return component;
		};
		component.move = function(xDist, yDist) {
			component.style.left = (parseFloat(component.style.left) + xDist) + "px";
			component.style.top = (parseFloat(component.style.top) + yDist) + "px";
			return component;
		};
		component.width = function(value) {
			component.style.width = Math.abs(value) + "px";
			return component;
		};
		component.height = function(value) {
			component.style.height = Math.abs(value) + "px";
			return component;
		};
		component.dimensions = function(xValue, yValue) {
			component.style.width = Math.abs(xValue) + "px";
			component.style.height = Math.abs(yValue) + "px";
			return component;
		};
		component.rect = function(x, y, width, height) {
			component.style.left = x + "px";
			component.style.top = y + "px";
			component.style.width = Math.abs(width) + "px";
			component.style.height = Math.abs(height) + "px";
			return component;
		};
		component.textSize = component.fontSize = function(size) {
			const font = (component.style.font || "12px Arial").split(" ");
			font.shift();
			component.style.font = Math.abs(size) + "px " + font.join(" ");
		};
		component.fontName = function(font) {
			component.style.font = (component.style.font.split(" ")[0] || "12px") + " " + font;
		};
		component.font = function(size, font) {
			component.style.font = size.toString() + "px " + font;
		};
		component.colour = function(colour) {
			component.style.color = colour;
		};
		component.backgroundColour = function(colour) {
			component.style["background-color"] = colour;
		};
		component.addCSS = function(css) {
			component.style.cssText += css;
		};
		component.setCSS = function(css) {
			component.style.cssText = css;
		};
		return component;
	}
	return {
		"Refresh": function() {
			canvas.getBoundingClientRect();
		},
		"CreateButton": function() {
			const btn = document.createElement("button");
			initComponent("button", btn);
			ui_container.appendChild(btn);
			ui_components.push(btn);
			return btn;
		},
		"CreateText": function() {
			const text = document.createElement("span");
			initComponent("text", text);
			ui_container.appendChild(text);
			ui_components.push(text);
			return text;
		},
		"CreateDropdown": function() {
			const dropdown = document.createElement("select");
			initComponent("dropown", dropdown);
			ui_container.appendChild(dropdown);
			ui_components.push(dropdown);
			return dropdown;
		},
		"CreateTextarea": function() {
			const textarea = document.createElement("textarea");
			initComponent("textarea", textarea);
			ui_container.appendChild(textarea);
			ui_components.push(textarea);
			return textarea;
		},
		"CreateInput": function(type) {
			const input = document.createElement("input");
			input.type = type;
			initComponent("input", input);
			ui_container.appendChild(input);
			ui_components.push(input);
			return input;
		},
		"CreateHTMLComponent": function(tag, type = "HTMLComponent") {
			const component = document.createElement(tag);
			initComponent(type, component);
			ui_container.appendChild(component);
			ui_components.push(component);
			return component;
		},
		"RemoveComponent": function(component) {
			ui_container.removeChild(component);
			ui_components.splice(ui_components.indexOf(component), 1);
		}
	};
};
console.log("Loaded Canvas UI by Matthew James");