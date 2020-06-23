class snake {

    constructor() {
        this.i = 0;
        this.j = 0;
        this.body = [];
        this.flag = 3;
        this.body.push(new cell(0, 0));

    }

    Rerange(X, Y) {

        this.X = X;
        this.Y = Y;
        for (let j = 1; j < this.body.length; j++) {
            this.XX = this.body[j].i;
            this.YY = this.body[j].j;
            Snake.body[j].i = this.X;
            Snake.body[j].j = this.Y;
            this.X = this.XX;
            this.Y = this.YY;
        }


    }

    print_snake() {
        strokeWeight((5));
        for (let j = 0; j < this.body.length; j++) {
            this.body[j].show(0, 255, 0);


        }

    }

    push_cell(CELL) {

        this.body.unshift(CELL);

    }

    check(CELL, type) {

        for (let j = type; j < this.body.length; j++) {

            if (CELL.i == this.body[j].i && CELL.j == this.body[j].j) {
                return false;
            }

        }

        return true;
    }

}




////////////////////////////////////
class cell {

    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.visited = false;

    }

    show(R, B, G) {
        this.x = this.i * w;
        this.y = this.j * w;
        stroke(R, B, G);
        noFill();
        rect(this.x, this.y, w, w);


    }

}