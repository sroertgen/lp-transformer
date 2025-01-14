<script>
	import { db } from '$lib/db';
	import AddLink from '$lib/components/AddLink.svelte';

	export let fragmentId;

	$: links = $db.nodes.find((n) => n.id === fragmentId)?.links ?? {};
	$: nodes = $db.nodes;
</script>

<div>
	<div class="flex flex-row items-center">
		<p>Links zu anderen Lehrplanteilen:</p>
		<AddLink {fragmentId} />
	</div>

	<ul class="list-inside list-disc">
		{#each Object.entries(links).filter((e) => e[1].length) as links}
			<li>
				{links[0]}
				<ul class="ml-2 list-inside list-disc">
					{#each links[1] as link}
						<li>{link}</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>
