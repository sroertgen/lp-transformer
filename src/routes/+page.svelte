<script>
	import { db } from '$lib/db.js';

	$: dbValue = $db; // `$db` gives you the current value
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

{#each dbValue.curricula as curriculum}
	<div class="card w-96 bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title">{curriculum.title}</h2>
			<!-- <p>If a dog chews shoes whose shoes does he choose?</p> -->
			<div class="card-actions justify-end">
				<a href="/curriculum/{curriculum.id}" class="btn btn-primary">Öffnen</a>
			</div>
		</div>
	</div>
	<p></p>
{/each}
