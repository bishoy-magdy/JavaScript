let snakeLength = [];
let cellWidth = 70;
let framerate = 20;
let snake;
let appleCell, img, rate = 0;
let row, coloum;

function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(framerate);
    img.size(cellWidth, cellWidth);
    img.position(0, windowHeight - cellWidth);
    coloum = floor(height / cellWidth) - 1;
    row = floor(width / cellWidth);

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < coloum; j++) {
            snakeLength.push(new Cell(i, j));
        }
    }

    snake = new Snake();
    appleCell = randomCell();
}

function preload() {
    img = createImg('image/rate.png', 'rate');
    img.position(0, windowHeight - cellWidth);
}

function draw() {
    background(0);
    strokeWeight(1);

    for (let i = 0; i < snakeLength.length; i++) {
        snakeLength[i].show(50, 200, 240);
    }

    if (snakeLength[appleCell].i == snake.body[0].i && snakeLength[appleCell].j == snake.body[0].j) {
        snake.pushCell(new Cell(snake.body[0].i, snake.body[0].j));
        appleCell = randomCell();
    }

    let x = snake.body[0].i, y = snake.body[0].j;

    if (snake.flag == 3) {
        snake.body[0].i++;
    } else if (snake.flag == 2) {
        snake.body[0].j++;
    } else if (snake.flag == 1) {
        snake.body[0].j--;
    } else if (snake.flag == 4) {
        snake.body[0].i--;
    }

    if (!snake.check(snake.body[0], 1)) {
        snake.body.splice(1);
        setup();
    }

    //check if out the gird
    if (snake.body[0].j >= coloum) {
        snake.body[0].j = 0;
    } else if (snake.body[0].i >= row) {
        snake.body[0].i = 0;
    } else if (snake.body[0].j < 0) {
        snake.body[0].j = coloum - 1;
    } else if (snake.body[0].i < 0) {
        snake.body[0].i = row - 1;
    }

    snake.Rerange(x, y);
    snake.printSnake();

    snakeLength[appleCell].show(255, 0, 0);

    keyPressed();
    strokeWeight(0);
    fill(0, 0, 255);
    textSize(cellWidth, cellWidth);
    textAlign(LEFT, BOTTOM);
    rate = Math.max(rate, snake.body.length);
    text(rate, 0 + cellWidth, windowHeight);
}

function keyPressed() {
    if (keyCode == UP_ARROW) {
        snake.flag = 1;
    } else if (keyCode == DOWN_ARROW) {
        snake.flag = 2;
    } else if (keyCode == RIGHT_ARROW) {
        snake.flag = 3;
    } else if (keyCode == LEFT_ARROW) {
        snake.flag = 4;
    }
}

function randomCell() {
    let index = floor(random(0, snakeLength.length));
    strokeWeight(5);
    stroke(255, 0, 50);
    //check the new random cell not in a snake 
    while (!snake.check(snakeLength[index], 0)) {
        index = floor(random(0, snakeLength.length));

    }
    return index;
}
