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
			children: [
				{
					id: 1,
					type: 'Kompetenzbereich',
					title: 'Kompetenzbereiche des Faches',
					notation: 4,
					description:
						'Die mathematische Allgemeinbildung zielt auf die Fähigkeit der Lernenden, mathematisches Wissen funktional und flexibel einzusetzen Wissen allein ist keine Kompetenz. Die Lernenden erwerben allgemeine mathematische Kompetenzen, indem sie sich mit Problemstellungen auseinandersetzen, deren Lösung mathematische Strukturen erfordert.',
					children: [
						{
							id: 2,
							type: 'Kompetenzbereich',
							title: 'Darstellen',
							description:
								'Die Mathematik bietet verschiedene, sich gegenseitig ergänzende Darstellungsformen, wie Symbol, Tabelle, Graph und Wort, um Objekte und Situationen zu beschreiben. Die Lernenden unterscheiden und interpretieren Darstellungen, wählen Darstellungsformen aus und wenden sie an. Sie erkennen Beziehungen zwischen Darstellungsformen und wechseln bei Bedarf zwischen ihnen.'
						}
					]
				},
				{
					id: 3
				}
			]
		}
	]
});

export const lehrplanfragmente = derived(db, ($db) =>
	$db.nodes.filter((n) => n.type === 'Lehrplanfragment')
);
export const kompetenzbereiche = derived(db, ($db) =>
	$db.nodes.filter((n) => n.type === 'Kompetenzbereich')
);

export function addFragment(type, parent) {
	db.update((d) => {
		const fragment = {
			id: shortUUID(),
			type,
			parent, // lehrplanfragment
			children: [] // list of ids. in combination with parent id i will know where to place the element
      // at the same time i can get all related items for the fragment
      // idea is that a certain element will be defined one time and used multiple times later
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
