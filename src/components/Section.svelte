<script>
	import { changeBackgroundColor, getBackgroundColor } from '$lib/util';
	import { createEventDispatcher } from 'svelte';
	import { inview } from 'svelte-inview';
	export let color = '#111111';

	const dispatch = createEventDispatcher();

	function heightChanged({ detail }) {
		dispatch('heightChanged', detail.height);
	}

	let initialBackgroundColor = '#111111';

	const options = {
		threshold: 0.5
	};

	function updateBackgroundColor() {
		initialBackgroundColor = getBackgroundColor();
		setTimeout(() => {
			changeBackgroundColor(color || '#111111');
		}, 100);
	}

	function resetBackgroundColor() {
		changeBackgroundColor(initialBackgroundColor);
	}
</script>

<!-- <SwipeItem allow_dynamic_height={true} on:swipe_item_height_change={heightChanged}> -->
<div use:inview={options} on:enter={updateBackgroundColor} on:leave={resetBackgroundColor}>
	<section>
		<slot />
	</section>
</div>
<!-- </SwipeItem> -->
