<script lang="ts">
	import { changeBackgroundColor } from '$lib/util';
	import anime from 'animejs';
	import Image from 'src/components/Image.svelte';
	import { onMount } from 'svelte';
	import { elasticOut } from 'svelte/easing';

	export let data;

	const { name, artist, spotifyUrl, imageUrl } = data.tracks[data.slug];

	let visible = false;

	let trackName = onMount(() => {
		visible = true;
	});

	let isRunning = false;

	function handleClick() {
		window.open(spotifyUrl, '_blank')?.focus();
	}

	function forward(node) {
		return {
			css: (t) => {
				if (isRunning) return;

				isRunning = true;
				const title = node.querySelector('#title');
				const titleHeight = parseInt(window.getComputedStyle(title).fontSize, 10);
				const subtitle = node.querySelector('#subtitle');
				const subtitleHeight = parseInt(window.getComputedStyle(subtitle).fontSize, 10);
				const allTiles = document.querySelectorAll('.my-tile');
				const spotifyButton = node.querySelector('#spotify-button');

				const tileTl = anime
					.timeline({
						direction: 'alternate',
						loop: true
					})
					.add({
						targets: allTiles,
						easing: 'easeOutCubic',
						scale: [1, 0.5],
						opacity: [0, 0.2],
						delay: anime.stagger(100, { grid: [10, 15], from: 'center' })
					})
					.add({
						targets: allTiles,
						easing: 'easeOutCubic',
						opacity: 0.1,
						scale: 0.2,
						delay: anime.stagger(100, { grid: [10, 15], from: 'center' })
					});

				tileTl.play();

				const tl = anime
					.timeline()
					.add({
						targets: title,
						duration: 800,
						easing: 'easeOutCubic',
						opacity: [0, 1],
						height: [0, titleHeight],
						delay: 1000
					})
					.add(
						{
							targets: subtitle,
							duration: 800,
							easing: 'easeOutCubic',
							opacity: [0, 1],
							height: [0, subtitleHeight]
						},
						'-=500'
					)
					.add({ targets: spotifyButton, duration: 600, easing: 'easeOutCubic', scale: [0, 1] })
					.add({
						targets: spotifyButton.querySelector('div'),
						duration: 800,
						width: [0, '20px'],
						marginRight: [0, 12],
						marginLeft: [0, -8],
						easing: 'easeOutCubic'
					})
					.add(
						{
							targets: spotifyButton.querySelectorAll('i'),
							duration: 1200,
							rotate: [1000, 0],
							scale: [0, 1],
							delay: 100
						},
						'-=800'
					);
				return tl;
			}
		};
	}
</script>

<div class="flex items-center justify-center h-screen" style="transform: scale(1.1);">
	{#if visible}
		<div id="tiles">
			{#each Array(300) as _, i}
				<div class="my-tile" />
			{/each}
		</div>
		<div class="flex-column justify-items-center text-center" in:forward>
			<Image classes="image m-auto" height={192} src={imageUrl} />
			<h1 id="title" class="text-5xl m-5">{name}</h1>
			<div id="subtitle" class="m-5 opacity-80">{artist}</div>
			<button
				id="spotify-button"
				type="button"
				class="m-5 text-white bg-spotify-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
				on:click={handleClick}
			>
				<div>
					<i class="fa-brands fa-spotify" />
				</div>
				Play on Spotify
			</button>
		</div>
	{/if}
</div>

<style>
	#tiles {
		position: absolute;
		height: 100vh;
		width: 100vw;

		display: grid;
		grid-template-columns: repeat(10, 1fr);
		grid-template-rows: repeat(15, 1fr);
		z-index: -1;
	}

	.my-tile {
		outline: 1px solid white;
		opacity: 0.1;
	}
</style>
