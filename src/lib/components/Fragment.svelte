<script>
	import { db, buildNodeTree } from '$lib/db';
	import AddLink from '$lib/components/AddLink.svelte';
	import AddFragment from '$lib/components/AddFragment.svelte';
	import InputText from '$lib/components/InputText.svelte';

	export let fragmentId;
	export let parentId = null;

	const fragment = $db.nodes.find((f) => f.id === fragmentId);
	const parentIsLehrplanfragment =
		$db.nodes.find((n) => n.id === parentId)?.type === 'Lehrplanfragment';
	const nodeTree = buildNodeTree(fragmentId);
</script>

<div
	class="border-1 flex min-h-64 flex-col gap-2 border-l"
	class:p-2={parentId}
	class:border-l={!parentIsLehrplanfragment && parentId}
	class:border={fragment.type === 'Lehrplanfragment'}
	class:m-1={fragment.type === 'Lehrplanfragment'}
>
	{#if $db.nodes.find((n) => n.type === 'Lehrplanfragment' && n.id === fragmentId)}
		<InputText
			nodeId={fragmentId}
			property="title"
			placeholder="Bitte Titel des Fragments/Bereichs einfügen"
		/>
	{:else}
		<div class="flex flex-row justify-between gap-2">
			<div class="flex w-full flex-col gap-2">
				<p class="mb-2 text-lg">{fragment.type}</p>
				<InputText nodeId={fragmentId} property="title" placeholder="Bitte Titel einfügen" />
				<InputText
					nodeId={fragmentId}
					property="description"
					textarea={true}
					placeholder="Bitte Beschreibung einfügen"
				/>
			</div>
			<AddLink />
		</div>
	{/if}
	{#if $nodeTree.children.length}
		{#each $nodeTree.children as child}
			<svelte:self fragmentId={child.id} parentId={fragmentId} />
		{/each}
	{/if}
	<AddFragment
		title={parentId ? 'Unterbereich hinzufügen' : 'Bereich hinzufügen'}
		parentId={fragmentId}
	/>
	<div class="divider"></div>
</div>
