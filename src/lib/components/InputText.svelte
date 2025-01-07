<script>
	import Save from '$lib/components/icons/Save.svelte';
	import { db, updateNode } from '$lib/db';
	import Pencil from './icons/Pencil.svelte';

	export let nodeId;
	export let property;
	export let placeholder;
	export let textarea = false;

	let edit = false;

	function toggleEdit() {
		edit = !edit;
	}

	let value = $db.nodes.find((n) => n.id === nodeId).title;
</script>

{#if edit}
	{#if textarea}
		<div class="flex w-full items-center">
			<textarea
				onblur={(e) => updateNode(nodeId, property, e.target.value)}
				class="textarea textarea-bordered grow"
				placeholder="Beschreibung"
				bind:value
			></textarea>
			<button class="btn btn-ghost" onclick={toggleEdit}>
				<Save />
			</button>
		</div>
	{:else}
		<label class="input input-bordered flex items-center gap-2">
			<input
				onblur={(e) => updateNode(nodeId, property, e.target.value)}
				placeholder={value || placeholder}
				class="grow"
				type="text"
				bind:value
			/>
			<button class="btn btn-ghost" onclick={toggleEdit}>
				<Save />
			</button>
		</label>
	{/if}
{:else}
	<div class="flex items-center gap-2">
		<p>{$db.nodes.find((n) => n.id === nodeId)[property] || placeholder}</p>
		<button class="btn btn-ghost" onclick={toggleEdit}>
			<Pencil />
		</button>
	</div>
{/if}
