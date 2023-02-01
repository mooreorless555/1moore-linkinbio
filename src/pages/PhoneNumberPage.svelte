<script lang="ts">
	import { slide } from 'svelte/transition';

	import { addPhoneNumber, formatPhoneNumber, isValidNumber } from '$lib/util';

	export let id = 'section';
	let pageState = 0;

	let canSubmitNumber = false;
	let phoneNumber = '';

	const buttonClasses =
		'mt-24 my-btn focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-2xl px-5 py-2.5 mr-2 mb-2';

	async function handleButtonClick() {
		if (pageState === 1) {
			canSubmitNumber = false;
			addPhoneNumber(formatPhoneNumber(phoneNumber))
				.then(() => {
					// pageState = 4;
					// setTimeout(() => {
					// 	canSubmitNumber = true;
					// 	pageState = 0;
					// }, 5000);
				})
				.catch((e) => {
					pageState = 3;
					setTimeout(() => {
						canSubmitNumber = true;
						pageState = 0;
					}, 5000);
					console.log('Something went wrong.', e);
					return;
				});
			pageState = 2;
			setTimeout(() => {
				pageState = 0;
			}, 5000);
		} else if (pageState === 0) {
			pageState = 1;
		}
	}

	$: if (isValidNumber(phoneNumber)) {
		canSubmitNumber = true;
	} else {
		canSubmitNumber = false;
	}
</script>

<section {id}>
	{#if pageState === 0}
		<div transition:slide class="container px-6 py-16 h-screen mx-auto text-start">
			<div class="max-w-lg mx-auto">
				<h1 class="text-6xl font-bold title">Stay in the loop!</h1>
				<p class="mt-6 text-3xl caption">Let me send you a text when I release a track.</p>
				<p class="mt-6 text-xl caption">You can always, always unsubscribe.</p>
			</div>
			<button type="button" class={buttonClasses} on:click={handleButtonClick}
				>Sure, let's do it 🔥</button
			>
			<!-- <p style="margin-left: 3%" class="text-xs decoration-double title uppercase">
			Button will open a dialog where you can enter your phone number
		</p> -->
		</div>
	{/if}

	{#if pageState === 1}
		<div transition:slide class="container px-6 py-16 h-screen mx-auto text-start">
			<div class="max-w-lg mx-auto">
				<div class="max-w-lg mx-auto">
					<p class="mt-6 text-3xl caption">Ayy! Just enter your # below.</p>
				</div>
				<div>
					<input
						type="tel"
						id="phone-number-input"
						bind:value={phoneNumber}
						class="border-0 border-transparent text-black placeholder-black placeholder:opacity-10 bg-transparent text-6xl rounded-lg border-none focus:border-transparent focus:ring-0 focus:outline-none block w-full p-2.5"
						placeholder="###-###-..."
						required
					/>
				</div>
			</div>
			<button
				type="button"
				class={buttonClasses}
				disabled={!canSubmitNumber}
				on:click={handleButtonClick}>Done!</button
			>
		</div>
	{/if}
	{#if pageState === 2}
		<div transition:slide class="container px-6 py-16 h-screen mx-auto text-start">
			<div class="max-w-lg mx-auto">
				<p class="mt-6 text-3xl caption animate-pulse">
					Sweet! You should get a text from me in a few seconds. Thanks again!
				</p>
			</div>
		</div>
	{/if}
	{#if pageState === 3}
		<div transition:slide class="container px-6 py-16 h-screen mx-auto text-start">
			<div class="max-w-lg mx-auto">
				<p class="mt-6 text-3xl caption">
					Hmm, something went wrong on my end. So sorry about that--- please reach out to me back on
					IG to see if I can address this/manually add you. Thanks!
				</p>
			</div>
		</div>
	{/if}
	<!-- {#if pageState === 4}
		<div transition:slide class="container px-6 py-16 h-screen mx-auto text-start">
			<div class="max-w-lg mx-auto">
				<p class="mt-6 text-3xl caption">
					Just sent! 🎉🎉 Can't wait to keep you in the loop. Thanks again. 🔥
				</p>
			</div>
		</div>
	{/if} -->
</section>
