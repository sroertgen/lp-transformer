<script>
	import { db, updateNode } from '$lib/db';
	import AddLink from '$lib/components/AddLink.svelte';
	import AddFragment from '$lib/components/AddFragment.svelte';
	import Save from './icons/Save.svelte';
	import InputText from '$lib/components/InputText.svelte';

	export let fragmentId;
	let selectedBereich;
	let edit = false;

	$: console.log('fragmentId', fragmentId);
</script>

<div class="border-1 m-1 flex min-h-64 w-1/2 flex-col gap-2 rounded border border-solid p-2">
	<InputText
		nodeId={fragmentId}
		property="title"
		placeholder="Bitte Titel des Fragments/Bereichs einfügen"
	/>
	{#each $db.nodes.filter((n) => n.parent === fragmentId) as node}
		{@const children = $db.nodes.filter((n) => n.parent === node.id)}
		<div class="flex flex-row justify-between gap-2">
			<div class="flex w-full flex-col gap-2">
				<p class="mb-2 text-lg">{node.type}</p>
				<InputText nodeId={node.id} property="title" placeholder="Bitte Titel einfügen" />
				<InputText
					nodeId={node.id}
					property="description"
					textarea={true}
					placeholder="Bitte Beschreibung einfügen"
				/>
			</div>
			<AddLink />
		</div>

		<AddFragment title="Unterbereich hinzufügen" fragmentId={node.id} />

		{#if children.length}
			{#each children as child}
				<svelte:self fragmentId={child.id} />
			{/each}
		{/if}

		<div class="divider"></div>
	{/each}

	<AddFragment title="Bereich hinzufügen" {fragmentId} />
</div>
