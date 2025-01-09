<script>
	import { db, lehrplanfragmente, addFragment,setSelectedCurriculum } from '$lib/db';
	import Fragment from '$lib/components/Fragment.svelte';
	import Plus from '$lib/components/icons/Plus.svelte';
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props(); //the curriculum
  
  // if we visit directly curriculum might not be set
  if (!db.selectedCurriculum) {
    setSelectedCurriculum(data.id)
  }
</script>

<div class="flex flex-col items-center">
	<h1 class="text-lg">{data.title} ({data.state})</h1>

	{#if $lehrplanfragmente.length > 0}
		<div class="w-1/2">
			{#each $lehrplanfragmente as node}
				<Fragment fragmentId={node.id} />
			{/each}
		</div>
	{/if}

	<button onclick={() => addFragment("Lehrplanfragment")} class="btn btn-circle">
		<Plus />
	</button>
</div>
