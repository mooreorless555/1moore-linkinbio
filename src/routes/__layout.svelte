<script>
	import PageTransition from 'src/components/PageTransition.svelte';
	import '../app.css';
</script>

<PageTransition>
	<nav class="nav container p-6 mx-auto lg:flex lg:justify-between lg:items-center">
		<div class="flex items-center justify-between">
			<div>
				<a class="text-2xl font-bold title lg:text-3xl hover:text-gray-70" href="/">1M</a>
			</div>
		</div>
	</nav>
	<div style="padding-top: 60px">
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
