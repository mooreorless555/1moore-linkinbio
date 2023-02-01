<script lang="ts">
	import moment from 'moment';
	import { inview } from 'svelte-inview';
	import { slide } from 'svelte/transition';
	import anime from 'animejs';
	import { onMount } from 'svelte';

	export let title = 'Title';
	export let description = 'Description here.';
	export let buttonText = 'Button text here';
	export let buttonUrl = '';
	export let buttonCaption = undefined;
	export let datePosted = '';
	export let id = 'section';
	export let hasButton = true;
	export let buttonFn = () => {};

	let internalButtonUrl = '';
	$: internalButtonUrl = buttonUrl ?? '';

	let displayDate = '';
	$: if (datePosted) {
		displayDate = moment(datePosted).format('MMM Do YYYY');
	}

	let buttonTextSize = buttonText.length < 20 ? 'text-2xl' : 'text-xl';

	const buttonClasses = `mt-24 my-btn focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full ${buttonTextSize} px-5 py-2.5 mr-2 mb-2`;

	const options = {
		threshold: 0
	};

	let element;

	let tl;

	function handleButtonClick() {
		if (!buttonUrl) {
			buttonFn();
		} else {
			window.open(buttonUrl, '_blank')?.focus();
		}
	}

	function getDomainNameFromUrl(urlStr: string) {
		const domain = new URL(urlStr).hostname;
		return domain.replace('wwww', '');
	}

	onMount(() => {
		tl = anime.timeline({
			autoplay: false,
			duration: 750
		});

		const descriptionEl = element.querySelector('.anime-description');
		const titleEl = element.querySelector('.anime-title');

		// anime.set(descriptionEl, {
		// 	opacity: 0.01
		// });

		// anime.set(titleEl, {
		// 	translateY: '50%'
		// });

		// // Add children
		// tl.add({
		// 	targets: descriptionEl,
		// 	opacity: 0.01,
		// 	duration: 10
		// })
		// 	.add({
		// 		targets: titleEl,
		// 		translateY: '100%',
		// 		duration: 10
		// 	})
		// 	.add({
		// 		targets: titleEl,
		// 		translateY: 0,
		// 		delay: 1000,
		// 		easing: 'easeOutElastic'
		// 	})
		// 	.add({
		// 		targets: descriptionEl,
		// 		opacity: 1,
		// 		duration: 200
		// 	});
	});

	function animateIn(event: CustomEvent<ObserverEventDetails>) {
		const element = event.detail.node;

		if (!tl) return;

		anime({
			targets: element.querySelectorAll('p,h1,button'),
			translateX: 0,
			opacity: 1,
			duration: 100,
			delay: anime.stagger(100)
		});

		// tl.play();
	}

	function animateOut(event: CustomEvent<ObserverEventDetails>) {
		const element = event.detail.node;

		anime({
			targets: element.querySelectorAll('p,h1,button'),
			opacity: 0.5,
			duration: 100,
			delay: anime.stagger(100)
		});
	}
</script>

<section
	bind:this={element}
	{id}
	transition:slide
	use:inview={options}
	on:enter={animateIn}
	on:leave={animateOut}
>
	<div class="container px-6 py-16 h-screen mx-auto text-start">
		<div class="max-w-lg mx-auto">
			<p class="text-sm decoration-double title uppercase">{displayDate}</p>
			<h1 class="text-6xl font-bold title anime-title">{title}</h1>
			<p class={`mt-6 text-3xl caption anime-description`}>
				{description}
			</p>
		</div>
		<slot />
		{#if hasButton}
			<button type="button" class={buttonClasses} on:click={handleButtonClick}>{buttonText}</button>
			{#if internalButtonUrl && buttonCaption !== 'NONE'}
				{#if !buttonCaption}
					<p style="margin-left: 3%" class="text-xs decoration-double title uppercase">
						Button will bring you to {getDomainNameFromUrl(internalButtonUrl)}
					</p>
				{/if}
				{#if buttonCaption}
					<p style="margin-left: 3%" class="text-xs decoration-double title uppercase">
						{buttonCaption}
					</p>
				{/if}
			{/if}
		{/if}
	</div>
</section>
