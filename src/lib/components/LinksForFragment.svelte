<script>
	import { db, toggleNodeLink } from '$lib/db';
	import AddLink from '$lib/components/AddLink.svelte';
	import Trash from '$lib/components/icons/Trash.svelte';

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
						<div class="group relative flex flex-row items-center gap-2">
							<li>{link}</li>
							<div
								onclick={() => toggleNodeLink(fragmentId, links[0], link)}
								class="btn btn-ghost btn-sm hidden group-hover:flex"
							>
								<Trash />
							</div>
						</div>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>
