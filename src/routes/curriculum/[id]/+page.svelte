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
	<div class="relative w-full flex-row">
		<h1 class="absolute left-1/2 -translate-x-1/2 transform text-lg">
			{data.title} ({data.state})
		</h1>
		<div class="m-1 ml-auto flex flex-row items-center gap-2">
			<Glasses />
			<input type="checkbox" class="toggle" checked="checked" />
			<Pencil />
		</div>
	</div>

	{#if $lehrplanfragmente.length > 0}
		<button onclick={() => addFragment('Lehrplanfragment', null, 0)} class="btn btn-circle">
			<Plus />
		</button>
		{#each $lehrplanfragmente as node (node.id)}
			<Fragment fragmentId={node.id} />
		{/each}
	{/if}

	<button onclick={() => addFragment('Lehrplanfragment')} class="btn btn-circle">
		<Plus />
	</button>
</div>
