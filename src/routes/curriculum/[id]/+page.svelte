<script>
	import { db, lehrplanfragmente, addFragment, setSelectedCurriculum } from '$lib/db';
	import Fragment from '$lib/components/Fragment.svelte';
	import Plus from '$lib/components/icons/Plus.svelte';
	import Glasses from '$lib/components/icons/Glasses.svelte';
	import Pencil from '$lib/components/icons/Pencil.svelte';
	import Save from '$lib/components/icons/Save.svelte';
	import { publishCurriculum } from '$lib/ndk';
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props(); //the curriculum

	// if we visit directly curriculum might not be set
	if (!db.selectedCurriculum) {
		setSelectedCurriculum(data.id);
	}
	const curriculum = data.id;
	const lpf = lehrplanfragmente(data.id);
</script>

<div class="flex flex-col items-center">
	<div class="flex w-full flex-row items-center justify-between">
		<div class="flex flex-row items-center gap-2">
			<Glasses />
			<input type="checkbox" class="toggle" checked="checked" />
			<Pencil />
		</div>
		<h1 class=" text-lg">
			{data.title} ({data.state})
		</h1>
		<button onclick={() => publishCurriculum(curriculum)} class="btn btn-ghost"><Save /></button>
	</div>

	{#if $lpf.length > 0}
		<button
			onclick={() => addFragment('Lehrplanfragment', data.id, null, 0)}
			class="btn btn-circle mb-2"
		>
			<Plus />
		</button>
		{#each $lpf as node (node.id)}
			<Fragment fragmentId={node.id} {curriculum} />
		{/each}
	{/if}

	<button onclick={() => addFragment('Lehrplanfragment', data.id)} class="btn btn-circle">
		<Plus />
	</button>
</div>
