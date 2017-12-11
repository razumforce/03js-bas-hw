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


var chessTable1 = 'ch1';

// сначала рендерим DOM-модель пустой доски и нумерации столбцов/рядов
createChessTable(chessTable1);
showColumns(chessTable1, COLUMNS, true, true); // показываем названия столбцов и сверху, и снизу
showRows(chessTable1, ROWS, true, true); // показываем номера рядов и слева, и справа

// а теперь показываем фигуры на всей доске
showAllChessPieces(chessTable1, COLUMNS, ROWS, GAME, FIGURES);



// functions
function createChessTable(parentId) {
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
    createRow(parent, rows[i], columns, (i % 2 === 0 ? 'white' : 'black'));
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
    if (cell_background === 'black') {
      cell_background = 'white';
    } else if (cell_background === 'white') {
      cell_background = 'black';
    }
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

function showAllChessPieces(parentId, columns, rows, field, pieces_codes) {
  for (var i in field) {
    for (var j in field[i]) {
      var showId = parentId + '_cell' + columns[j] + rows[i];
      var showContent = '';
      var showClass = '';
      if (field[i][j] === 'XX') {
        showContent = ''
        showClass = 'figure-X';
      } else if (field[i][j][0] === 'W') {
        showContent = pieces_codes[field[i][j]];
        showClass = 'figure-W';
      } else if (field[i][j][0] === 'B') {
        showContent = pieces_codes[field[i][j]];
        showClass = 'figure-B';
      }
      displayCellContent(showId, showContent, showClass);
    }
  }
}

function displayCellContent(elementId, contentHTML, showClass) {
  var elem = document.getElementById(elementId);
  elem.classList.add(showClass);
  elem.innerHTML = contentHTML;
}
