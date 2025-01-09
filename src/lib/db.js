import { writable, derived } from 'svelte/store';
import { shortUUID } from '$lib/utils.js';

export const db = writable({
	selectedState: null,
	nodes: [],
	curricula: [
		{
			id: 1234,
			title: 'Bildungsstandards und Inhaltsfelder',
			classLevel: 8,
			schoolSubject: 'Mathematik',
			schoolType: 'Realschule',
		}
	]
});

export const lehrplanfragmente = derived(db, ($db) =>
	$db.nodes.filter((n) => n.type === 'Lehrplanfragment')
);
export const kompetenzbereiche = derived(db, ($db) =>
	$db.nodes.filter((n) => n.type === 'Kompetenzbereich')
);

export const buildNodeTree = (rootId) => {
	return derived(db, ($db) => {
		const tree = new Map();
		let root;

		$db.nodes.forEach((item) => {
			if (!tree.has(item.id)) {
				tree.set(item.id, { ...item, children: [] });
			}

			let node = tree.get(item.id);

			if (node.id === rootId) {
				root = node;
			}

			if (item.parent !== null) {
				if (!tree.has(item.parent)) {
					tree.set(item.parent, {...item, children: [] });
				}
				tree.get(item.parent).children.push(item);
			}
		});
    return root
	});
};

export function addFragment(type, parent) {
	db.update((d) => {
		const fragment = {
			id: shortUUID(),
			type,
			parent
		};
		const nodes = [...d.nodes, fragment];
		return { ...d, nodes };
	});
}

export function updateNode(id, field, val) {
	db.update((d) => {
		const nodes = d.nodes;
		// Find the index of the node with the given id
		const index = d.nodes.findIndex((node) => node.id === id);

		if (index !== -1) {
			nodes[index] = { ...nodes[index], [field]: val };
		} else {
			console.warn(`Node with id ${id} not found.`);
		}

		return { ...d, nodes }; // Return updated array (optional)
	});
}

export function addCurriculum(c) {
  db.update(d => {
    const curriculum = {
      id: shortUUID(),
      ...c
    }
    const curricula = [...d.curricula, curriculum]
    return {...d, curricula}
  })
}
export function changeSelectedState(val) {
		db.update((d) => ({ ...d, selectedState: val }));
	}

