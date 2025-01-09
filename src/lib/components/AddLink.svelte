<script>
	import Link from '$lib/components/icons/Link.svelte';

	import { db, addFragment, updateNode } from '$lib/db';
	import { config, bindings } from '$lib/config';
</script>

<details class="dropdown">
	<summary class="btn m-1"> <Link /> </summary>
	<ul class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
		{#each Object.keys(config[$db.selectedState]) as bereich}
			{@const bereichNodes = $db.nodes.filter((n) => n.type === bereich)}
			{#if bereichNodes.length}
				<li>
					<details>
						<summary>{bereich}</summary>
						<ul>
							{#each bereichNodes as node}
								<li><a onclick={addLinkToNode(node.id, bereich)}>{node.title}</a></li>
							{/each}
						</ul>
					</details>
				</li>
			<!-- {:else} -->
			<!-- 	<li> -->
			<!-- 		<a onclick={() => addFragment(bereich, fragmentId)}>{bereich}</a> -->
			<!-- 	</li> -->
			{/if}
		{/each}
		<!-- Jahrgangsstufen -->
		<li>
			<details>
				<summary>Jahrgangsstufen</summary>
				<ul>
					{#each Object.values(config['Jahrgangsstufen']) as j}
						<li><a>{j}</a></li>
					{/each}
				</ul>
			</details>
		</li>
	</ul>
</details>
