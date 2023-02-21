<script>
	import PageTransition from 'src/components/PageTransition.svelte';
	import { slide } from 'svelte/transition';
	import '../app.css';

	let showNotice = true;
	setTimeout(() => {
		showNotice = false;
	}, 4000);
</script>

<PageTransition>
	<nav
		transition:slide
		class="nav container p-6 mx-auto lg:flex lg:justify-between lg:items-center"
	>
		<div class="flex items-center justify-between">
			<div>
				<a class="text-2xl font-bold title lg:text-3xl hover:text-gray-70" href="/">1M</a>
			</div>
			<div>
				<a
					class="text-3xl font-bold title lg:text-3xl hover:text-gray-70"
					href="https://open.spotify.com/artist/19LpFPTPsckDnlqFK2UPWw"
					><i class="fa-brands fa-spotify" /></a
				>
			</div>
			<div>
				<a
					class="text-3xl font-bold title lg:text-3xl hover:text-gray-70"
					href="https://soundcloud.com/1mooretrack"><i class="fa-brands fa-soundcloud" /></a
				>
			</div>
			<div style="width: 30%">
				<a
					class="text-md font-bold title-img lg:text-3xl hover:text-gray-70"
					href="https://audius.co/moore"
					><svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 486 122">
						<path
							id="Path 0"
							fill-rule="evenodd"
							class="svg"
							d="m85 4c0.3 0 1 0.4 1.6 0.8 0.7 0.4 15.2 25.1 32.3 54.9 21.3 37.2 30.9 54.8 30.4 55.8-0.5 0.9-1.5 1.8-2.3 2.1-0.8 0.3-21.2 0.1-45.2-0.3-33.5-0.6-43.9-1.1-44.3-2-0.3-0.7 1.8-5.5 4.6-10.5 2.9-5.1 6-10.5 8.9-14.8h15.5c11.4 0 15.6-0.3 16.1-1.2 0.3-0.7-3.2-7.8-7.8-15.8-4.9-8.5-8.9-14.5-9.8-14.5-0.8 0-3.6 3.6-6.2 8-2.6 4.4-6.3 10.6-11.8 19.5l-13.7-0.2c-13.5-0.3-13.8-0.4-14-2.5-0.2-1.3 1.8-6 4.3-10.5 2.6-4.6 12.3-21.6 21.7-37.8 9.3-16.2 17.5-29.8 18.1-30.2 0.6-0.4 1.3-0.8 1.6-0.8zm103.3 46h10.7l4.2 10.3c2.3 5.6 5.9 14.2 8 19.2 2.1 5 3.8 9.3 3.8 9.8 0 0.4-2.5 0.7-5.5 0.7-5.3 0-5.5-0.1-8.5-7h-15l-1.5 3.5c-1.5 3.4-1.7 3.5-7 3.5-3.9 0-5.4-0.4-5.1-1.3 0.2-0.6 3.9-9.6 8.1-20zm3.4 18c-0.9 2.5-1.7 5.1-1.7 5.8 0 0.8 1.4 1.2 3.5 1.2 2.7 0 3.5-0.4 3.5-1.7 0-1-0.8-3.5-1.8-5.8l-1.8-4zm256.3-17.9c2.5 0 6.1 0.4 8 0.9 2 0.5 4.6 1.7 8.1 4.5l-5.1 7.5-4.7-2.1c-3.1-1.4-5.7-1.9-7.5-1.5-1.9 0.4-2.7 1.2-2.5 2.4 0.2 1.2 2.6 2.5 7.9 4.2 4.2 1.4 8.8 3.7 10.2 5 2.2 2.1 2.7 3.4 2.7 7.3-0.1 3.6-0.7 5.5-2.6 7.7-1.4 1.7-4.1 3.5-6.2 4-2.1 0.6-5.3 1-7.3 1.1-1.9 0-5.7-0.7-8.5-1.5-2.7-0.9-6-2.3-9.7-5.1l6.2-7 4.8 2.3c2.6 1.3 5.7 2.3 7 2.3 1.2 0 2.9-0.3 3.7-0.6 0.9-0.2 1.5-1.4 1.5-2.5 0-1.5-1.2-2.3-5.7-3.5-3.2-0.9-7.1-2.1-8.7-2.8-1.6-0.6-3.7-2.3-4.8-3.7-1.1-1.4-1.8-4.1-1.8-6.5 0-2.3 0.8-5.1 1.9-6.8 1.1-1.6 3.5-3.5 5.3-4.2 1.8-0.8 5.4-1.4 7.8-1.4zm-217 0.9h11v13c0 11.7 0.2 13.3 2 15 1.1 1.2 3.4 2 5 2 1.7 0 3.9-0.8 5-2 1.8-1.7 2-3.3 2-28h10.6v15c-0.1 13.6-0.3 15.2-2.2 17.7-1.2 1.6-3.2 3.7-4.5 4.7-1.6 1.2-4.8 2-9.4 2.3-6 0.5-7.6 0.2-11.3-1.8-2.6-1.4-5.2-3.8-6.3-5.9-1.6-2.9-1.9-5.7-1.9-17.7zm57 0h11c7.7 0 12.2 0.5 14.8 1.6 2 0.8 4.8 2.5 6.1 3.7 1.3 1.2 2.9 3.3 3.6 4.7 0.7 1.4 1.5 4.2 1.9 6.2 0.3 2.1 0.1 5.9-0.6 8.5-0.8 3.1-2.4 6-4.7 8.3-2 1.9-5.4 4.1-7.6 4.7-2.2 0.7-8.6 1.3-24.5 1.3zm10.9 19.7c0.1 8 0.4 9.4 1.9 9.7 0.9 0.2 3.5 0 5.7-0.5 2.3-0.4 4.8-1.8 5.8-3.1 1.1-1.4 1.8-3.9 1.8-6.3 0-2.2-0.7-5-1.6-6.3-0.8-1.2-3.2-2.6-5.2-3.2-2.1-0.5-4.5-1-5.4-1-0.8 0-1.9 0.3-2.4 0.7-0.4 0.3-0.7 4.8-0.6 10zm46.1-19.7h11v39h-11zm31.9 0h11.1v12.2c0 10.8 0.2 12.6 2 15 1.5 2 2.9 2.8 5.3 2.8 2 0.1 4-0.7 5.2-2.1 1.8-1.9 2-3.5 2.2-27.9h11.3l-0.2 14.2c-0.3 12.2-0.6 14.8-2.3 17.8-1.2 2.1-3.9 4.5-6.5 5.8-3.8 2-5.5 2.3-11.5 1.8-4.8-0.3-7.8-1.1-9.5-2.4-1.4-1.1-3.4-3.2-4.5-4.6-1.7-2.4-2-4.6-2.3-17.7z"
						/>
					</svg>
				</a>
			</div>
		</div>
		<!-- {#if showNotice}
			<p style="margin-top: 30px; margin-bottom: 30px; color: #f1c40f;" transition:slide>
				Hey! Quick links to my music above ☝️. Scroll down for more detailed content. 🔥
			</p>
		{/if} -->
	</nav>
	<div style="padding-top: 0px; overflow: hidden;">
		<slot />
	</div>
</PageTransition>

<style>
	nav {
		position: absolute;
		background: linear-gradient(
			to bottom,
			rgba(var(--main-bg-color), 1) 70%,
			rgba(255, 0, 0, 0) 100%
		);
		/* background-color: var(--main-bg-color-solid); */
		padding-bottom: 60px;
		z-index: 99;
		transition: all ease 0.8s;
		opacity: 1;
	}
</style>
