<script>
	import { isPlaying, toggleIsPlaying } from '$lib/stores';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import Typewriter from 'svelte-typewriter';
	import { cubicInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import { tweened } from 'svelte/motion';

	const dispatch = createEventDispatcher();

	const waveformSpeed = tweened(0.3, {
		duration: 800,
		easing: cubicInOut
	});

	let LottiePlayer;
	let shouldShowListenButton = false;

	const unsubscribe = isPlaying.subscribe((isPlaying) => waveformSpeed.set(isPlaying ? 0.8 : 0.3));

	onMount(async () => {
		const module = await import('@lottiefiles/svelte-lottie-player');
		LottiePlayer = module.LottiePlayer;
	});

	onDestroy(unsubscribe);

	function getOffset(el) {
		const rect = el.getBoundingClientRect();
		return {
			left: rect.left + window.scrollX,
			top: rect.top + window.scrollY
		};
	}

	function handlePlayStop() {
		dispatch('listenBtnClicked');
		toggleIsPlaying();
	}

	function showListenButton() {
		shouldShowListenButton = true;
	}
</script>

<div id="top" class="container px-6 py-16 mx-auto h-screen" style="z-index: 99;">
	<div class="max-w-lg mx-auto">
		<Typewriter delay={40} interval={[30, 40, 50]} mode={'cascade'} on:done={showListenButton}>
			<h1 class="text-6xl title font-bold">Hi, I'm 1Moore!</h1>
			<p class="mt-6 caption text-2xl">
				I'm a music producer and software engineer from Chicago, IL.
			</p>
			<p class="mt-6 caption text-2xl">Thank YOU for being interested, or at least curious.</p>
			<p class="mt-6 caption text-2xl">This is my custom link in bio site.</p>
			<!-- <p class="mt-6 caption text-2xl">
				ORRR you can also tap below to preview some of my tracks right here on this site, see if
				it's your vibe.
			</p> -->
		</Typewriter>
		<div class="spacer mt-20 text-end" />
		{#if shouldShowListenButton}
			<div transition:fade style="overflow: hidden; transform: scale(0.5); margin-top: -100px;">
				{#if LottiePlayer}
					<LottiePlayer
						src="lottie/scroll_down.json"
						background="transparent"
						loop={true}
						autoplay={true}
						style="pointer-events: none;"
					/>
				{/if}
			</div>
		{/if}
		<!-- {#if shouldShowListenButton}
			<ElementTransition>
				<button
					on:click={handlePlayStop}
					type="button"
					style="transition: all ease 0.2s;"
					class="listen-btn px-4 inline-flex items-center title text-2xl bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg px-5 py-2.5 text-end mr-2 mb-2"
				>
					<div class="px-10">
						<Fa icon={$isPlaying ? faStop : faPlay} />
					</div>
				</button>
				{#if LottiePlayer}
					<div class="waveform-container" style="overflow: hidden;">
						<LottiePlayer
							src="https://assets7.lottiefiles.com/packages/lf20_4tyanb7k.json"
							background="transparent"
							speed={$waveformSpeed}
							loop={true}
							autoplay={true}
							style="pointer-events: none; width: 110vw; height: 100px;"
						/>
					</div>
				{/if}
			</ElementTransition>
			<Typewriter delay={7000} interval={[30, 40, 50]} on:done={showListenButton}>
				<p class="mt-6 caption text-xl">Up to you.</p>
			</Typewriter>
		{/if} -->
	</div>
</div>

<style>
	.waveform-container {
		margin-left: 140px;
		margin-top: -25%;
		transition: all ease 0.2s;
		z-index: 1;
	}
</style>
