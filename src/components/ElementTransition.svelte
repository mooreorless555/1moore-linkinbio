<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
</script>

<div transition:slide={{ duration: 1000 }}>
	<slot />
</div>
