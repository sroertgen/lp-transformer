<script>
	import { config } from '$lib/config';
	import { db, lehrplanfragmente } from '$lib/db';
	import { shortUUID } from '$lib/utils';
	import Fragment from '$lib/components/Fragment.svelte';
	import Plus from '$lib/components/icons/Plus.svelte';
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

	function addLehrplanfragment() {
		db.update((d) => {
			const fragment = {
				id: shortUUID(),
				type: 'Lehrplanfragment',
			};
			const nodes = [...d.nodes, fragment];
			return { ...d, nodes };
		});
	}
</script>

<div class="flex flex-col items-center">
	<h1>{data.title}</h1>

	{#if $lehrplanfragmente.length > 0}
		<div class="w-1/2">
			{#each $lehrplanfragmente as node}
				<Fragment fragmentId={node.id} />
			{/each}
		</div>
	{/if}

	<button disabled={!$db.selectedState} onclick={addLehrplanfragment} class="btn btn-circle">
		<Plus />
	</button>
</div>
