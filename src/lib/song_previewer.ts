import { play, stopAll } from 'src/components/AudioPlayer.svelte';
import { currentSongPreview, currentSongPreviewCaption } from './stores';

export class SongPreviewer {
	currentSongIndex: number = 0;
	currentSong?: SongPreview;
	currentCaption: string = 'Hello!';

	play(songName: string) {
		play(songName);
		console.log('Playing...');
	}

	async playFromBeginning() {
		this.playSong(SONGS[0]);
	}

	async playSong(song: SongPreview) {
		this.currentSong = song;
		currentSongPreview.set(this.currentSong);
		this.play(SONGS[0].name);
		for (const caption of this.currentSong.captions) {
			currentSongPreviewCaption.set(caption.text);
			await delay(caption.duration || caption.text.length * 70 + 1000);
		}
	}

	stop() {
		stopAll();
		this.currentSong = undefined;
	}
}

async function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

enum StreamDestination {
	ALL,
	INSTAGRAM,
	SOUNDCLOUD
}

interface Caption {
	text: string;
	duration?: number;
}

export interface SongPreview {
	name: string;
	audioFileUrl: string;
	whereToStream: StreamDestination;
	captions: Caption[];
}

export const SONGS: SongPreview[] = [
	{
		name: 'Illusion',
		audioFileUrl: 'https://sveltejs.github.io/assets/music/strauss.mp3',
		whereToStream: StreamDestination.SOUNDCLOUD,
		captions: [
			{ text: 'This is a summer house track I made in 2020 🌴.' },
			{
				text: "Y'all remember 2020, right? Of course you do. We were all holed up in quarantine..."
			},
			{
				text: '...I just wanted to imagine myself on the beach with friends, dancing like we used to.'
			}
		]
	}
];
