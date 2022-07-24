import gsap from 'gsap';
import isDarkColor from 'is-dark-color';

function isDarkColorWithExceptions(color) {
	const whitelistedColors = ['#F26F23'];
	if (color === '#F26F23') {
		return true;
	}

	return isDarkColor(color);
}

export function getBackgroundColor() {
	return getCssVariable('--main-bg-color-solid') || '#111111';
}

export function changeBackgroundColor(newColor: string) {
	const oldColor = getCssVariable('--main-bg-color-solid');
	const rgbColor = hexToRgb(newColor).join(',');

	changeCssVariable('--main-bg-color', rgbColor);
	changeCssVariable('--main-bg-color-solid', newColor);

	if (isDarkColorWithExceptions(newColor)) {
		changeCssVariable('--main-text-color', '255, 255, 255');
	} else {
		changeCssVariable('--main-text-color', '0, 0, 0');
	}

	gsap.fromTo(
		'nav',
		{
			background: `linear-gradient(to bottom, ${oldColor} 70%, rgba(255, 0, 0, 0) 100%)`
		},
		{
			background: `linear-gradient(to bottom, ${newColor} 70%, rgba(255, 0, 0, 0) 100%)`,
			duration: 0.8
		}
	);
}

function getCssVariable(variableName: string) {
	var r = document.querySelector(':root') as any;
	return r.style.getPropertyValue(variableName);
}

function changeCssVariable(variableName: string, value: string) {
	// Get the root element
	var r = document.querySelector(':root') as any;
	r.style.setProperty(variableName, value);
}

function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (!result) throw new Error('Invalid hex color.');
	return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}
