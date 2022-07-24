<script lang="ts">
	import gsap from 'gsap/dist/gsap';
	import ScrollTrigger from 'gsap/dist/ScrollTrigger';
	import Scrollbar from 'smooth-scrollbar';
	import ElementTransition from 'src/components/ElementTransition.svelte';
	import { onMount } from 'svelte';
	import GreetingPage from 'src/pages/GreetingPage.svelte';
	import Section from 'src/components/Section.svelte';
	import { isPlaying } from '$lib/stores';

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		const scroller = document.querySelector('.scrollbar') as HTMLElement;

		const smoothScroll = Scrollbar.init(scroller, {
			damping: 0.1,
			delegateTo: document
		});
		Scrollbar.detachStyle();

		ScrollTrigger.scrollerProxy(scroller, {
			scrollTop(value) {
				if (arguments.length) {
					// @ts-ignore
					smoothScroll.scrollTop = value;
				}
				return smoothScroll.scrollTop;
			}
		});

		smoothScroll.addListener(ScrollTrigger.update);

		ScrollTrigger.defaults({
			scroller: scroller,
			pinType: 'transform'
		});

		let sections = gsap.utils.toArray('section');

		gsap.to('.background-image-container', { opacity: 1, delay: 4, duration: 2 });

		isPlaying.subscribe((isPlaying) => {
			if (isPlaying) {
				console.log('IS PLAYING');
				setTimeout(() => {
					smoothScroll.scrollTo(0, window.innerHeight, 800);
				}, 700);
			}
		});
		// const timeline = gsap.timeline({
		// 	scrollTrigger: {
		// 		trigger: '.section-2',
		// 		start: 'top center',
		// 		end: '+=0%',
		// 		scrub: true,
		// 		pin: true
		// 	}
		// });
		// timeline
		// 	.call(() => console.log('HAPPENING'))
		// 	.call(changeBackgroundColor, ['#111111'])
		// 	.call(changeBackgroundColor, ['#886fe8'], 0.1)
		// 	.from('.section-3', { duration: 1, translateY: 0 });
	});
</script>

<div class="scrollbar main" style="height: 100vh;">
	<div class="background-image-container">
		<!-- <img src="/images/dot_grid.png" class="background-image" alt="dot grid background" /> -->
		<img src="/images/1moore_profile_pic.png" class="profile-pic" alt="1Moore Profile Pic" />
	</div>
	<Section color={'#111111'}>
		<section>
			<GreetingPage />
		</section>
	</Section>
	<Section color={'#1DB954'}>
		<section>
			<div class="container px-6 py-16 h-screen mx-auto text-start">
				<div class="max-w-lg mx-auto">
					<h1 class="text-6xl font-bold title">Check out my Spotify.</h1>
					<p class="mt-6 text-3xl caption">
						I think you'll find something for your next summer playlist.
					</p>
				</div>
				<button
					type="button"
					class="mt-24 text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-2xl px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
					>Go to Artist Page</button
				>
			</div>
		</section>
	</Section>
	<Section color={'#F26F23'}>
		<section>
			<div class="container px-6 py-16 h-screen mx-auto text-start">
				<div class="max-w-lg mx-auto">
					<h1 class="text-6xl font-bold title">Hit me up on SoundCloud.</h1>
					<p class="mt-6 text-3xl caption">
						I post remixes/bootlegs and other tracks I can't legally upload to Spotify. RIP, lol.
					</p>
				</div>
				<button
					type="button"
					class="mt-24 text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-2xl px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
					>Visit my Soundcloud</button
				>
			</div>
		</section>
	</Section>
	<Section color={'#F56040'}>
		<section>
			<div class="container px-6 py-16 h-screen mx-auto text-start">
				<div class="max-w-lg mx-auto">
					<h1 class="text-6xl font-bold title">I post on IG often!</h1>
					<p class="mt-6 text-3xl caption">
						Most active here! I upload works in progress, behind the scenes on my music, and
						generally just mess around. Please say hi!
					</p>
				</div>
				<button
					type="button"
					class="mt-24 text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-2xl px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
					>Visit my Instagram</button
				>
			</div>
		</section>
	</Section>
	<Section color={'#111'}>
		<section>
			<div class="container px-6 py-16 h-screen mx-auto text-start">
				<div class="max-w-lg mx-auto">
					<h1 class="text-6xl font-bold title">I'm trying to get into Tiktok.</h1>
					<p class="mt-6 text-3xl caption">
						I don't post a whole lot on there just yet but you're welcome to take a look, lol.
					</p>
				</div>
				<button
					type="button"
					class="mt-24 text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-2xl px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
					>Visit my Tiktok</button
				>
			</div>
		</section>
	</Section>

	<section class="section-3">
		<div class="container px-6 py-16 h-screen mx-auto text-start">
			<div class="max-w-lg mx-auto">
				<ElementTransition>
					<h1 class="text-6xl font-bold title">Listen to my Spotify???</h1>
				</ElementTransition>
				<p class="mt-6 caption">I'm a music producer and software engineer from Chicago, IL.</p>
			</div>
		</div>
	</section>
</div>

<style>
	.background-image {
		opacity: 0.01;
		transform: translateX(20%) translateY(-100%) scale(2) rotateZ(30deg);
	}

	.background-image-container {
		position: absolute;
		z-index: -1;
	}

	.profile-pic {
		width: auto;
		height: 200px;
		transform: translateX(40vw) translateY(50px);
		opacity: 0.6;
	}

	.spacer {
		content: '';
	}
</style>
