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
      // TODO - check Safari & Opera support
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
    if (!this || !obstacle) {
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

const car = new GameComponent({
  width: sizeFactor * 10,
  height: sizeFactor * 5,
  url: "../images/car.png",
  x: 0,
  y: 0,
});

let pollPickups = [];

const segmentSize = (screenWidth - 10 * sizeFactor) / 5;

// generate pickup points
for (let i = 0; i < 5; i++) {
  const pickupPoint = new GameComponent({
      width: Math.round(sizeFactor * 5),
      height: Math.round(sizeFactor * 5),
      url: "../images/bolt.png",
      x: i === 0 ? Math.random() * (segmentSize - 10 * sizeFactor - 1) + 1 + 10 * sizeFactor : Math.random() * segmentSize + (i * segmentSize),
      y: i === 0 ? Math.random() * (screenHeight - sizeFactor * 5) + 1  + 5 * sizeFactor : Math.random() * (screenHeight - 5 * sizeFactor),
  });

  pollPickups.push(pickupPoint);

}

let gameArea = new GameArea();

const startGame = () => {
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

      if (car.x >= 0 && car.x <= screenWidth - car.width)
        car.x += car.speedX;
      if (car.x < 0) car.x = 0;
      if (car.x > screenWidth - car.width) car.x = screenWidth - car.width;
      if (car.y >= 0 && car.y <= screenHeight - car.height)
        car.y += car.speedY;
      if (car.y < 0) car.y = 0;
      if (car.y > screenHeight - car.height) car.y = screenHeight - car.height;

      car.update();
    }
  });

  pollPickups = remainingPickups;
}

function moveUp() {
  car.speedY = -carSpeed;

  if (!upBtn.hasClass('btn-success')) {
    upBtn.addClass('btn-success');
  }
}

function moveDown() {
  car.speedY = carSpeed;

  if (!downBtn.hasClass('btn-success')) {
    downBtn.addClass('btn-success');
  }
}

function moveLeft() {
  car.speedX = -carSpeed;

  if (!leftBtn.hasClass('btn-success')) {
    leftBtn.addClass('btn-success');
  }
}

function moveRight() {
  car.speedX = carSpeed;

  if (!rightBtn.hasClass('btn-success')) {
    rightBtn.addClass('btn-success');
  }
}

function clearMove() {
  car.speedX = 0;
  car.speedY = 0;

  upBtn.removeClass('btn-success');
  leftBtn.removeClass('btn-success');
  rightBtn.removeClass('btn-success');
  downBtn.removeClass('btn-success');
}

// Event assigns
// TODO remove handlers when modal is shown
doc.keydown(e => {
  const code = e.keyCode ? e.keyCode : e.which;

  if($('#poll-modal').is(':visible')) {
    return clearMove();
  }
  switch (code) {
    case 38: return moveUp();
    case 40: return moveDown();
    case 37: return moveLeft();
    case 39: return moveRight();
    default: return clearMove();
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
