var grid = [];
var w, h;
var rectvalue = 100;
var point_mouse_x, point_mouse_y;
point_mouse_x = point_mouse_y = -1;
var save_i, save_j;
save_j = save_i = -1;
var dx = [0, 0, 1, -1, 1, -1, -1, 1];
var dy = [-1, 1, 0, 0, 1, -1, 1, -1];
var slider1, val,
    sider2, P1, P2;

let img;
let countbee = 0,
    countcell = 0;

function preload() {
    img = loadImage('image/mine2.ico');
}


function setup() {

    createCanvas(windowWidth, windowHeight);


    w = floor(width / (rectvalue)),
        h = floor(height / rectvalue);
    h--;
    w--;
    grid = new Array(h);

    for (var i = 0; i < h; i++) {
        grid[i] = new Array(w);

    }

    //generate grid
    val2 = 0.1;
    for (var i = 0; i < h; i++) {


        for (var j = 0; j < w; j++) {
            grid[i][j] = new node(i, j);
            //is bee !
            if (Math.random(1) < val2) {
                grid[i][j].bee = true;
                grid[i][j].color_node = [255, 255, 255];
                countbee++;
            }

        }

    }


    for (var i = 0; i < h; i++) {


        for (var j = 0; j < w; j++) {

            for (var k = 0; k < 8; k++) {

                var new_i = grid[i][j].i + dx[k];
                var new_j = grid[i][j].j + dy[k];

                if (valid(new_i, new_j) && grid[new_i][new_j].bee) {
                    grid[i][j].neighbors++;

                }

            }

        }

    }


    ///
    slider = createSlider(-150, -40, -100, 1);
    slider.position(0, height - rectvalue);
    val = -1 * slider.value();
    slider1 = createSlider(0.05, 0.5, 0.1, 0.01);
    slider1.position(slider.width + 5, height - rectvalue);
    val2 = slider1.value();

    P1 = createP("Grid Size");
    P2 = createP("Hardness");
    P1.position(0, height - rectvalue);
    P2.position(slider.width + 5, height - rectvalue);
}


var GameOver = false;

function draw() {

    background(137, 201, 184);




    while (val != -1 * slider.value() || val2 != slider1.value()) {
        val = -1 * slider.value();
        rectvalue = val;
        slider.position(0, height - rectvalue);
        slider1.position(slider.width + 5, height - rectvalue);
        P1.position(0, height - rectvalue);
        P2.position(slider.width + 5, height - rectvalue);
        val2 = slider1.value();

        resizeX();


    }




    for (var i = 0; i < h; i++) {


        for (var j = 0; j < w; j++) {

            if (GameOver && grid[i][j].bee) grid[i][j].hide = false;
            else if (point_mouse_y != -1 && point_mouse_x != -1 && (grid[i][j].i * rectvalue) <= point_mouse_y && (grid[i][j].j * rectvalue) <= point_mouse_x && point_mouse_x <= (w * rectvalue) && point_mouse_y <= (h * rectvalue)) {

                save_i = i, save_j = j;
            }
            grid[i][j].show();

        }

    }

    if (save_j != -1 && !GameOver) {


        if (grid[save_i][save_j].bee) GameOver = true;
        else {
            if (grid[save_i][save_j].neighbors == 0 && grid[save_i][save_j].hide) {
                FloodFill(save_i, save_j);
            } else if (grid[save_i][save_j].hide)
                grid[save_i][save_j].hide = false, countcell++;

            save_j = save_i = -1;
            point_mouse_y = point_mouse_x = -1;
        }

    }




    if (GameOver) {
        fill(255, 0, 0);
        textSize(50);
        text("Game Over :(", (w / 2 * rectvalue), h / 2 * rectvalue);
    }




    if ((countcell + countbee) == (grid.length * grid[0].length)) {

        textSize(50);
        fill(232, 74, 95);
        text("Happy Birthday Joseph ! 🎂🎊🎉❤️ ", (w / 4 * rectvalue), h / 4 * rectvalue);

    }



}




class node {

    constructor(i, j) {

        this.i = i;
        this.j = j;
        this.bee = false;
        this.neighbors = 0;
        this.hide = true;
        this.color_node = [200, 200, 200];



    }
    show() {


        if (this.bee && !this.hide) {

            fill(this.color_node[0], this.color_node[1], this.color_node[2]);
            strokeWeight(0.5);
            rect(this.j * rectvalue, this.i * rectvalue, rectvalue, rectvalue);
            image(img, this.j * rectvalue + rectvalue / 4, this.i * rectvalue + rectvalue / 4, rectvalue / 2, rectvalue / 2);

        } else if (!this.hide) {

            fill(this.color_node[0], this.color_node[1], this.color_node[2]);
            strokeWeight(0.5);

            rect(this.j * rectvalue, this.i * rectvalue, rectvalue, rectvalue);
            if (this.neighbors > 0) {

                fill(47, 37, 25);

                textSize(rectvalue / 3.5);
                text(this.neighbors, this.j * rectvalue + rectvalue / 2, this.i * rectvalue + rectvalue / 2);
            }

        } else {

            fill(255, 255, 255);
            strokeWeight(0.5);
            rect(this.j * rectvalue, this.i * rectvalue, rectvalue, rectvalue);


        }


    }


}


function valid(x, y) {

    return x >= 0 && y >= 0 && x < h && y < w;
}


function mousePressed() {

    point_mouse_x = mouseX;
    point_mouse_y = mouseY;

}


function FloodFill(i, j) {

    for (var k = 0; k < 8; k++) {

        var new_i = grid[i][j].i + dx[k];
        var new_j = grid[i][j].j + dy[k];

        if (valid(new_i, new_j)) {

            if (!grid[new_i][new_j].bee && grid[new_i][new_j].hide) {
                grid[new_i][new_j].hide = false;
                grid[new_i][new_j].color_node[2] = grid[i][j].color_node[2] + 0.4;
                grid[new_i][new_j].color_node[1] = grid[i][j].color_node[1] + 5;
                countcell++;
                //grid[new_i][new_j].color_node[0] = grid[i][j].color_node[0] + 5;

                if (grid[new_i][new_j].neighbors == 0)
                    FloodFill(new_i, new_j);

            }
        }

    }




}


function resizeX() {

    GameOver = false;

    point_mouse_x = point_mouse_y = save_i = save_j = -1;
    countbee = countcell = 0;
    w = floor(width / (rectvalue)),
        h = floor(height / rectvalue);
    h--;
    w--;
    grid = new Array(h);

    for (var i = 0; i < h; i++) {
        grid[i] = new Array(w);

    }

    //generate grid
    for (var i = 0; i < h; i++) {


        for (var j = 0; j < w; j++) {
            grid[i][j] = new node(i, j);
            //is bee !
            if (Math.random(1) < val2) {
                grid[i][j].bee = true;
                grid[i][j].color_node = [255, 255, 255];
                countbee++;
            }

        }

    }


    for (var i = 0; i < h; i++) {


        for (var j = 0; j < w; j++) {

            for (var k = 0; k < 8; k++) {

                var new_i = grid[i][j].i + dx[k];
                var new_j = grid[i][j].j + dy[k];

                if (valid(new_i, new_j) && grid[new_i][new_j].bee) {
                    grid[i][j].neighbors++;

                }

            }

        }

    }




}