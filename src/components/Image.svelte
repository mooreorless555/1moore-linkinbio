<script>
	import { onMount } from 'svelte';
	import anime from 'animejs';
	import { fade } from 'svelte/transition';
	export let src;
	export let classes;
	export let height = 300;

	let loaded = false;
	let failed = false;
	let loading = true;

	onMount(() => {
		const img = new Image();
		img.src = src;

		img.onload = () => {
			setTimeout(() => {
				loading = false;
				loaded = true;
			}, 100);
		};
		img.onerror = () => {
			loading = false;
			failed = true;
		};
	});

	function forward(node) {
		return {
			css: (t) => {
				return anime({
					targets: node,
					opacity: [0, 1],
					height: [0, height],
					easing: 'easeOutCubic',
					delay: 1000
				});
			}
		};
	}
</script>

<img class={classes} in:forward {src} alt="Document" />

<!-- {:else if failed} -->
<!-- <img src="https://icon-library.com/images/not-found-icon/not-found-icon-20.jpg" alt="Not Found" /> -->
<!-- {:else if loading} -->
<!-- <div>Loading...</div> -->
<!-- {/if} -->
