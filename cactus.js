import { setProperty, getProperty, incProperty } from "./updateProperty.js"

const SPEED = 0.05
const CACTUS_MIN = 500
const CACTUS_MAX = 2000
const worldElem = document.querySelector("[data-world]")

let nextCactus
export function setCactus() {
	nextCactus = CACTUS_MIN
	document.querySelectorAll("[data-cactus]").forEach(cactus => {
		cactus.remove()
	})
}

export function updateCactus(delta, speedScale) {
	document.querySelectorAll("[data-cactus]").forEach(cactus => {
		incProperty(cactus, "--left", delta * speedScale * SPEED * -1)
		if (getProperty(cactus, "--left") <= -100) {
			cactus.remove()
		}
	})

	if (nextCactus <= 0) {
		createCactus()
		nextCactus = randomNumber(CACTUS_MIN, CACTUS_MAX) / speedScale
	}
	nextCactus -= delta
}

export function cactusRect() {
	return [...document.querySelectorAll("[data-cactus]")].map(cactus => {
		return (cactus.getBoundingClientRect())
	})
}

function createCactus() {
	const cactus = document.createElement("img")
	cactus.dataset.cactus = true
	cactus.src = "img/cactus.png"
	cactus.classList.add("cactus")
	setProperty(cactus, "--left", 100)
	worldElem.append(cactus)
}

function randomNumber(min, max) {
	return (Math.floor(Math.random() * (max - min + 1) + min))
}