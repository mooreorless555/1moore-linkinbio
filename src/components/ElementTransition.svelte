<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	    </script>

<div in:fly={{ y: -50, duration: 600, delay: 100, easing: cubicOut }} out:fly={{ y: -50, duration: 250 }}>
	<slot />
</div>
