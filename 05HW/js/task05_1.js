"use strict";
// task #1 - шахматная доска

var COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
var ROWS = ['1', '2', '3', '4', '5', '6', '7', '8'];
var FIGURES = {'WC': '&#9820;', 'WH': '&#9822;', 'WE': '&#9821;', 'WQ': '&#9819;', 'WK': '&#9818;', 'WP': '&#9823;', 
               'BC': '&#9820;', 'BH': '&#9822;', 'BE': '&#9821;', 'BQ': '&#9819;', 'BK': '&#9818;', 'BP': '&#9823;',
               'XX': ''};

var GAME = [['BC', 'BH', 'BE', 'BQ', 'BK', 'BE', 'BH', 'BC'],
            ['BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP', 'BP'],
            ['XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX'],
            ['XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX'],
            ['XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX'],
            ['XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX', 'XX'],
            ['WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP', 'WP'],
            ['WC', 'WH', 'WE', 'WQ', 'WK', 'WE', 'WH', 'WC']];


var chessTable1 = 'chess_table';
displayChessTable(chessTable1);




function displayChessTable(parentId) {
  displayLabelsRow(parentId, 't', COLUMNS, "", "");
  displayPlayField(parentId, GAME, ROWS, true, true);
  displayLabelsRow(parentId, 'b', COLUMNS, "", "");
}

function displayLabelsRow(parentId, row, labels, before_cell, after_cell) {
  var parent = document.getElementById(parentId);
  var div = document.createElement('div');
  div.className = 'columnlabel row';
  parent = parent.appendChild(div);
  displayRow(parent, row, labels, 'noborder', before_cell, after_cell);
}

function displayRow(parentId, row, content, main_cell, before_cell, after_cell) {
  var div = document.createElement('div');
  div.className = 'rowlabel cell noborder';
  div.innerText = before_cell;
  parentId.appendChild(div);

  for (var i in content) {
    div = document.createElement('div');
    div.id = 'cell' + COLUMNS[i] + row;
    div.className = 'cell ' + main_cell + ' ' + (content[i][1] === undefined ? '' : content[i][1]);
    if (main_cell === 'black') {
      main_cell = 'white';
    } else if (main_cell === 'white') {
      main_cell = 'black';
    }
    div.innerHTML = content[i][0];
    parentId.appendChild(div);
  }

  div = document.createElement('div');
  div.className = 'rowlabel cell noborder';
  div.innerText = after_cell;
  parentId.appendChild(div);
}

function displayPlayField(parentId, field, rows, displayBefore, displayAfter) {
  rows.reverse();
  for (var i in field) {
    var parent = document.getElementById(parentId);
    var div = document.createElement('div');
    div.id = 'row' + rows[i];
    div.className = 'row';
    parent = parent.appendChild(div);
    var rowContent = [];
    for (var j in field[i]) {
      rowContent.push([FIGURES[field[i][j]], 'figure-' + field[i][j][0]]);
    }
    displayRow(parent, rows[i], rowContent, (i % 2 === 0 ? 'white' : 'black'), (displayBefore ? rows[i] : ''), (displayAfter ? rows[i] : ''));
  }
}