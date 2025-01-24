import { error } from '@sveltejs/kit';
import { db } from '$lib/db.js';
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	const curriculum = get(db).nodes.find((c) => c.id == params.id);
	if (curriculum) {
		return curriculum;
	}

	error(404, 'Not found');
}
