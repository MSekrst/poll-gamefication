'use strict';

const doc = $(document);

const screenWidth = doc.width() - 2;
const screenHeight = doc.height() - 155;

const sizeFactor = screenHeight / 80;
const carSpeed = 1;

class GameComponent {
  constructor(options) {
    if (options.url) {
      this.image = new Image();
      this.image.src = options.url;
    }

    if (options.color) {
      this.color = options.color;
    }

    this.width = options.width;
    this.height = options.height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = options.x;
    this.y = options.y;
  }

  update() {
    const ctx = gameArea.context;

    if (this.image) { // if element is car
      // TODO.txt - check Safari & Opera support
      ctx.mozImageSmoothingEnabled = true;
      ctx.webkitImageSmoothingEnabled = true;
      ctx.msImageSmoothingEnabled = true;
      ctx.imageSmoothingEnabled = true;

      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else { // element is obstacle
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  crashWith(obstacle) {
    if (!this || !obstacle) {
      return false;
    }

    const myleft = this.x;
    const myright = this.x + (this.width);
    const mytop = this.y;
    const mybottom = this.y + (this.height);

    const otherleft = obstacle.x;
    const otherright = obstacle.x + (obstacle.width);
    const othertop = obstacle.y;
    const otherbottom = obstacle.y + (obstacle.height);

    let crash = true;

    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }

}

class GameArea {
  constructor() {
    this.canvas = document.createElement('canvas');
  }

  start() {
    this.canvas.width = screenWidth;
    this.canvas.height = screenHeight;
    this.context = this.canvas.getContext('2d');

    $('#game-container').html(this.canvas);

    this.interval = setInterval(updateGameArea, 20);
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  stop() {
    clearInterval(this.interval);
  }
}

let pollPickups = [];
let parkingSpaces = [];

const segmentSize = (screenWidth - 10 * sizeFactor) / 5;

const columnWithTwo = Math.floor((Math.random() * 2));
const numberOfSpaces = Math.round((screenHeight - 50) / (sizeFactor * 5 + 2 * sizeFactor * 3 + 10));

// trava uz rubove
let grass = new GameComponent({
  width: sizeFactor * 3,
  height: screenHeight - sizeFactor * 5 + 10,
  url: '../images/grass.png',
  x: 0,
  y: sizeFactor * 5 + 10,
});
parkingSpaces.push(grass);

grass = new GameComponent({
  width: sizeFactor * 3,
  height: screenHeight - sizeFactor * 5 + 10,
  url: '../images/grass.png',
  x: screenWidth - sizeFactor * 3,
  y: sizeFactor * 5 + 10,
});

parkingSpaces.push(grass);

for (let i = 0; i < 3; i++) {
  let chosenSpace1, chosenSpace2;

  let columnStart = grass.width;
  if (i === 1) {
    columnStart = screenWidth / 6 / 2;
    columnStart = screenWidth / 2 - columnStart;
  } else {
    if (i === 2) {
      columnStart = screenWidth - screenWidth / 6 - grass.width;
    }
  }

  //random generira parkirno mjesto za trenutni stupac
  if (columnWithTwo === i) {
    chosenSpace1 = Math.floor((Math.random() * (numberOfSpaces - 1)));
    chosenSpace2 = Math.floor((Math.random() * (numberOfSpaces - 1)));
    while (chosenSpace2 === chosenSpace1) {
      chosenSpace2 = Math.floor((Math.random() * (numberOfSpaces - 1)));
    }
  } else {
    chosenSpace1 = Math.floor((Math.random() * (numberOfSpaces - 1)));
  }

  for (let j = 0; j < numberOfSpaces; j++) {
    const space = new GameComponent({
      width: screenWidth / 6,
      height: sizeFactor * 3,
      url: '../images/line.png',
      x: columnStart,
      y: sizeFactor * 5 + 10 + j * screenHeight / numberOfSpaces,
    });
    parkingSpaces.push(space);

    if (j === chosenSpace1 || (columnWithTwo === i && j === chosenSpace2)) {
      const pickupPoint = new GameComponent({
        width: Math.round(sizeFactor * 5),
        height: Math.round(sizeFactor * 5),
        url: '../images/munja.png',
        x: columnStart + screenWidth / 12 - Math.round(sizeFactor * 5) / 2,
        y: space.y + space.height + (screenHeight / numberOfSpaces - space.height) / 2 - Math.round(sizeFactor * 5) / 2,
      });
      pollPickups.push(pickupPoint);
    }
  }
}

let gameArea = new GameArea();
let car;

const startGame = () => {
  car = new GameComponent({
    width: sizeFactor * 10,
    height: sizeFactor * 5,
    url: '../images/car' + user.sex + '.png',
    x: 0,
    y: 0,
  });

  gameArea.start();
};

function updateGameArea() {
  gameArea.clear();

  const remainingPickups = [];

  pollPickups.forEach(point => {
    if (car.crashWith(point)) {
      newPoll();

      car.x += car.speedX;
      car.y += car.speedY;

      // without this with each pickup game gets slower
      if (pollPickups.length > 1) {
        gameArea.interval = setInterval(updateGameArea, 6 * pollPickups.length);
      }

      car.update();
    } else {
      point.update();

      remainingPickups.push(point);

      if (car.x >= 0 && car.x <= screenWidth - car.width) {
        car.x += car.speedX;
      }
      if (car.x < 0) {
        car.x = 0;
      }
      if (car.x > screenWidth - car.width) {
        car.x = screenWidth - car.width;
      }
      if (car.y >= 0 && car.y <= screenHeight - car.height) {
        car.y += car.speedY;
      }
      if (car.y < 0) {
        car.y = 0;
      }
      if (car.y > screenHeight - car.height) {
        car.y = screenHeight - car.height;
      }

      car.update();
    }
    parkingSpaces.forEach(point => {
      if (!car) {
        return;
      }

      if (car.crashWith(point)) {
        if (car.speedX === 1) {
          car.x -= 2;
          clearMove();
        }
        if (car.speedX === -1) {
          car.x += 2;
          clearMove();
        }
        if (car.speedY === 1) {
          car.y -= 2;
          clearMove();
        }
        if (car.speedY === -1) {
          car.y += 2;
          clearMove();
        }
      }
      point.update();
    });

  });

  pollPickups = remainingPickups;
}

function moveUp() {
  if (!car) {
    return;
  }

  car.speedY = -carSpeed;

  if (!upBtn.hasClass('btn-success')) {
    upBtn.addClass('btn-success');
  }
}

function moveDown() {
  if (!car) {
    return;
  }

  car.speedY = carSpeed;

  if (!downBtn.hasClass('btn-success')) {
    downBtn.addClass('btn-success');
  }
}

function moveLeft() {
  if (!car) {
    return;
  }

  car.speedX = -carSpeed;

  if (!leftBtn.hasClass('btn-success')) {
    leftBtn.addClass('btn-success');
  }
}

function moveRight() {
  if (!car) {
    return;
  }

  car.speedX = carSpeed;

  if (!rightBtn.hasClass('btn-success')) {
    rightBtn.addClass('btn-success');
  }
}

function clearMove() {
  if (!car) {
    return;
  }

  car.speedX = 0;
  car.speedY = 0;

  upBtn.removeClass('btn-success');
  leftBtn.removeClass('btn-success');
  rightBtn.removeClass('btn-success');
  downBtn.removeClass('btn-success');
}

const pollElement = $('#poll');
const pollSubmitElement = $('#poll-submit');

doc.keydown(e => {
  const code = e.keyCode ? e.keyCode : e.which;

  console.log(code);

  if (code === 13) {
    if ($('#user-modal').is(':visible')) {
      $('#user-submit').click();
    } else {
      if (pollElement.is(':visible') && !pollSubmitElement.is(':disabled')) {
        pollSubmitElement.click();
        return clearMove();
      } else {
        if ($('#experience-modal').is(':visible')) {
          $('#experience-submit').click();
          return clearMove();
        }
      }
    }
  } else {
    if (!pollElement.is(':visible')) {
      switch (code) {
        case 38 || 87:
          return moveUp();
        case 40 || 83:
          return moveDown();
        case 37 || 65:
          return moveLeft();
        case 39 || 68:
          return moveRight();
        default:
          return clearMove();
      }
    }
  }
});

doc.keyup(() => {
  clearMove();
});

const upBtn = $('#move-up');
const leftBtn = $('#move-left');
const rightBtn = $('#move-right');
const downBtn = $('#move-down');

upBtn.on('mousedown touchstart', moveUp);
upBtn.mouseup(clearMove);
leftBtn.on('mousedown touchstart', moveLeft);
leftBtn.mouseup(clearMove);
rightBtn.on('mousedown touchstart', moveRight);
rightBtn.mouseup(clearMove);
downBtn.on('mousedown touchstart', moveDown);
downBtn.mouseup(clearMove);
