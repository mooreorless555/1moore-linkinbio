<script>
	import { changeBackgroundColor, getBackgroundColor } from '$lib/util';
	import { onMount } from 'svelte';
	import { inview } from 'svelte-inview';
	export let color = '#111111';

	let initialBackgroundColor = '#111111';

	const options = {
		threshold: 0.5
	};

	function updateBackgroundColor() {
		initialBackgroundColor = getBackgroundColor();
		changeBackgroundColor(color);
	}

	function resetBackgroundColor() {
		changeBackgroundColor(initialBackgroundColor);
	}
</script>

<div use:inview={options} on:enter={updateBackgroundColor} on:leave={resetBackgroundColor}>
	<slot />
</div>
