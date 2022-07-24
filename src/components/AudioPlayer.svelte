<script context="module">
	const audioPlayers = new Map([]);

	export function stop(playerId) {
		audioPlayers.get(playerId).pause();
	}

	export function stopAll() {
		audioPlayers.forEach((p) => p.pause());
	}

	export function play(playerId) {
		audioPlayers.get(playerId).play();
	}
</script>

<script>
	import { onMount } from 'svelte';

	export let src;
	export let id;

	let player;

	onMount(() => {
		audioPlayers.set(id, player);
	});
</script>

<div>
	<audio {id} bind:this={player} {src} controls>
		<track kind="captions" />
	</audio>
</div>
