import NDK, { NDKEvent, NDKNip07Signer } from '@nostr-dev-kit/ndk';
import { db, getChildren } from '$lib/db';
import { shortUUID } from '$lib/utils.js';
import { get } from 'svelte/store';

const nip07signer = new NDKNip07Signer();
export const ndk = new NDK({
	explicitRelayUrls: ['ws://localhost:10547']
});

ndk.connect();

export async function publishCurriculum(curriculum) {
	if (!ndk.signer) {
		ndk.signer = nip07signer;
	}
	const event = new NDKEvent(ndk);
	event.kind = 30166;
	event.content = 'ein lehrplanfragment';

	if (curriculum.id) {
		const children = getChildren(curriculum.id, get(db).nodes).map((e) => e.id);
		children.push(curriculum.id);
		const nodes = get(db).nodes.filter((e) => children.includes(e.id));
		event.tags = [['d', curriculum.id.toString()], ...nodes.map((n) => ['fr', JSON.stringify(n)])];

		await event.publish();
	} else {
		curriculum.id = shortUUID();
		event.tags = [
			['d', curriculum.id.toString()],
			['fr', JSON.stringify(curriculum)]
		];
		await event.publish(); // publish to get the event id

		curriculum.eventId = event.id;
		db.update((d) => {
			const nodes = [...d.nodes, curriculum];
			return { ...d, nodes };
		});
	}
}

function mergeArraysById(array1, array2) {
	const map = new Map();
	array1.forEach((item) => map.set(item.id, item));
	array2.forEach((item) => map.set(item.id, item));
	return Array.from(map.values());
}

export async function getPublishedCurricula() {
	const sub = ndk.subscribe({ kinds: [30166] });
	sub.on('event', async (event) => {
		const nodes = await event.tags
			.filter((t) => t[0] === 'fr')
			.map((n) => ({
				eventId: event.id,
				...JSON.parse(n[1])
			}));
		db.update((db) => {
			const merged = mergeArraysById(nodes, db.nodes);
			return { ...db, nodes: merged };
		});
	});
}

export async function fetchPublishedCurricula() {
	const events = await ndk.fetchEvents({ kinds: [30166] });
	const nodes = Array.from(events)
		.map((e) =>
			e.tags
				.filter((t) => t[0] === 'fr')
				.map((n) => ({
					eventId: e.id,
					...JSON.parse(n[1])
				}))
		)
		.flat();
	db.update((db) => {
		return { ...db, nodes };
	});
}

// FIXME maybe i should take care
export async function deleteCurriculum(eventId) {
	if (!ndk.signer) {
		ndk.signer = nip07signer;
	}

	const event = new NDKEvent(ndk);
	event.kind = 5;
	event.tags = [['e', eventId]];
	await event.publish();
	await fetchPublishedCurricula();
}
