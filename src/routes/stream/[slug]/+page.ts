export const load = ({ params }) => {
	return {
		slug: params.slug,

		tracks: {
			'late-night': {
				name: '"Late Night"',
				artist: 'A deep house track by 1Moore',
				spotifyUrl: 'http://1mtrck.link/stream-late-night',
				imageUrl: '/images/1moore_late_night.png'
			}
		}
	};
};

export const prerender = false;
