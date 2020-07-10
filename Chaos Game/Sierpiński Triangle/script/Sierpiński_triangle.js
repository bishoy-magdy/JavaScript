let ax, ay, bx, by, cx, cy, rx, ry, slider_;


function setup() {
    createCanvas(900, 900);
    background(0);

    ax = width / 2;
    ay = 0;

    bx = 0;
    by = height;

    cx = height;
    cy = height;


    stroke(255, 255, 50);
    strokeWeight(20);

    point(ax, ay);
    point(bx, by);
    point(cx, cy);


    rx = random(width),
        ry = random(height);

    slider_ = createSlider(1, 500, 0.5, 0.5);
    let P = createP('Frame Rate');
    P.position(0, height);


}




function draw() {

    stroke(255, 255, 50);
    strokeWeight(1);


    for (let i = 0; i < slider_.value(); i++) {
        point(rx, ry);

        let r = floor(random(3));

        if (r == 0) {
            stroke(255, 0, 0);

            rx = (ax + rx) / 2;
            ry = (ay + ry) / 2;
        } else if (r == 1) {
            stroke(0, 255, 0);

            rx = (bx + rx) / 2;
            ry = (by + ry) / 2;
        } else {
            stroke(0, 0, 255);

            rx = (cx + rx) / 2;
            ry = (cy + ry) / 2;

        }




    }

}