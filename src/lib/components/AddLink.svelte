<script>
	import Link from '$lib/components/icons/Link.svelte';

	import { db, selectedState, updateNode, toggleNodeLink } from '$lib/db';
	import { config } from '$lib/config';

	export let fragmentId;

	const additionalLinks = {
		Jahrgangsstufen: config['Jahrgangsstufen'],
		Abschlüsse: config['Abschlüsse']
	};

	$: fragmentNode = $db.nodes.find((n) => n.id === fragmentId);
</script>

<details class="dropdown">
	<summary class="btn btn-ghost m-1">
		<div class="flex flex-row items-center">
			<Link />
			<span>Link einfügen</span>
		</div>
	</summary>
	<ul class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
		{#each Object.keys(config[$selectedState]) as bereich}
			{@const bereichNodes = $db.nodes.filter((n) => n.type === bereich)}
			{#if bereichNodes.length}
				<li>
					<details>
						<summary>{bereich}</summary>
						<ul>
							{#each bereichNodes as node}
								<li
									class:text-primary-content={fragmentNode?.links?.[bereich]?.includes(node.title)}
									class:bg-primary={fragmentNode?.links?.[bereich]?.includes(node.title)}
								>
									<a onclick={() => toggleNodeLink(fragmentId, bereich, node.title)}>{node.title}</a
									>
								</li>
							{/each}
						</ul>
					</details>
				</li>
			{/if}
		{/each}
		<li>
			{#each Object.entries(additionalLinks) as link}
				<details>
					<summary>{link[0]}</summary>
					<ul>
						{#each link[1] as j}
							<li
								class:text-primary-content={fragmentNode?.links?.[link[0]]?.includes(j)}
								class:bg-primary={fragmentNode?.links?.[link[0]]?.includes(j)}
							>
								<a onclick={() => toggleNodeLink(fragmentId, link[0], j)}>{j}</a>
							</li>
						{/each}
					</ul>
				</details>
			{/each}
		</li>
	</ul>
</details>
