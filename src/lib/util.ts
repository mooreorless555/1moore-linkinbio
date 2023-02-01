import axios from 'axios';
import gsap from 'gsap';
import isDarkColor from 'is-dark-color';
import * as animateScroll from 'svelte-scrollto';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

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
		changeCssVariable('--main-invert', '1');
		// changeCssVariable('--main-fill', '#ffffff');
	} else {
		changeCssVariable('--main-text-color', '0, 0, 0');
		changeCssVariable('--main-invert', '0');
		// changeCssVariable('--main-fill', '#000000');
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

export async function getSectionData() {
	const res = await axios.get('https://clever-grammar-359102.uc.r.appspot.com//data');
	return res.data;
}

export async function addPhoneNumber(formattedNumber: string) {
	const res = await axios.get(
		'https://clever-grammar-359102.uc.r.appspot.com//add-number/' + formattedNumber
	);
	return res.data;
}

export function isValidNumber(phoneNumber) {
	try {
		return isValidPhoneNumber(phoneNumber, 'US');
	} catch (e) {
		return false;
	}
}

export function formatPhoneNumber(phoneNumber) {
	// const phoneUtil = GoogleLibPhoneNumber.PhoneNumberUtil.getInstance();
	// const PNF = GoogleLibPhoneNumber.PhoneNumberFormat;
	return parsePhoneNumber(phoneNumber, 'US').getURI().replace('tel:', '');
}

export function scrollTo(elementId) {
	animateScroll.scrollTo({
		container: '.main',
		duration: 2000,
		element: '#' + elementId
	});
}
