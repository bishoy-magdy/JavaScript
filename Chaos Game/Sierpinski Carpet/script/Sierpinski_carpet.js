//by bishoy magdy
//When the jump is 2/3 and the point can also jump towards the midpoints of the four sides,
//the chaos game generates the Sierpinski carpet:


let ax, ay, bx, by, cx, cy, dx, dy, ex, ey, fx, fy, gx, gy, hx, hy, rx, ry, slider_;

let ratio = 2 / 3;

function setup() {
    createCanvas(900, 900);
    background(0);

    ax = 0;
    ay = 0;

    bx = width / 2;
    by = 0;

    cx = width;
    cy = 0;

    dx = 0;
    dy = height / 2;

    ex = 0;
    ey = height;

    fx = width / 2;
    fy = height;

    gx = width;
    gy = height;

    hx = width;
    hy = height / 2;




    stroke(255, 255, 50);
    strokeWeight(20);

    point(ax, ay);
    point(bx, by);
    point(cx, cy);
    point(dx, dy);
    point(ex, ey);
    point(fx, fy);
    point(gx, gy);
    point(hx, hy);


    rx = random(width);
    ry = random(height);

    slider_ = createSlider(1, 1000, 0.5, 0.5);
    let P = createP('Frame Rate');
    P.position(0, height);


}



function draw() {

    stroke(255, 255, 50);
    strokeWeight(1);


    for (let i = 0; i <= slider_.value(); i++) {

        let r = floor(random(8));

        if (r == 0) {
            stroke(95, 221, 229);


            rx = lerp(rx, ax, ratio);
            ry = lerp(ry, ay, ratio);

            point(rx, ry);


        } else if (r == 1) {
            stroke(243, 113, 33);

            rx = lerp(rx, bx, ratio);
            ry = lerp(ry, by, ratio);

            point(rx, ry);

        } else if (r == 2) {
            stroke(244, 234, 142);

            rx = lerp(rx, cx, ratio);
            ry = lerp(ry, cy, ratio);


            point(rx, ry);

        } else if (r == 3) {

            stroke(217, 32, 39);

            rx = lerp(rx, dx, ratio);
            ry = lerp(ry, dy, ratio);

            point(rx, ry);

        } else if (r == 4) {

            stroke(217, 120, 270);

            rx = lerp(rx, ex, ratio);
            ry = lerp(ry, ey, ratio);

            point(rx, ry);

        } else if (r == 5) {

            stroke(190, 80, 39);

            rx = lerp(rx, fx, ratio);
            ry = lerp(ry, fy, ratio);

            point(rx, ry);

        } else if (r == 6) {

            stroke(217, 255, 39);

            rx = lerp(rx, gx, ratio);
            ry = lerp(ry, gy, ratio);

            point(rx, ry);

        } else if (r == 7) {

            stroke(217, 32, 255);

            rx = lerp(rx, hx, ratio);
            ry = lerp(ry, hy, ratio);

            point(rx, ry);

        }


    }

}