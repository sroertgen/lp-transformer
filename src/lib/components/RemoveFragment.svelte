<script>
	import Trash from '$lib/components/icons/Trash.svelte';
	import { removeFragment } from '$lib/db';

	export let fragmentId;
</script>

<button class="btn btn-ghost" onclick={() => removeFragment(fragmentId)}><Trash /></button>
