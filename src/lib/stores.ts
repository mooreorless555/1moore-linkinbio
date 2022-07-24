import { writable } from 'svelte/store';
import type { SongPreview } from './song_previewer';

export const isPlaying = writable(false);

export function toggleIsPlaying() {
	isPlaying.update((isPlaying) => !isPlaying);
}

export const currentSongPreview = writable<SongPreview>();
export const currentSongPreviewCaption = writable('Hello!');
