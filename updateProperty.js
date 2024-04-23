// these functions allow us to animated each element of the screen
// by calling them in each update functions

// get css variable elem and its property prop
// then convert it to a number
export function getProperty(elem, prop) {
	return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0
}

// set the value for an element's property
export function setProperty(elem, prop, value) {
	elem.style.setProperty(prop, value)
}

// set the incremented property's value of the element
export function incProperty(elem, prop, inc) {
	setProperty(elem, prop, getProperty(elem, prop) + inc)
}