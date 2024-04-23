import { setGround, updateGround } from "./ground.js";
import { setTrex, setTrexLose, updateTrex, trexRect} from "./trex.js"
import { setCactus, updateCactus, cactusRect} from "./cactus.js"

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_INC = 0.00001

const worldElem = document.querySelector('[data-world]')
const scoreElem = document.querySelector('[data-score]')
const startElem = document.querySelector('[data-start-screen]')

scalePixel()
window.addEventListener("resize", scalePixel) // everytime our window gets resized, call scalePixel
document.addEventListener("keydown", handleStart, { once: true})

setGround()

let last
let speedScale
let score
function update(time) {
	if (last == null) {
		last = time
		window.requestAnimationFrame(update)
		return
	}
	const delta = time - last

	updateGround(delta, speedScale)
	updateTrex(delta, speedScale)
	updateCactus(delta, speedScale)
	updateSpeed(delta)
	updateScore(delta)
	if (isLose()) return (handleLose())

	last = time
	window.requestAnimationFrame(update)
}

function updateSpeed(delta) {
	speedScale += delta * SPEED_INC
}

function updateScore(delta) {
	score += delta * 0.01
	scoreElem.textContent = Math.floor(score)
}

// call update function only when we change content on the screen
// we want to call this function inside update to create a loop of
// screen updates
function handleStart() {
	last = null
	speedScale = 1
	score = 0;
	setGround()
	setTrex()
	setCactus()
	startElem.classList.add("hide")
	window.requestAnimationFrame(update)
}

// scale the world based on screen size
function scalePixel() {
	let worldToPixel
	if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT)
	{
		worldToPixel = window.innerWidth / WORLD_WIDTH
	} else {
		worldToPixel = window.innerHeight / WORLD_HEIGHT
	}

	worldElem.style.width = `${WORLD_WIDTH * worldToPixel}px`
	worldElem.style.height = `${WORLD_HEIGHT * worldToPixel}px`
}

function isLose() {
	const dinoRect = trexRect()
	return cactusRect().some(rect => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2) {
	return (
		rect1.left < rect2.right && 
		rect1.top < rect2.bottom && 
		rect1.right > rect2.left &&
		rect1.bottom > rect2.top
	)
}

function handleLose() {
	setTrexLose()
	setTimeout(() => {
		document.addEventListener("keydown", handleStart, { once: true })
		startElem.classList.remove("hide")
	}, 100)
}