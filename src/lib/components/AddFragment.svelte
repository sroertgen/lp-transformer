<script>
	import config from '$lib/config';
	import { db, addFragment } from '$lib/db';

	export let title;
	export let fragmentId;
</script>

<details
	class="dropdown"
	onclick={(e) => {
		e.currentTarget.removeAttribute('open');
	}}
>
	<summary class="btn m-1">{title}</summary>
	<ul class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
		{#each Object.keys(config[$db.selectedState]) as bereich}
			<li>
				<a
					onclick={(e) => {
						addFragment(bereich, fragmentId);
					}}>{bereich}</a
				>
			</li>
		{/each}
	</ul>
</details>
