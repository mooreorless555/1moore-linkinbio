<script lang="ts">
	import { getSectionData } from '$lib/util';

	import gsap from 'gsap/dist/gsap';
	import Section from 'src/components/Section.svelte';
	import Snowflakes from 'src/components/Snowflakes.svelte';
	import GenericPage from 'src/pages/GenericPage.svelte';
	import GreetingPage from 'src/pages/GreetingPage.svelte';
	import PhoneNumberPage from 'src/pages/PhoneNumberPage.svelte';
	import { onMount } from 'svelte';
	import * as animateScroll from 'svelte-scrollto';

	export let data;

	let y = 0;

	function scrollTo(elementId) {
		animateScroll.scrollTo({
			container: '.main',
			duration: 1000,
			element: '#' + elementId
		});
	}

	const buttonClasses =
		'mt-24 my-btn focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-2xl px-5 py-2.5 mr-2 mb-2';

	let clickedListenButton = false;
	let shouldShowPreviewPage = false;
	let shouldShowPresavedSection = false;
	let targetSectionId = '';
	let sections: Partial<GenericPage> = [];

	onMount(async () => {
		sections = await getSectionData();
		gsap.from('.background-image-container', { opacity: 0, delay: 8, duration: 2 });
		targetSectionId = window.location.hash.replace('#', '');

		// isPlaying.subscribe((isPlaying) => {
		// 	if (isPlaying) {
		// 		console.log('IS PLAYING');
		// 		setTimeout(() => {
		// 			smoothScroll.scrollTo(0, window.innerHeight * 1.4, 800);
		// 		}, 700);
		// 	}
		// });
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

	function handleListenBtnClicked() {
		clickedListenButton = true;
	}

	$: if (targetSectionId) {
		if (targetSectionId === 'presave-success') {
			shouldShowPresavedSection = true;
		}
		// setTimeout(() => scrollTo('loading'), 300);
	}

	$: if (targetSectionId && sections) {
		setTimeout(() => scrollTo(targetSectionId), 1000);
	}
</script>

<!-- <div class="absolute" style="top: 0; left: 0; width: 30px; height: {y}px; background: red" /> -->
<div class="absolute opacity-30">
	<Snowflakes />
</div>
<div class="scrollbar main" style="height: 100vh; padding-top: 60px;">
	<Section color={'#111111'}>
		<div class="background-image-container">
			<!-- <img src="/images/1moore_profile_pic.png" class="profile-pic" alt="1Moore Profile Pic" /> -->
		</div>
		<GreetingPage on:listenBtnClicked={handleListenBtnClicked} />
	</Section>
	{#if shouldShowPresavedSection}
		<Section color={'#1DB954'}>
			<GenericPage
				id="presave-success"
				title="Presaved!"
				description="Thank you so much for being interested in my sound. I hope you like this one."
				buttonText="Check out the rest of my site"
				buttonFn={() => {
					scrollTo('top');
					shouldShowPresavedSection = false;
				}}
			/>
		</Section>
	{/if}
	<Section color={'#111111'}>
		<GenericPage id={'my-music'} title="My music at a glance." description="" hasButton={false}>
			<iframe
				title="1Moore Spotify Playlist"
				style="border-radius:12px"
				src="https://open.spotify.com/embed/playlist/62YiKnNiMccoOJRvLMsdgE?utm_source=generator&theme=0"
				width="80%"
				height="58%"
				frameBorder="0"
				allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
				loading="lazy"
			/>
			<div class="animate-bounce mt-4">There's still more below; keep scrolling!</div>
		</GenericPage>
	</Section>
	{#if !sections.length}
		<Section color={'#222222'}>
			<GenericPage
				id={'loading'}
				title="Loading..."
				description="The rest of the site is loading now. Please give it a sec."
				hasButton={false}
			/>
		</Section>
	{/if}
	{#if sections.length}
		<Section color={sections[0].color}>
			<GenericPage
				id={sections[0].id}
				title={sections[0].title}
				description={sections[0].description}
				buttonText={sections[0].buttonText}
				buttonUrl={sections[0].buttonUrl}
				datePosted={sections[0].datePosted}
				buttonCaption={sections[0].buttonCaption}
			/>
		</Section>
		<Section color={'#1DB954'}>
			<GenericPage
				id="spotify"
				title="Check out my Spotify."
				description="I think you'll find something for your next winter playlist."
				buttonText="Go to Artist Page"
				buttonUrl="https://open.spotify.com/artist/19LpFPTPsckDnlqFK2UPWw"
			/>
		</Section>
		<Section color={'#f1c40f'}>
			<PhoneNumberPage id="phone-number" />
		</Section>
		<Section color={'#5B23E1'}>
			<GenericPage
				id="audius"
				title="Hit up my Audius for it all."
				description="All my remixes, bootlegs and tracks I can't legally upload to Spotify live here."
				buttonText="Visit my Audius"
				buttonUrl="https://audius.co/moore"
			/>
		</Section>
		<Section color={'#F26F23'}>
			<GenericPage
				title="I also have a SoundCloud."
				description="Though I don't know for how long honestly since my remixes keep getting taken down."
				buttonText="Visit my SoundCloud"
				buttonUrl="https://soundcloud.com/1mooretrack"
			/>
		</Section>

		<Section color={'#F56040'}>
			<GenericPage
				title="I post on IG often!"
				description="Most active here! I upload works in progress, behind the scenes on my music, and
						 generally just mess around. Please say hi!"
				buttonText="Visit my Instagram"
				buttonUrl="https://instagram.com/1mooretrack"
			/>
		</Section>
		{#each sections.slice(1) as section}
			<Section color={section.color}>
				<GenericPage
					id={section.id}
					title={section.title}
					description={section.description}
					buttonText={section.buttonText}
					buttonUrl={section.buttonUrl}
					datePosted={section.datePosted}
					buttonCaption={section.buttonCaption}
				/>
			</Section>
		{/each}
		<Section color={'#ffffff'}>
			<GenericPage
				id="end"
				title="That's all the links I got for now!"
				description="Thanks for taking a look at who I am and what I do."
				buttonText="Scroll back to top"
				buttonFn={() => scrollTo('top')}
			/>
		</Section>
	{/if}
</div>

<style>
	.background-image {
		opacity: 0;
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
