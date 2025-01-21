import { writable, derived, get } from 'svelte/store';
import { shortUUID } from '$lib/utils.js';

export const db = writable({
	selectedCurriculum: null,
	nodes: [],
	curricula: [
		{
			id: 1234,
			title: 'Bildungsstandards und Inhaltsfelder',
			classLevel: 8,
			schoolSubject: 'Mathematik',
			schoolType: 'Realschule',
			state: 'Hessen'
		}
	]
});

export const selectedState = derived(
	db,
	($db) => $db.curricula.find((c) => c.id === $db.selectedCurriculum).state
);

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
					tree.set(item.parent, { ...item, children: [] });
				}
				tree.get(item.parent).children.push(item);
			}
		});
		return root;
	});
};

export function addFragment(type, parent = null, insertAtIndex = null) {
	db.update((d) => {
		const fragment = {
			id: shortUUID(),
			type,
			parent
		};
		const nodes = [...d.nodes];
		if (insertAtIndex === null) {
			nodes.push(fragment);
		} else {
			nodes.splice(insertAtIndex, 0, fragment);
		}
		return { ...d, nodes };
	});
}

function getChildren(parentId, nodes) {
	let children = nodes.filter((node) => node.parent === parentId);
	return children.concat(children.flatMap((child) => getChildren(child.id, nodes)));
}

export function removeFragment(id) {
	const children = getChildren(id, get(db).nodes).map((e) => e.id);
	children.push(id); // include parent
	db.update((d) => {
		const nodes = d.nodes.filter((n) => !children.includes(n.id));
		return { ...d, nodes };
	});
}

export function updateNode(id, field, val) {
	db.update((d) => {
		const nodes = d.nodes;
		const index = d.nodes.findIndex((node) => node.id === id);

		if (index !== -1) {
			nodes[index] = { ...nodes[index], [field]: val };
			console.log(nodes);
		} else {
			console.warn(`Node with id ${id} not found.`);
		}

		return { ...d, nodes };
	});
}

export function toggleNodeLink(id, field, val) {
	db.update((d) => {
		const nodes = [...d.nodes];
		const nodeIndex = nodes.findIndex((n) => n.id === id);

		if (nodeIndex === -1) return d;

		const node = { ...nodes[nodeIndex] };
		node.links = { ...node.links };

		if (!node.links[field]) {
			node.links[field] = [];
		}

		const indexOfVal = node.links[field].findIndex((v) => v === val);

		if (indexOfVal !== -1) {
			node.links[field] = node.links[field].filter((v) => v !== val);
		} else {
			node.links[field] = [...node.links[field], val];
		}

		nodes[nodeIndex] = node;
		console.log(nodes);
		return { ...d, nodes };
	});
}

export function addCurriculum(c) {
	db.update((d) => {
		const curriculum = {
			id: shortUUID(),
			...c
		};
		const curricula = [...d.curricula, curriculum];
		return { ...d, curricula };
	});
}
export function changeSelectedState(val) {
	db.update((d) => ({ ...d, selectedState: val }));
}

export function setSelectedCurriculum(val) {
	db.update((d) => ({ ...d, selectedCurriculum: val }));
}
