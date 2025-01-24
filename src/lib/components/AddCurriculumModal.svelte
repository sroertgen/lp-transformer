<script>
	import { config } from '$lib/config';
	import { db, addCurriculum, changeSelectedState } from '$lib/db.js';
	export let modalId = 'modal';
	let dialogRef;

	let curriculum = {
		type: 'curriculum'
	};

	export function open(curriculumId = null) {
		if (curriculumId !== null) curriculum = $db.curricula.find((c) => c.id === curriculumId);
		if (dialogRef) {
			dialogRef.showModal();
		}
	}

	export function close() {
		if (dialogRef) {
			dialogRef.close();
		}
	}
</script>

<dialog bind:this={dialogRef} class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold">Lehrplan hinzufügen</h3>
		<!-- <p class="py-4">Press ESC key or click the button below to close</p> -->
		<label class="input input-bordered flex items-center gap-2">
			Titel
			<input
				bind:value={curriculum.title}
				type="text"
				class="grow"
				placeholder="Titel des Curriculums"
			/>
		</label>
		<select
			onchange={(e) => changeSelectedState(e.target.value)}
			bind:value={curriculum.state}
			class="select select-bordered w-full max-w-xs"
		>
			<option disabled selected>Bitte Bundesland auswählen</option>

			{#each Object.keys(config) as state}
				<option>{state}</option>
			{/each}
		</select>

		<div class="modal-action">
			<form method="dialog">
				<button onclick={() => addCurriculum(curriculum)} class="btn">Lehrplan anlegen</button>
				<button class="btn">Close</button>
			</form>
		</div>
	</div>
</dialog>
