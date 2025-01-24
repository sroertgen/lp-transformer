<script>
	import { config } from '$lib/config';
	import { addFragment, selectedState } from '$lib/db';
	import Plus from '$lib/components/icons/Plus.svelte';

	export let title;
	export let parentId;
	export let curriculum;
</script>

<details
	class="dropdown"
	onclick={(e) => {
		e.currentTarget.removeAttribute('open');
	}}
>
	<summary class="btn m-1">{title} <Plus /></summary>
	<ul class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
		{#each Object.keys(config[$selectedState]) as bereich}
			<li>
				<a
					onclick={(e) => {
						addFragment(bereich, curriculum, parentId);
					}}>{bereich}</a
				>
			</li>
		{/each}
	</ul>
</details>
