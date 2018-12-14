/*
* bubbles.js
* 
* Adds animated bubbles to the home page. 
* This was adapted from a post on StackOverflow:
* https://codereview.stackexchange.com/questions/141595/show-bubble-animation-on-a-web-page
* It has been heavily customized to fit the Spongebob theme
*/


const minBubbles = 5;
const maxBubbles = minBubbles * 2;
const minSize = 5;
const maxSize = 100;
const minDelay = 2;
const maxDelay = 5;
const minPosition = 0;
const maxPosition = 75;

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var $bubbles = document.querySelector('[class="bubbles"]');
var totalBubbles = getRandomNumber(minBubbles, maxBubbles);


var bubbleElements = Array(totalBubbles).fill(null).map(() => {
  var bubbleSize = getRandomNumber(minSize, maxSize);
  var bubblePosition = getRandomNumber(minPosition, maxPosition);
  var animationDelay = getRandomNumber(minDelay, maxDelay);
  var $container = document.createElement('div');
  $container.className = 'bubble-container';
  $container.style.left = `${bubblePosition}%`;
  $container.style.animationDuration = `${animationDelay}s`;

  var $bubble = document.createElement('div');
  $bubble.className = 'bubble';
  $bubble.style.width = `${bubbleSize}px`;
  $bubble.style.height = `${bubbleSize}px`;
  $container.appendChild($bubble);
  $bubbles.appendChild($container);
  return {
    $container: $container,
    $bubble: $bubble
  };
});

let ready = true;
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', e => {
  mouseX = e.pageX;
  mouseY = e.pageY;
}, false);

function calcDistance(x, y) {
  return Math.sqrt(x * x + y * y);
}

const minDistanceMult = 0.5;
const maxDistanceMult = 10;

function updateElement(elem) {
  const width = parseInt(elem.$bubble.style.width, 10);
  const css = getComputedStyle(elem.$container);
  const computedWidth = parseInt(css.width, 10);
  const x = mouseX - (elem.$container.offsetLeft + computedWidth / 2);
  const y = mouseY - (elem.$container.offsetTop + parseInt(css.height, 10) / 2);
  const distance = calcDistance(x, y);
  if (distance <= computedWidth) {
    elem.$bubble.classList.add('bubbleHover');
    elem.$bubble.classList.remove('minDistance');
    elem.$bubble.classList.remove('maxDistance');
  } else {
    elem.$bubble.classList.remove('bubbleHover');
    if (distance <= width * minDistanceMult) {
      elem.$bubble.classList.add('minDistance');
      elem.$bubble.classList.remove('maxDistance');
    } else if (distance <= width * maxDistanceMult) {
      elem.$bubble.classList.remove('minDistance');
      elem.$bubble.classList.add('maxDistance');
    } else {
      elem.$bubble.classList.remove('minDistance');
      elem.$bubble.classList.remove('maxDistance');
    }
  }
}

function update() {
  if (ready) {
    ready = false;
    bubbleElements.forEach(updateElement);
    ready = true;
  }
}

const interval = 100;
let intervalId = document.hasFocus() && setInterval(update, interval);
document.addEventListener('mouseenter', () => {
  if (!intervalId) {
    update();
    intervalId = setInterval(update, interval);
  }
}, false);
document.addEventListener('mouseleave', () => {
  ready = false;
  intervalId = clearInterval(intervalId);
  bubbleElements.forEach(elem => elem.$bubble.className = 'bubble');
  ready = true;
}, false);
