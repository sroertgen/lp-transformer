<script>
	import { db, lehrplanfragmente, addFragment, setSelectedCurriculum } from '$lib/db';
	import Fragment from '$lib/components/Fragment.svelte';
	import Plus from '$lib/components/icons/Plus.svelte';
	import Glasses from '$lib/components/icons/Glasses.svelte';
	import Pencil from '$lib/components/icons/Pencil.svelte';
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props(); //the curriculum

	// if we visit directly curriculum might not be set
	if (!db.selectedCurriculum) {
		setSelectedCurriculum(data.id);
	}
</script>

<div class="flex flex-col items-center">
	<div class="relative flex-row w-full">
		<h1 class="text-lg absolute left-1/2 transform -translate-x-1/2">{data.title} ({data.state})</h1>
		<div class="m-1 flex flex-row items-center gap-2 ml-auto">
			<Glasses />
			<input type="checkbox" class="toggle" checked="checked" />
			<Pencil />
		</div>
	</div>

	{#if $lehrplanfragmente.length > 0}
			{#each $lehrplanfragmente as node}
				<Fragment fragmentId={node.id} />
			{/each}
	{/if}

	<button onclick={() => addFragment('Lehrplanfragment')} class="btn btn-circle">
		<Plus />
	</button>
</div>
