const canvas = document.createElement("canvas"), ctx = canvas.getContext("2d"), body = document.body || document.getElementsByTagName("body")[0];

canvas.width = Math.max(body.clientWidth, window.innerWidth);
canvas.height = Math.max(body.clientHeight, window.innerHeight);
canvas.style.position = "absolute";
canvas.style.left = "0px";
canvas.style.top = "0px";
canvas.style["z-index"] = -9999;

document.body.append(canvas);

Math.TWO_PI = Math.PI * 2;

window.addEventListener("resize", function() {
	canvas.width = Math.max(body.clientWidth, window.innerWidth);
	canvas.height = Math.max(body.clientHeight, window.innerHeight);
	HTMLParticleSystem.getBouncyElements();
});

const HTMLParticleSystem = {
	"particles": [],
	"bouncyElements": [],
	"getBouncyElements": function() {
		this.bouncyElements = Array.prototype.map.call(document.getElementsByClassName("bouncy"), function(element) { return element.getBoundingClientRect(); });
	},
	"new": function(x, y, dir, colour) {
		this.particles.push(new HTMLParticle(x, y, dir, colour));
	},
	"update": function(deltaTime = 16.6) {
		for (let i = 0; i < this.particles.length; i++) {
			this.particles[i].update(deltaTime);
		}
	},
	"render": function() {
		ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		for (let i = 0; i < this.particles.length; i++) {
			this.particles[i].render();
		}
	}
};

HTMLParticleSystem.getBouncyElements();

class HTMLParticle {
	constructor(x, y, dir, colour) {
		this.x = x;
		this.y = y;
		this.xVel = (dir || Math.round(Math.random()) ? -1 : 1) * Math.random() * 6;
		this.yVel = Math.random() * 2;
		this.size = Math.random() * 10 + 5;
		this.weight = this.size * 0.01;
		this.colour = colour || "rgb(" + ~~(Math.random() * 256) + ", " + ~~(Math.random() * 256) + ", " + ~~(Math.random() * 256) + ")";
	}
	update(deltaTime) {
		this.yVel += this.weight * deltaTime / 16.6;
		this.y += this.yVel * deltaTime / 16.6;
		const size = this.size * 2;
		let x, y;
		if (this.y > canvas.height) {
			this.x = Math.random() * canvas.width;
			this.y = 0;
			this.yVel = 1;
		} else {
			x = this.x - this.size;
			y = this.y - this.size;
			for (let i = 0; i < HTMLParticleSystem.bouncyElements.length; i++) {
				const element = HTMLParticleSystem.bouncyElements[i];
				if (x < element.x + element.width && x + size > element.x && y < element.y + element.height && y + size > element.y) {
					const dir = Math.sign(this.yVel) || -1;
					while (x < element.x + element.width && x + size > element.x && y < element.y + element.height && y + size > element.y) {
						this.y -= dir;
						y = this.y - this.size;
					}
					if (this.yVel > 0) {
						this.yVel = -this.yVel / 2;
					} else {
						this.yVel = 0;
					}
				}
			}
		}
		this.x += this.xVel * deltaTime / 16.6;
		x = this.x - this.size;
		y = this.y - this.size;
		for (let i = 0; i < HTMLParticleSystem.bouncyElements.length; i++) {
			const element = HTMLParticleSystem.bouncyElements[i];
			if (x < element.x + element.width && x + size > element.x && y < element.y + element.height && y + size > element.y) {
				const dir = Math.sign(this.xVel) || 1;
				while (x < element.x + element.width && x + size > element.x && y < element.y + element.height && y + size > element.y) {
					this.x -= dir;
					x = this.x - this.size;
				}
				this.xVel /= -2;
			}
		}
	}
	render() {
		ctx.beginPath();
		ctx.fillStyle = this.colour;
		ctx.arc(this.x, this.y, this.size, 0, Math.TWO_PI);
		ctx.fill();
		ctx.closePath();
	}
}

function initParticles(count) {
	window.requestAnimationFrame((function() {
		for (let i = 0; i < count; i++) {
			HTMLParticleSystem.new(Math.random() * window.innerWidth, -50);
		}
		HTMLParticleSystem.getBouncyElements();
		const MAX_FRAME = 100;
		let previousFrame = 0;
		return function manage_particles(currentFrame) {
			HTMLParticleSystem.update(Math.min(currentFrame - previousFrame, MAX_FRAME));
			HTMLParticleSystem.render();
			previousFrame = currentFrame;
			window.requestAnimationFrame(manage_particles);
		};
	})());
}

export { initParticles as default };