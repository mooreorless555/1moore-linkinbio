<script lang="ts">
	import { changeBackgroundColor } from '$lib/util';
	import gsap from 'gsap/dist/gsap';
	import ScrollTrigger from 'gsap/dist/ScrollTrigger';
	import Scrollbar from 'smooth-scrollbar';
	import ElementTransition from 'src/components/ElementTransition.svelte';
	import { onMount } from 'svelte';
	import Typewriter from 'svelte-typewriter';

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

		gsap.from('.listen-btn', { opacity: 0, translateY: -30, duration: 0.2, delay: 6.5 });

		const timeline = gsap.timeline({
			scrollTrigger: {
				trigger: '.section-2',
				start: 'top center',
				end: '+=0%',
				scrub: true,
				pin: true,
				snap: 1 / (sections.length - 1)
			}
		});
		timeline
			.call(() => console.log('HAPPENING'))
			.call(changeBackgroundColor, ['#111111'])
			.call(changeBackgroundColor, ['#886fe8'], 0.1)
			.from(sections, { duration: 1, translateY: 0 });
	});
</script>

<div class="scrollbar" style="height: 100vh;">
	<div class="background-image-container">
		<!-- <img src="/images/dot_grid.png" class="background-image" alt="dot grid background" /> -->
		<img src="/images/1moore_profile_pic.png" class="profile-pic" alt="1Moore Profile Pic" />
	</div>
	<section>
		<div class="container px-6 py-16 mx-auto h-screen text-start">
			<div class="max-w-lg mx-auto">
				<Typewriter delay={100} interval={[30, 40, 50]}>
					<h1 class="text-6xl title font-bold">Hi, I'm 1Moore.</h1>
				</Typewriter>

				<Typewriter delay={2000} interval={[30, 40, 50]}>
					<p class="mt-6 caption text-2xl">
						I'm a music producer and software engineer from Chicago, IL.
					</p>
				</Typewriter>
				<Typewriter delay={4000} interval={[30, 40, 50]}>
					<p class="mt-6 caption text-2xl">Welcome to my music and socials site!</p>
				</Typewriter>
				<Typewriter delay={6000} interval={[30, 40, 50]}>
					<p class="mt-6 caption text-2xl">
						Tap below to preview some of my tracks, see if it's your vibe.
					</p>
				</Typewriter>
				<div class="spacer mt-20" />
				<button
					type="button"
					class="listen-btn title text-2xl bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2"
					>Listen</button
				>
			</div>
		</div>
	</section>
	<section class="section-2">
		<div class="container px-6 py-16 h-screen mx-auto text-start">
			<div class="max-w-lg mx-auto">
				<h1 class="text-6xl font-bold title">Listen to my Spotify.</h1>
				<p class="mt-6 caption">I'm a music producer and software engineer from Chicago, IL.</p>
			</div>
		</div>
	</section>
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
		z-index: 0;
	}

	.profile-pic {
		width: auto;
		height: 200px;
		transform: translateX(40vw) translateY(50px);
		opacity: 0.5;
	}

	.spacer {
		content: '';
	}
</style>
