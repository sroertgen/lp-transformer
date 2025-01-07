<script>
	import Plus from '$lib/components/icons/Plus.svelte';

	import { db, addFragment, updateNode } from '$lib/db';
	import config from '$lib/config';
</script>


<details class="dropdown">
	<summary class="btn m-1"> <Plus /> </summary>
	<ul class="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow">
		{#each Object.keys(config[$db.selectedState]) as bereich}
			<!-- maybe use @const here to make a map of bereiche and their nodes  -->
			<!-- to build the menu -->
			<li>
				<a onclick={() => addFragment(bereich, fragmentId)}>{bereich}</a>
			</li>
		{/each}
		<!-- <li><a>Item 1</a></li> -->
		<!-- <li> -->
		<!-- 	<details open> -->
		<!-- 		<summary>Parent</summary> -->
		<!-- 		<ul> -->
		<!-- 			<li><a>Submenu 1</a></li> -->
		<!-- 			<li><a>Submenu 2</a></li> -->
		<!-- 			<li> -->
		<!-- 				<details open> -->
		<!-- 					<summary>Parent</summary> -->
		<!-- 					<ul> -->
		<!-- 						<li><a>Submenu 1</a></li> -->
		<!-- 						<li><a>Submenu 2</a></li> -->
		<!-- 					</ul> -->
		<!-- 				</details> -->
		<!-- 			</li> -->
		<!-- 		</ul> -->
		<!-- 	</details> -->
		<!-- </li> -->
		<!-- <li><a>Item 3</a></li> -->
	</ul>
</details>
