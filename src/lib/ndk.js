import NDK, { NDKEvent, NDKNip07Signer } from '@nostr-dev-kit/ndk';
import { db, getChildren } from '$lib/db';
import { get } from 'svelte/store';

const nip07signer = new NDKNip07Signer();
export const ndk = new NDK({
	explicitRelayUrls: ['ws://localhost:10547']
});

ndk.connect();

// TODO call this first and then update db
export function publishCurriculum(id) {
	const children = getChildren(id, get(db).nodes).map((e) => e.id);
	children.push(id);
	const nodes = get(db).nodes.filter((e) => children.includes(e.id));
	const event = new NDKEvent(ndk);
	event.kind = 30166;
	event.content = 'ein lehrplanfragment';
	event.tags = [['d', id.toString()], ...nodes.map((n) => ['fr', JSON.stringify(n)])];
	if (!ndk.signer) {
		ndk.signer = nip07signer;
	}
	event.publish();
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
