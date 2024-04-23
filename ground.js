import { getProperty, incProperty, setProperty } from "./updateProperty.js"

const SPEED = 0.05
const	groundElem = document.querySelectorAll("[data-ground]")


export function setGround() {
	setProperty(groundElem[0], "--left", 0);
	setProperty(groundElem[1], "--left", 300);
}

export function updateGround(delta, speedScale) {
	groundElem.forEach(ground => {
		// move ground to the left (-1) by delta * SPEED * speedScale
		incProperty(ground, "--left", delta * SPEED * speedScale * -1)

		// this condition checks if the ground has moved off of
		// the right side of the screen (<= - 300)
		if (getProperty(ground, "--left") <= -300) {
			incProperty(ground, "--left", 600)
		}
	})
}