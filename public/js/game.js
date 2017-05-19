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

let pollPickups = [];
let parkingSpaces = [];

const segmentSize = (screenWidth - 10 * sizeFactor) / 5;

const column = Math.floor((Math.random() * 2));

for (let i = 0; i < 3; i++) {
  var n = Math.round((screenHeight- 50)/70);
  var y,z;
  var x = screenWidth/3*i;
  if(i==1) {
    x = screenWidth/6/2;
    x = screenWidth/2 - x;
  }
  if(i==2) {
    x = screenWidth - screenWidth/6;
  }
  if(column !=i) {
    y = Math.floor((Math.random() * (n-1)));
    z = Math.floor((Math.random() * (n-1)));
    while(z == y) {
      z = Math.floor((Math.random() * (n-1)));
    }
  } else {
    y = Math.floor((Math.random() * (n-1)));
  }
  for(let j = 0; j <n; j++) {
    const space = new GameComponent({
      width: screenWidth/6,
      height: sizeFactor * 2.5,
      url: "../images/Untitled.png",
      x: x,
      y: 50 + j * screenHeight/n,
    });
    parkingSpaces.push(space);

    if(j == y || (column != i && j == z)) {
      const pickupPoint = new GameComponent({
        width: Math.round(sizeFactor * 5),
        height: Math.round(sizeFactor * 5),
        url: "../images/bolt.png",
        x: x + screenWidth/12 - Math.round(sizeFactor * 2-5)/2,
        y: 50 + j*screenHeight/n +  sizeFactor * 5 + (screenHeight/n - sizeFactor * 2.5)/2- sizeFactor * 5/2,
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
    url: "../images/car" + user.sex + ".png",
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
    parkingSpaces.forEach(point => {
      if (car.crashWith(point)) {
        if(car.speedX == 1) {
          car.x -= 2;
          clearMove();
        }
        if(car.speedX == -1) {
          car.x += 2;
          clearMove();
        }
        if(car.speedY == 1) {
          car.y -= 2;
          clearMove();
        }
        if(car.speedY == -1) {
          car.y += 2;
          clearMove();
        }
      }
      point.update();
    })

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

doc.keydown(e => {
  const code = e.keyCode ? e.keyCode : e.which;

  if($('#user-modal').is(':visible')){
    if(code == 13){
      $('#user-submit').click();
    }
    return clearMove();
  }

  if($('#poll').is(':visible')) {
    if(code == 13){
      $('#poll-submit').click();
    }
    return clearMove();
  }

  if($('#experience-modal').is(':visible')){
    if(code == 13){
      $('#experience-submit').click();
    }
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
