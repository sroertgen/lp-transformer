<script>
	import { config } from '$lib/config';
	import { db, lehrplanfragmente } from '$lib/db';
	import { shortUUID } from '$lib/utils';
	import Lehrplanfragment from '$lib/components/Lehrplanfragment.svelte';
	import Plus from '$lib/components/icons/Plus.svelte';
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

	function changeSelectedState(val) {
		db.update((d) => ({ ...d, selectedState: val }));
	}

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

	<!-- TODO write selection to db -->
	<!-- TODO show possible building blocks after selection -->

	{#if $db.selectedState}
		<h1>{$db.selectedState}</h1>
	{/if}

	<select
		onchange={(e) => changeSelectedState(e.target.value)}
		class="select select-bordered w-full max-w-xs"
	>
		<option disabled selected>Bitte Bundesland auswählen</option>

		{#each Object.keys(config) as state}
			<option>{state}</option>
		{/each}
	</select>

	{#if $lehrplanfragmente.length > 0}
		<div class="w-1/2">
			{#each $lehrplanfragmente as node}
				<Lehrplanfragment fragmentId={node.id} />
			{/each}
		</div>
	{/if}

	<button onclick={addLehrplanfragment} class="btn btn-circle">
		<Plus />
	</button>
</div>
