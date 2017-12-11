"use strict";
  // task #2 - игра-квест
  // 0 - good land (можно ходить), 1 - dead land (гибель), 2- prize (приз)
  // игрок находится изначально на клетке 2,4 (нижний ряд, 3-й слева, на клетке 0)
  // цель - дойти до клетки с призом (2), двигаясь толко вперед, влево и вправо.
  
var COLUMNS = ['0', '1', '2', '3', '4'];
var ROWS = ['0', '1', '2', '3', '4'];
var FIGURES = {'1': '', '2': '', 
               '0': ''};
var COLORS = {'1': 'color1', '2': 'color2', '0': 'color0'};

var GAME_MAP = [ ['1', '1', '1', '1', '1'],
                 ['1', '0', '0', '2', '1'],
                 ['1', '0', '0', '1', '1'],
                 ['1', '0', '0', '0', '1'],
                 ['1', '1', '0', '0', '1'] ];

var turnNumber = 0;

var player = {
  position: {
    x: 2,
    y: 4,
  },
  status: {
    play: true,
    win: false,
  },
  turnHistory: [],

  turnsPlayed: function() {
    return this.turnHistory.length;
  },

  addTurnHistory: function(command) {
    this.turnHistory.push([Object.assign({}, this.position), command]);
  },

  move: function(command) {
    switch (command) {
    case 'w':
      this.position.y--;
      break;
    case 'a':
      this.position.x--;
      break;
    case 'd':
      this.position.x++;
      break;
    }
  },

  gameLose: function() {
    document.getElementById('button_com').innerText = 'Смотреть историю ходов';
    document.getElementById('command_text').style.display = 'none';
    this.status.play = false;
    this.status.win = false;
  },

  gameWin: function() {
    document.getElementById('button_com').innerText = 'Смотреть историю ходов';
    document.getElementById('command_text').style.display = 'none';
    this.status.play = false;
    this.status.win = true;
  },

  showTurnHistory: function() {
    for (var item in this.turnHistory) {
      this.showOneTurn(item);
    }
  },

  showOneTurn: function(turn) { // вообще-то это желательно приватным методом сделать
    var para = document.createElement('span');
    para.innerText = 'Ход ' + turn + ', x=' + this.turnHistory[turn][0]['x'] +
              ', y=' + this.turnHistory[turn][0]['y'] +
              ' Ваша команда: ' + this.turnHistory[turn][1] +'\n';
    var parent = document.getElementById('turns_history');
    parent.appendChild(para);
  },
}

// загрузка страницы
var userInput;
var gameId = 'game1';
showGameMap(gameId, GAME_MAP);
showGameStatus(gameId, player.position, turnNumber);
// закончили грузить страницу

// ****************************************************************************
// главная функция - перехватывает нажатия на кнопку
function getUserInput() {
  if (player.status.play) {
    var move = document.getElementById('command_text').value;
    document.getElementById('command_text').value = '';
    if (move === 'q' || move === 'a' || move === 'd' || move === 'w') {
        makeMove(move);
        turnNumber++;
        showGameStatus(gameId, player.position, turnNumber);
    } else {
      alert('Неправильная команда, введите верную!');
    }
  } else {
    displayGameResults();
  }
}
// ****************************************************************************

// all other functions
function makeMove(userInput) {
  player.addTurnHistory(userInput);
  if (userInput === 'q') {
    alert('Как жаль, что вы сдались...');
    player.gameLose();
    displayGameResults();
  } else {
    erasePlayerMark(gameId, player.position);
    player.move(userInput);
    switch (GAME_MAP[player.position.y][player.position.x]) {
      case '0':
        alert('All ok, you moved to good land!');
        break;
      case '1':
        alert('Oh, so sorry, you died at dead land... see you next time...');
        player.gameLose();
        break;
      case '2':
        alert('You did it!!! get your prize and teleport home!');
        player.gameWin();
        break;
    }
  }
}

function displayGameResults() {
  var parent = document.getElementById('turns_history');
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild)
  }
  var para = document.createElement('span');
  para.innerText = 'Ваш полный список ходов:\n';
  parent.appendChild(para);
  player.showTurnHistory();
}

function showGameMap(parentId, map) {
  createMapModel(parentId);
  showColumns(parentId, COLUMNS, false, true); // показываем названия столбцов и сверху, и снизу
  showRows(parentId, ROWS, true, false); // показываем номера рядов и слева, и справа
  showAllCells(parentId, COLUMNS, ROWS, GAME_MAP, FIGURES, COLORS);
}

function createMapModel(parentId) {
  createLabelsRow(parentId, 't', COLUMNS);
  createPlayField(parentId, ROWS, COLUMNS);
  createLabelsRow(parentId, 'b', COLUMNS);
}

function createLabelsRow(parentId, row, columns) {
  var parent = document.getElementById(parentId);
  var div = document.createElement('div');
  div.id = parentId + row;
  div.className = 'columnlabel row';
  parent = parent.appendChild(div);
  createRow(parent, row, columns, 'transparent');
}

function createPlayField(parentId, rows, columns) {
  rows.reverse();
  for (var i in rows) {
    var parent = document.getElementById(parentId);
    var div = document.createElement('div');
    div.id = parentId + 'row' + rows[i];
    div.className = 'row';
    parent = parent.appendChild(div);
    createRow(parent, rows[i], columns, '');
  }
}

function createRow(parent, row, columns, cell_background) {
  var div = document.createElement('div');
  div.id = parent.parentElement.id + '_row' + row + 'l';
  div.className = 'rowlabel cell transparent';
  parent.appendChild(div);

  for (var i in columns) {
    div = document.createElement('div');
    div.id = parent.parentElement.id + '_' + 'cell' + columns[i] + row;
    div.className = 'cell ' + cell_background;
    parent.appendChild(div);
  }

  div = document.createElement('div');
  div.id = parent.parentElement.id + '_row' + row + 'r';
  div.className = 'rowlabel cell transparent';
  parent.appendChild(div);
}

function showColumns(parentId, columns, top_show, bottom_show) {
  for (var i in columns) {
    if (top_show) {
      displayCellContent(parentId + '_cell' + columns[i] + 't', columns[i], 'figure-X');
    }
    if (bottom_show) {
      displayCellContent(parentId + '_cell' + columns[i] + 'b', columns[i], 'figure-X');
    }
  }
}

function showRows(parentId, rows, left_show, right_show) {
  for (var i in rows) {
    if (left_show) {
      displayCellContent(parentId + '_row' + rows[i] + 'l', rows[i], 'figure-X');
    }
    if (right_show) {
      displayCellContent(parentId + '_row' + rows[i] + 'r', rows[i], 'figure-X');
    }
  }
}

function showAllCells(parentId, columns, rows, field, pieces_codes, color_codes) {
  for (var i in field) {
    for (var j in field[i]) {
      var showId = parentId + '_cell' + columns[j] + rows[i];
      var showContent = pieces_codes[field[i][j]];
      var showClass = color_codes[field[i][j]];
      displayCellContent(showId, showContent, showClass);
    }
  }
}

function displayCellContent(elementId, contentHTML, showClass) {
  var elem = document.getElementById(elementId);
  if (showClass != '') elem.classList.add(showClass);
  elem.innerHTML = contentHTML;
}

function showGameStatus(parentId, pos, turn) {
  var elem = document.getElementById('turnnumber');
  elem.innerHTML = turn;
  var showId = parentId + '_cell' + COLUMNS[pos.x] + ROWS[pos.y];
  displayCellContent(showId, 'X', '');
}

function erasePlayerMark(parentId, pos) {
  var showId = parentId + '_cell' + COLUMNS[pos.x] + ROWS[pos.y];
  displayCellContent(showId, '', '');
}
