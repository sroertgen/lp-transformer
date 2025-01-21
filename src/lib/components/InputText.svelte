<script>
	import Save from '$lib/components/icons/Save.svelte';
	import { db, updateNode } from '$lib/db';
	import Pencil from './icons/Pencil.svelte';

	export let nodeId;
	export let property;
	export let placeholder;
	export let textarea = false;
	export let headline = false;

	let edit = false;

	function toggleEdit() {
		edit = !edit;
	}

	let value = $db.nodes.find((n) => n.id === nodeId).title;
</script>

{#if edit}
	{#if textarea}
		<div class="flex w-full items-center">
			<button class="btn btn-ghost btn-sm" onclick={toggleEdit}>
				<Save />
			</button>
			<textarea
				onblur={(e) => updateNode(nodeId, property, e.target.value)}
				class="textarea textarea-bordered grow"
				placeholder="Beschreibung"
				bind:value
			></textarea>
		</div>
	{:else}
		<div class="flex items-center gap-2">
			<button class="btn btn-ghost btn-sm" onclick={toggleEdit}>
				<Save />
			</button>
			<label class="input input-bordered mr-2 w-full">
				<input
					onblur={(e) => updateNode(nodeId, property, e.target.value)}
					placeholder={value || placeholder}
					class="w-full grow"
					type="text"
					bind:value
				/>
			</label>
		</div>
	{/if}
{:else}
	<div class="flex items-center gap-2">
		<p class:text-lg={headline} class:ml-2={headline} class:font-bold={headline}>
			{$db.nodes.find((n) => n.id === nodeId)[property] || placeholder}
		</p>
		<button class="btn btn-ghost btn-sm" onclick={toggleEdit}>
			<Pencil />
		</button>
	</div>
{/if}
