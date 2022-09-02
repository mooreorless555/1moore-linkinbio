<script lang="ts">
	import moment from 'moment';
	export let title = 'Title';
	export let description = 'Description here.';
	export let buttonText = 'Button text here';
	export let buttonUrl = '';
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

	const buttonClasses =
		'mt-24 my-btn focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-2xl px-5 py-2.5 mr-2 mb-2';

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
</script>

<section {id}>
	<div class="container px-6 py-16 h-screen mx-auto text-start">
		<div class="max-w-lg mx-auto">
			<p class="text-xs decoration-double title uppercase">{displayDate}</p>
			<h1 class="text-6xl font-bold title">{title}</h1>
			<p class="mt-6 text-3xl caption">
				{description}
			</p>
		</div>
		{#if hasButton}
			<button type="button" class={buttonClasses} on:click={handleButtonClick}>{buttonText}</button>
			{#if internalButtonUrl}
				<p style="margin-left: 3%" class="text-xs decoration-double title uppercase">
					Button will bring you to {getDomainNameFromUrl(internalButtonUrl)}
				</p>
			{/if}
		{/if}
	</div>
</section>
