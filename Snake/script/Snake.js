let array = [];
let w = 100;
let framerate = 4;
let Snake;
let first_random_cell, img, rate = 0;
let row, coloum;





function setup(hard = 0) {
    w -= hard;
    array = [];


    createCanvas(windowWidth, windowHeight);

    frameRate(framerate += 2);

    img.size(w, w);
    img.position(0, windowHeight - w);


    coloum = floor(height / w) - 1;
    row = floor(width / w);
    for (let i = 0; i < row; i++) {

        for (let j = 0; j < coloum; j++) {

            array.push(new cell(i, j));

        }

    }

    Snake = new snake();

    first_random_cell = random_cell();



}

function preload() {

    alert("NOTE--When the snake eats itself, its speed increases and the matrix size decreases :) ");

    img = createImg('image/rate.png', 'rate');
    img.position(0, windowHeight - w);
}



function draw() {

    background(0);


    strokeWeight(1);




    for (let i = 0; i < array.length; i++) {

        array[i].show(50, 200, 240);
    }

    if (array[first_random_cell].i == Snake.body[0].i && array[first_random_cell].j == Snake.body[0].j) {

        Snake.push_cell(new cell(Snake.body[0].i, Snake.body[0].j));


        first_random_cell = random_cell();

    }


    let X = Snake.body[0].i,
        Y = Snake.body[0].j;
    if (Snake.flag == 3) {
        Snake.body[0].i++;
    } else if (Snake.flag == 2) {
        Snake.body[0].j++;
    } else if (Snake.flag == 1) {
        Snake.body[0].j--;
    } else if (Snake.flag == 4) {
        Snake.body[0].i--;
    }


    if (!Snake.check(Snake.body[0], 1)) {
        //resizeCanvas(width + 10, height + 10);
        setup(5);
        Snake.body.splice(1);
    }

    //check if out the gird
    if (Snake.body[0].j >= coloum) {
        Snake.body[0].j = 0;
    } else if (Snake.body[0].i >= row) {
        Snake.body[0].i = 0;
    } else if (Snake.body[0].j < 0) {
        Snake.body[0].j = coloum - 1;
    } else if (Snake.body[0].i < 0) {
        Snake.body[0].i = row - 1;
    }

    Snake.Rerange(X, Y);

    Snake.print_snake();

    array[first_random_cell].show(255, 0, 0);

    if (!Snake.check(Snake.body[0], 1)) {
        print("Game Over");

        Snake.body.splice(1);
        setup(10);;
        //resizeCanvas(width + 10, height + 10);
        //noLoop();
    }

    keyPressed();


    strokeWeight(0);
    fill(0, 0, 255);
    textSize(w, w);
    textAlign(LEFT, BOTTOM);
    rate = Math.max(rate, Snake.body.length);
    text(rate, 0 + w, windowHeight);



}




function keyPressed() {

    if (keyCode == UP_ARROW) {
        Snake.flag = 1;
    } else if (keyCode == DOWN_ARROW) {
        Snake.flag = 2;
    } else if (keyCode == RIGHT_ARROW) {
        Snake.flag = 3;
    } else if (keyCode == LEFT_ARROW) {
        Snake.flag = 4;
    }

}



function random_cell() {

    let index = floor(random(0, array.length));
    strokeWeight(5);
    stroke(255, 0, 50);
    //check the new random cell not in a snake 
    while (!Snake.check(array[index], 0)) {
        index = floor(random(0, array.length));

    }


    return index;
}
