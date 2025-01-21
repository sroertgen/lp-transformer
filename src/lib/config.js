export const config = {
	Jahrgangsstufen: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
	Abschlüsse: ['Hauptschule', 'Realschule', 'Gymnasium'],
	MEM: {},
	Hessen: {
		Bildungsstandard: {
			definition: ''
		},
		Inhaltsfeld: {},
		Kompetenzbereich: {
			sameAs: ['CE-Kompetenzbereich'],
			fields: [{ name: 'definition', type: 'text' }],
			children: []
		},
		'Lernzeitbezogene Kompetenzerwartung': {}
	}
};

export const bindings = {
	Jahrgangsstufe: 'educationalLevel',
	Bildungsstandard: 'relatesTo'
};
