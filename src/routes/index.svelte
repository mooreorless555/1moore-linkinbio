<script lang="ts">
	import { getSectionData } from '$lib/util';

	import gsap from 'gsap/dist/gsap';
	import Section from 'src/components/Section.svelte';
	import GenericPage from 'src/pages/GenericPage.svelte';
	import GreetingPage from 'src/pages/GreetingPage.svelte';
	import PhoneNumberPage from 'src/pages/PhoneNumberPage.svelte';
	import { onMount } from 'svelte';
	import * as animateScroll from 'svelte-scrollto';

	function scrollTo(elementId) {
		animateScroll.scrollTo({
			container: '.main',
			duration: 3000,
			element: '#' + elementId
		});
	}

	const buttonClasses =
		'mt-24 my-btn focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-2xl px-5 py-2.5 mr-2 mb-2';

	let clickedListenButton = false;
	let shouldShowPreviewPage = false;
	let targetSectionId = '';
	let sections;

	onMount(async () => {
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

	getSectionData().then((sectionsResponse) => {
		sections = sectionsResponse;
	});

	$: if (targetSectionId && sections) {
		setTimeout(() => scrollTo(targetSectionId), 800);
	}
</script>

<div class="scrollbar main" style="height: 100vh;">
	<Section color={'#111111'}>
		<div class="background-image-container">
			<img src="/images/1moore_profile_pic.png" class="profile-pic" alt="1Moore Profile Pic" />
		</div>
		<GreetingPage on:listenBtnClicked={handleListenBtnClicked} />
	</Section>
	{#if !sections}
		<Section color={'#222222'}>
			<GenericPage
				id={'loading'}
				title="Loading..."
				description="The rest of the site is loading now. Please give it a sec."
				hasButton={false}
			/>
		</Section>
	{/if}
	{#if sections}
		<Section color={sections[0].color}>
			<GenericPage
				id={sections[0].id}
				title={sections[0].title}
				description={sections[0].description}
				buttonText={sections[0].buttonText}
				buttonUrl={sections[0].buttonUrl}
				datePosted={sections[0].datePosted}
			/>
		</Section>
		<Section color={'#f1c40f'}>
			<PhoneNumberPage id="phone-number" />
		</Section>
		<Section color={'#1DB954'}>
			<GenericPage
				title="Check out my Spotify."
				description="I think you'll find something for your next summer playlist."
				buttonText="Go to Artist Page"
				buttonUrl="https://open.spotify.com/artist/19LpFPTPsckDnlqFK2UPWw"
			/>
		</Section>
		<Section color={'#F26F23'}>
			<GenericPage
				title="Hit me up on SoundCloud."
				description="I post remixes/bootlegs and other tracks I can't legally upload to Spotify. RIP, lol."
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
