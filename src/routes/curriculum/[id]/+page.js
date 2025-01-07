import { error } from '@sveltejs/kit';
import { db } from "$lib/db.js";
import { get } from 'svelte/store';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  //TODO check db for id and return data
  //otherwise not found
	const curriculum = get(db).curricula.find((c) => c.id == params.id)
  if (curriculum) {
		return curriculum
	}

	error(404, 'Not found');
}
