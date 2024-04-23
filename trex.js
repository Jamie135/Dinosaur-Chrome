import { incProperty, getProperty, setProperty } from "./updateProperty.js"

const trexElem = document.querySelector("[data-dino]")
const JUMP = 0.45
const GRAVITY = 0.0015
const FRAME_COUNT = 2
const FRAME_TIME = 100

let jumped
let trexFrame
let currentFrame
let veloY
export function setTrex() {
	jumped = false
	trexFrame = 0
	currentFrame = 0
	veloY = 0
	setProperty(trexElem, "--bottom", 0)
	document.removeEventListener("keydown", onJump)
	document.addEventListener("keydown", onJump)
}

export function updateTrex(delta, speedScale) {
	handleRun(delta, speedScale)
	handleJump(delta)
}

export function trexRect() {
	return (trexElem.getBoundingClientRect())
}

export function setTrexLose() {
	trexElem.src = "img/dino-lose.png"
}

function handleRun(delta, speedScale) {
	if (jumped) {
		trexElem.src = `img/dino-stationary.png`
		return
	}
	if (currentFrame >= FRAME_TIME) {
		trexFrame = (trexFrame + 1) % FRAME_COUNT
		trexElem.src = `img/dino-run-${trexFrame}.png`
		currentFrame -= FRAME_TIME
	}
	currentFrame += delta * speedScale
}

function handleJump(delta) {
	if (!jumped)
		return

	incProperty(trexElem, "--bottom", veloY * delta)
	if (getProperty(trexElem, "--bottom") <= 0) {
		setProperty(trexElem, "--bottom", 0)
		jumped = false
	}

	veloY -= GRAVITY * delta
}

function onJump(e) {
	if (e.code !== "Space" || jumped) return

	veloY = JUMP
	jumped = true
}