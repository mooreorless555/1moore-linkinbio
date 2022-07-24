<script lang="ts">
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons';
	import Typewriter, { concurrent } from 'svelte-typewriter';
	import { onDestroy, onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import ElementTransition from 'src/components/ElementTransition.svelte';
	import gsap from 'gsap';
	import {
		toggleIsPlaying,
		isPlaying,
		currentSongPreview,
		currentSongPreviewCaption
	} from '$lib/stores';
	import AudioPlayer from 'src/components/AudioPlayer.svelte';
	import { SongPreviewer, SONGS } from '$lib/song_previewer';

	const waveformSpeed = tweened(0.3, {
		duration: 800,
		easing: cubicInOut
	});

	let LottiePlayer;
	let shouldShowListenButton = true;
	let songPreviewer = new SongPreviewer();

	const unsubscribe = isPlaying.subscribe((isPlaying) => waveformSpeed.set(isPlaying ? 0.8 : 0.3));

	onMount(async () => {
		const module = await import('@lottiefiles/svelte-lottie-player');
		LottiePlayer = module.LottiePlayer;
		handleSongPreview();
	});

	onDestroy(unsubscribe);

	function getOffset(el) {
		const rect = el.getBoundingClientRect();
		return {
			left: rect.left + window.scrollX,
			top: rect.top + window.scrollY
		};
	}

	function handleSongPreview() {
		if (!$isPlaying) {
			isPlaying.set(true);
			songPreviewer.playFromBeginning();
			currentSongPreview.set(SONGS[0]);
			console.log($currentSongPreview);
			waveformSpeed.set(0.8);
		} else {
			isPlaying.set(false);
			songPreviewer.stop();
			waveformSpeed.set(0.3);
		}
	}
</script>

<div id="preview-page" class="container px-6 py-16 mx-auto h-screen">
	<div class="max-w-lg mx-auto">
		<Typewriter delay={100} interval={[30, 40, 50]}>
			<h1 class="text-6xl title font-bold">Now Playing.</h1>
		</Typewriter>
		<ElementTransition>
			<Typewriter delay={1000} interval={[30, 40, 50]}>
				<p class="mt-6 caption text-xl">Thanks for taking a listen! Make sure your sound is on.</p>
			</Typewriter>
			<p class="mt-6 caption text-3xl">
				<Typewriter delay={1000} interval={[30, 40, 50]}>
					{$currentSongPreview?.name || 'No song playing yet.'}
				</Typewriter>
			</p>
		</ElementTransition>

		<div class="spacer mt-20 text-end" />
		{#if shouldShowListenButton}
			<ElementTransition>
				<button
					on:click={handleSongPreview}
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
		{/if}
	</div>
	{#each SONGS as song}
		<AudioPlayer id={song.name} src={song.audioFileUrl} />
	{/each}
	<Typewriter interval={[30, 40, 50]}>
		<p class="mt-6 caption text-2xl">{$currentSongPreviewCaption}</p>
	</Typewriter>
</div>

<style>
	.waveform-container {
		margin-left: 140px;
		margin-top: -25%;
		transition: all ease 0.2s;
		z-index: 1;
	}
</style>
