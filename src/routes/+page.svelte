<script>
	import { db } from '$lib/db.js';
	import Plus from '$lib/components/icons/Plus.svelte';
  import AddCurriculumModal from '$lib/components/AddCurriculumModal.svelte';

	$: dbValue = $db;

  let addCurriculumModalRef;

  function openModal() {
    if (addCurriculumModalRef) {
      addCurriculumModalRef.open();
    }
  }
</script>

<div class="mx-auto w-3/4 max-w-fit">
	<div class="flex flex-wrap gap-2 justify-start">
		{#each dbValue.curricula as curriculum}
			<div class="card w-96 bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="card-title">{curriculum.title}</h2>
					<div class="card-actions justify-end">
						<a href="/curriculum/{curriculum.id}" class="btn btn-primary">Öffnen</a>
					</div>
				</div>
			</div>
		{/each}
	</div>

  <AddCurriculumModal bind:this={addCurriculumModalRef} />
	<button onclick={openModal}  class="btn m-1 w-full"> <Plus /> </button>
</div>
