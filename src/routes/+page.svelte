<script>
	import { db, setSelectedCurriculum } from '$lib/db.js';
	import Plus from '$lib/components/icons/Plus.svelte';
	import AddCurriculumModal from '$lib/components/AddCurriculumModal.svelte';

	let addCurriculumModalRef;

	function openModal(curriculumId = null) {
		if (addCurriculumModalRef) {
			addCurriculumModalRef.open(curriculumId);
		}
	}
</script>

<div class="flex flex-wrap justify-start gap-2 w-full">
	{#each $db.curricula as curriculum}
		<div class="card w-96 bg-base-100 shadow-xl">
			<div class="card-body">
				<h2 class="card-title">{curriculum.title}</h2>
				<div class="card-actions justify-end">
					<a
						onclick={() => setSelectedCurriculum(curriculum.id)}
						href="/curriculum/{curriculum.id}"
						class="btn btn-primary">Öffnen</a
					>
				</div>
			</div>
		</div>
	{/each}
</div>

<AddCurriculumModal bind:this={addCurriculumModalRef} />
<button onclick={() => openModal()} class="btn m-1 w-full"> <Plus /> </button>
