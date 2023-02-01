<script lang="ts">
	import { onMount } from 'svelte';
	let canvas, ctx, w, h, flakes;

	// Set the canvas size to the size of the window
	function setCanvasSize() {
		w = window.innerWidth;
		h = window.innerHeight;
		canvas.width = w;
		canvas.height = h;
	}

	// Create a snowflake object
	function Snowflake() {
		// Set the initial position of the snowflake
		this.x = Math.random() * w;
		this.y = Math.random() * h;

		// Set the initial velocity of the snowflake
		this.vx = 0;
		this.vy = Math.random() * 0.5 + 0.1;

		// Set the initial size of the snowflake
		this.radius = Math.random() * 3 + 1;

		// Set the initial phase of the snowflake
		this.phase = Math.random() * Math.PI * 2;
	}

	// Update the snowflake's position based on its velocity
	Snowflake.prototype.update = function () {
		// Move the snowflake
		this.x += this.vx;
		this.y += this.vy;

		// If the snowflake goes off the bottom of the screen,
		// wrap it around to the top
		if (this.y > h) {
			this.y -= h;
		}

		// If the snowflake goes off the side of the screen,
		// wrap it around to the other side
		if (this.x > w) {
			this.x -= w;
		} else if (this.x < 0) {
			this.x += w;
		}

		// Update the phase of the snowflake
		this.phase += 0.04 * Math.random() + 0.01;
	};

	// Draw the snowflake on the canvas
	Snowflake.prototype.draw = function () {
		ctx.beginPath();
		ctx.arc(this.x + Math.sin(this.phase) * 10, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = 'white';
		ctx.fill();
	};

	// Initialize the array of snowflakes
	function initFlakes() {
		flakes = [];
		for (let i = 0; i < 100; i++) {
			flakes.push(new Snowflake());
		}
	}

	// Update and draw the snowflakes
	function drawFrame() {
		// Clear the canvas
		ctx.clearRect(0, 0, w, h);

		// Update and draw the snowflakes
		flakes.forEach((flake) => {
			flake.update();
			flake.draw();
		});

		// Request the next frame
		requestAnimationFrame(drawFrame);
	}

	// Get the canvas element and set the context when the component is mounted
	onMount(() => {
		canvas = document.getElementById('canvas')!;
		ctx = canvas.getContext('2d');
		setCanvasSize();
		initFlakes();
		requestAnimationFrame(drawFrame);
		// Set the canvas size when the window is resized
		window.addEventListener('resize', setCanvasSize);
	});
</script>

<canvas id="canvas" />
