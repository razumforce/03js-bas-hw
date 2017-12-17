"use strict";
window.onload = init;

// GAME CONSTANTS
var FIELD_SIZE_X = 30;
var FIELD_SIZE_Y = 20;
var CELL_SIZE = 20;
var FOOD_UNITS = 3;
var OBSTACLE_UNITS = 3;

// below var set in resetVariables()
var gameSpeed;
var foodDelay;
var foodDistance;
var obstacleDelay;
var obstacleDistance;
var score;
var snake;
var direction;
var obstacles;
var maxObstacles;
var currentDifficulty;
var gamePause; // spacebar
var modeGod; // shift+ctrl+g

// below vars set used as needed in various functions
var snakeTimer;
var obstacleTimer;
var snakeX;
var snakeY;
var winScore;




function init() {
  document.getElementById('new-button').disabled = true;
  resetVariables();
  setWinScore();
  showSnakeField();
  showScore();
  showWinScore();
  document.getElementById('start-button').addEventListener('click', startGameHandler);
  document.getElementById('new-button').addEventListener('click', newGameHandler);
  window.addEventListener('keydown', changeDirectionHandler);
}

function startGameHandler() {
  document.getElementById('start-button').disabled = true;
  respawn();
  snakeTimer = setInterval(move, gameSpeed);
  obstacleTimer = setInterval(createObstacle, obstacleDelay);
}

function newGameHandler() {
  resetVariables();
  snake = [];
  score = 0;
  direction = 'right';
  document.getElementById('snake-field').innerHTML = '';
  showSnakeField();
  showScore();
  document.getElementById('new-button').disabled = true;
  document.getElementById('start-button').disabled = false;
}

function resetVariables() {
  gameSpeed = 200;
  foodDelay = 3000;
  foodDistance = 2;
  obstacleDelay = 3500;
  obstacleDistance = 5;
  score = 0;
  snake = [];
  direction = 'right';
  obstacles = [];
  maxObstacles = 5;
  currentDifficulty = 0;
  gamePause = false;
  modeGod = false;
}

function setWinScore() {
  winScore = Math.floor(FIELD_SIZE_X * FIELD_SIZE_Y * 2 / 5);
}

function showSnakeField() {
  var parent = document.getElementById('snake-field');
  for (var y = 0; y < FIELD_SIZE_Y; y++) {
    var row = document.createElement('tr');
    for (var x = 0; x < FIELD_SIZE_X; x++) {
      var cell = document.createElement('td');
      cell.classList.add('field-cell');
      row.appendChild(cell);
    }
    parent.appendChild(row);
  }
}

function respawn() {
  snakeX = Math.floor(FIELD_SIZE_X / 2);
  snakeY = Math.floor(FIELD_SIZE_Y / 2);
  var snakeHead = document.getElementsByClassName('field-cell')[FIELD_SIZE_X * snakeY + snakeX];
  var snakeTale = document.getElementsByClassName('field-cell')[FIELD_SIZE_X * snakeY + snakeX - 1];
  snakeHead.classList.add('snake-unit');
  snakeTale.classList.add('snake-unit');
  snake.push(snakeHead);
  snake.push(snakeTale);
  setTimeout(createFood, foodDelay);
}

function showScore() {
  document.getElementById('snake-score').lastChild.innerText = score;
}

function showWinScore() {
  document.getElementById('snake-win').lastChild.innerText = winScore;
}

function move() {
  changeSnakeCoord();
  var snakeHead = document.getElementsByClassName('field-cell')[FIELD_SIZE_X * snakeY + snakeX];
  if (checkGameLost(snakeHead)) {
    lostGameHandler();
  } else {
    if (checkCell(snakeHead, 'food-unit')) {
      replaceCellClass(snakeHead, 'food-unit', 'snake-unit');
      snake.unshift(snakeHead);
      score++;
      showScore();
      createFood();
      if (checkGameWin()) {
        winGameHandler();
      } else {
        updateDifficulty();
      }
    } else {
      snakeHead.classList.add('snake-unit');
      snake.unshift(snakeHead);
      var snakeTale = snake.pop();
      snakeTale.classList.remove('snake-unit');
    }
  }
}

function checkCell(cell, classStart) {
  var re = RegExp(classStart + '*');
  for (var i = 0; i < cell.classList.length; i++) {
    if (re.test(cell.classList[i])) {
      return true;
    }
  }
  return false;
}

function replaceCellClass(cell, classStart, classToMake) {
  var re = RegExp(classStart + '*');
  for (var i = 0; i < cell.classList.length; i++) {
    if (re.test(cell.classList[i])) {
      cell.classList.remove(cell.classList[i]);
      cell.classList.add(classToMake);
    }
  }
}

function removeCellClass(cell, classStart) {
  var re = RegExp(classStart + '*');
  for (var i = 0; i < cell.classList.length; i++) {
    if (re.test(cell.classList[i])) {
      cell.classList.remove(cell.classList[i]);
    }
  }
}

function changeSnakeCoord() {
  switch (direction) {
    case 'right':
      if (snakeX < FIELD_SIZE_X - 1) {
        snakeX++;
      } else {
        snakeX = 0;
      }
      break;
    case 'left':
      if (snakeX > 0) {
        snakeX--;
      } else {
        snakeX = FIELD_SIZE_X - 1;
      }
      break;
    case 'top':
      if (snakeY > 0) {
        snakeY--;
      } else {
        snakeY = FIELD_SIZE_Y - 1;
      }
      break;
    case 'bottom':
      if (snakeY < FIELD_SIZE_Y - 1) {
        snakeY++;
      } else {
        snakeY = 0;
      }
      break;
  }
}

function changeDirectionHandler(event) {
  switch (event.keyCode) {
    case 71:
      if (modeGod) {
        modeGod = false;
        document.getElementById('snake-title').classList.remove('title-god');
      } else {
        modeGod = true;
        document.getElementById('snake-title').classList.add('title-god');
      }
      break;
    case 32:
      if (gamePause) {
        gamePause = false;
        snakeTimer = setInterval(move, gameSpeed);
        obstacleTimer = setInterval(createObstacle, obstacleDelay);
      } else {
        gamePause = true;
        clearInterval(snakeTimer);
        clearInterval(obstacleTimer);
      }
      break;
    case 37:
      if (direction !=='right') {
        direction = 'left';
      }
      break;
    case 38:
      if (direction !=='bottom') {
        direction = 'top';
      }
      break;
    case 39:
      if (direction !=='left') {
        direction = 'right';
      }
      break;
    case 40:
      if (direction !=='top') {
        direction = 'bottom';
      }
      break;
  }
}

function createFood() {
  do {
    var newFood = createItem(foodDistance);
  } while (checkCell(newFood, 'obstacle-unit'))
  var foodClass = 'food-unit' + Math.floor(Math.random() * FOOD_UNITS + 1);
  newFood.classList.add(foodClass);
}

function createObstacle() {
  if (obstacles.length === maxObstacles) {
    var removedObstacle = obstacles.shift();
    removeCellClass(removedObstacle, 'obstacle-unit');
  }
  do {
    var newObstacle = createItem(obstacleDistance);
  } while (obstacles.includes(newObstacle) || checkCell(newObstacle, 'food-unit'))
  newObstacle.classList.add('obstacle-unit' + Math.floor(Math.random() * OBSTACLE_UNITS + 1));
  obstacles.push(newObstacle);
}

function createItem(distance) {
  var itemSet = false;
  while (!itemSet) {
    var itemX = Math.floor(Math.random() * FIELD_SIZE_X);
    var itemY = Math.floor(Math.random() * FIELD_SIZE_Y);
    var item = document.getElementsByClassName('field-cell')[FIELD_SIZE_X * itemY + itemX];
    itemSet = !snake.includes(item) && (Math.abs(itemY - snakeY) > distance) && (Math.abs(itemX - snakeX) > distance);
  }
  return item;
}

function checkGameLost(snakeHead) {
  if (modeGod) {
    return snake.includes(snakeHead);
  } else {
    return (snake.includes(snakeHead) || obstacles.includes(snakeHead));
  }
}

function checkGameWin() {
  return (score >= winScore);
}

function lostGameHandler() {
  resetTimersAndButtons();
  alert('Вы проиграли!');
}

function winGameHandler() {
  resetTimersAndButtons();
  alert('ВЫИГРЫШ!!!');
}

function resetTimersAndButtons() {
  clearInterval(snakeTimer);
  clearInterval(obstacleTimer);
  document.getElementById('new-button').disabled = false;
}

function updateDifficulty() {
  var newDifficulty = Math.floor(score / winScore * 10) * 10;
  if (newDifficulty > currentDifficulty) {
    currentDifficulty = newDifficulty;
    gameSpeed -= Math.floor(currentDifficulty / 3.5);
    clearInterval(snakeTimer);
    snakeTimer = setInterval(move, gameSpeed);
    maxObstacles += Math.floor(currentDifficulty / 10);
  }
}

