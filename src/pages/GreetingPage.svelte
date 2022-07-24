<script>
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
	import Typewriter from 'svelte-typewriter';
	import { onDestroy, onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import ElementTransition from 'src/components/ElementTransition.svelte';
	import gsap from 'gsap';
	import PreviewPage from './PreviewPage.svelte';
	import { toggleIsPlaying, isPlaying } from '$lib/stores';

	const waveformSpeed = tweened(0.3, {
		duration: 800,
		easing: cubicInOut
	});

	let LottiePlayer;
	let shouldShowListenButton = false;
	let clickedListenButton = false;

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
		clickedListenButton = true;
	}

	function showListenButton() {
		shouldShowListenButton = true;
	}
</script>

<div class="container px-6 py-16 mx-auto h-screen" style="z-index: 99;">
	<div class="max-w-lg mx-auto">
		<Typewriter delay={100} interval={[30, 40, 50]}>
			<h1 class="text-6xl title font-bold">Hi, I'm 1Moore.</h1>
		</Typewriter>
		<ElementTransition>
			<Typewriter delay={2000} interval={[30, 40, 50]}>
				<p class="mt-6 caption text-2xl">
					I'm a music producer and software engineer from Chicago, IL.
				</p>
			</Typewriter>
			<Typewriter delay={4000} interval={[30, 40, 50]}>
				<p class="mt-6 caption text-2xl">Welcome to my music and socials site!</p>
			</Typewriter>
			<Typewriter delay={6000} interval={[30, 40, 50]} on:done={showListenButton}>
				<p class="mt-6 caption text-2xl">
					Tap below to preview some of my tracks, see if it's your vibe.
				</p>
			</Typewriter>
		</ElementTransition>

		<div class="spacer mt-20 text-end" />
		{#if shouldShowListenButton}
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
					<div class="waveform-container">
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
			<Typewriter delay={3500} interval={[30, 40, 50]} on:done={showListenButton}>
				<p class="mt-6 caption text-xl">Or keep scrolling for my social links.</p>
			</Typewriter>
		{/if}
	</div>
</div>
{#if clickedListenButton}
	<ElementTransition>
		<PreviewPage />
	</ElementTransition>
{/if}

<style>
	.waveform-container {
		margin-left: 140px;
		margin-top: -25%;
		transition: all ease 0.2s;
		z-index: 1;
	}
</style>
