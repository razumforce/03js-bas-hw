"use strict";
  // task #2 - игра-квест
  // 0 - good land (можно ходить), 1 - dead land (гибель), 2- prize (приз)
  // игрок находится изначально на клетке 2,4 (нижний ряд, 3-й слева, на клетке 0)
  // цель - дойти до клетки с призом (2), двигаясь толко вперед, влево и вправо.
  
  var GAME_MAP = [ [1, 1, 1, 1, 1],
                   [1, 0, 0, 2, 1],
                   [1, 0, 0, 1, 1],
                   [1, 0, 0, 0, 1],
                   [1, 1, 0, 0, 1] ];
  
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
      this.status.play = false;
      this.status.win = false;
    },

    gameWin: function() {
      this.status.play = false;
      this.status.win = true;
    },

    showTurnHistory: function(turn, vertical) { //turn = NaN show all turns,
                                                // vertical = true show in vertical alignment
      if (isNaN(turn)) {
        for (var item in this.turnHistory) {
          this.showOneTurn(item, vertical);
        }
      } else {
        this.showOneTurn(turn, vertical);
      }
    },

    showOneTurn: function(turn, vertical) { // вообще-то это желательно приватным методом сделать
      if (vertical) {
        console.log('Ход ', turn, '\nx=', this.turnHistory[turn][0]['x'],
                    '\ny=', this.turnHistory[turn][0]['y'],
                    '\nВаша команда: ', this.turnHistory[turn][1]);
      } else {
      console.log('Ход ', turn, ', x=', this.turnHistory[turn][0]['x'],
                  ', y=', this.turnHistory[turn][0]['y'],
                  'Ваша команда: ', this.turnHistory[turn][1]);
      }
    },
  }

  var userInput;
  showGameGreeting(GAME_MAP);
  
  while (player.status.play) {
    showGameStatus(player.position, turnNumber);
    showChoices();
    userInput = getUserInput();

    player.addTurnHistory(userInput); // все же лучше отдельным методом вызывать, а не в move

    if (userInput === 'q') {
      console.log('You gave up, very sorry, come back again!');
      break;
    } else {
      player.move(userInput);
    }

    switch (GAME_MAP[player.position.y][player.position.x]) {
      case 0:
        console.log('All ok, you moved to good land!');
        break;
      case 1:
        console.log('Oh, so sorry, you died at dead land... see you next time...');
        player.gameLose();
        break;
      case 2:
        console.log('You did it!!! get your prize and teleport home!');
        player.gameWin();
        break;
    }

    turnNumber++;
  }
  
  if (player.status.win) {
    console.log('Welcome home, you are winner!');
  } else {
    console.log('Suggest to restart our game and keep trying, you, loser...');
  }

  console.log('Ваш полный список ходов:\n');
  player.showTurnHistory(NaN, false);

  console.log('А теперь выберите ход, и увидите его в вертикальной распечатке:\n');
  var userTurn = getUserInputRange(0, player.turnsPlayed()-1);
  player.showTurnHistory(userTurn, true);



  // functions
  function showGameGreeting(map) {
    console.log('Welcome, you daring user!');
    console.log('Move forward, left or right, trying to escape dead lands (0),');
    console.log('and try to find a prize.');
    console.log('If you find prize (2) - you will get safely teleported to your home\n');
    console.log('and here is map of our lands:\n');
    for (var row in map) {
      console.log(map[row]);
    }
    console.log('\n');
    console.log('LET GAME START!\n');
  }

  function showGameStatus(pos, turn) {
    console.log('Turn num: ', turn, '. You are at x = ', pos.x, ', y = ', pos.y);
  }

  function showChoices() {
    console.log('Forward: w, Left: a, Right: d. GIVE UP: q');
  }

  function getUserInput() {
    while (true) {
      var move = prompt('Enter your command (or "q" for giving up):');
      if (move ==='q' || move === 'a' || move === 'd' || move === 'w') {
        return move;
      }
      alert('Wrong command, enter correct one!');
    }
  }

  function getUserInputRange(start, end) {
    var answer;
    while (true) {
      answer = parseInt(prompt('Введите номер хода, от '+start+' до '+end));
      if (isNaN(answer) || typeof(answer) != 'number') {
        alert('Введите число!')
      } else if (answer >= start && answer <= end) {
        return answer;
      } else {
        alert('Число должно быть от '+start+' до '+end);
      }
    }
  }
