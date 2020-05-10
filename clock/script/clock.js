//////////////////////////////////////////////////////////////////////////////////////

/*NOTE------------------>>>the ratios that I mentioned it is  random ratios<<-------*/
/*NOTE------------------>>>the colors that I mentioned it is  random colors<<-------*/
/*
the main idea of the project make a clock change the idicatores with Rate theta for every second by using line in (p5 lib) (x1,y1)--------(x2,y2)
   ---------algorithm-------------

theta = 0;  // angle that will be increased each loop
Center_X =       // Center_X coordinate of circle center
Center_Y =       // Center_X coordinate of circle center
step =   // amount to add to theta each time (degrees)
r   =   // radias
repeat until theta >= 360;
    {
        x = Center_X + r*cos(theta)
      y = Center_X + r*sin(theta)
      draw a line to x,y
      add step to theta
    }
-- to clarify more visit --
https://www.mathopenref.com/coordcirclealgorithm.html
https://www.mathopenref.com/coordparamcircle.html

if you see any problem please tell me :)
 */

////////////////////////////////////////////////////////////////////////////////////

let S, M, H, animation, Center_X, Center_Y;
let Points_X = [], Points_Y = [];   //coordinate points of Clock
let Cheaker_Color = 0;
let X, Y, Refresh_X, Refresh_Y;
let image_;
let CS, LM, DM; //the class of color


///make class for every mode to more easly change

class Light_Mode {    //the class when the clock color in light mode

    constructor() {

        this.background = [244, 244, 244];
        this.Color_Indcator_S = [255, 100, 150];
        this.Color_Indcator_M = [150, 100, 255];
        this.Color_Indcator_H = [0, 153, 153];
        this.Transparency_S = this.background;
        this.Transparency_M = this.background;
        this.Transparency_H = this.background;
        this.text_color = [0, 0, 102];
        this.color_theta = this.background;
        this.text = "to show the angles change rate";
    }

}

class Dark_Mode {    //the class when the clock color in Dark mode

    constructor() {

        this.background = [0, 0, 0];
        this.Color_Indcator_S = [255, 100, 150];
        this.Color_Indcator_M = [150, 100, 255];
        this.Color_Indcator_H = [0, 153, 153];
        this.Transparency_S = this.Color_Indcator_S;
        this.Transparency_M = this.Color_Indcator_M;
        this.Transparency_H = this.Color_Indcator_H;
        this.text_color = [255, 255, 204];
        this.color_theta = [255, 255, 204];
        this.text = "to show Original Clock";
    }

}

class Color_System {  //the class when the clock in basic mode color
    constructor() {

        this.background = [244, 244, 244];
        this.Color_Indcator_S = [255, 100, 150];
        this.Color_Indcator_M = [150, 100, 255];
        this.Color_Indcator_H = [0, 153, 153];
        this.Transparency_S = [255, 255, 255];
        this.Transparency_M = [255, 255, 255];
        this.Transparency_H = [255, 255, 255];
        this.text_color = [0, 0, 102];
        this.color_theta = this.background;
        this.text = "to show the angles change rate";
    }
} //default Color

function setup() {

    X = windowWidth * (0.7); //determine the width with rate of 0.5*(window width)
    Y = windowHeight * (0.6);//determine the width with rate of 0.6*(window height)

    createCanvas(X, Y); //create canvas with X,Y

    Center_X = width / 2, Center_Y = height / 2;

    //diffrent (Indicators) from original point (0,0) three O`clock
    let dif_S = (second() - 15), dif_M = ((minute() - 15) * 60) + second(),
        dif_H = ((hour() - 15) * 60 * 60) + minute() * 60 + second();

    //make object  for (S,M,H) indicators and the animation to draw the points around indicatorst class(first second,diffrent from now,*angle increase rate*,radius)
    S = new Time_Maker_For_Every_Second(second(), dif_S, convert_degree_radian(60), min(Center_X, Center_Y) * (6 / 9));
    M = new Time_Maker_For_Every_Second(second(), dif_M, convert_degree_radian(3600), min(Center_X, Center_Y) * (5 / 9));
    H = new Time_Maker_For_Every_Second(second(), dif_H, convert_degree_radian(3600 * (12)), min(Center_X, Center_Y) * (4 / 9));
    animation = new Time_Maker_For_Every_Second(0, 0, convert_degree_radian(60), min(Center_X, Center_Y) * (7 / 9));

    //image in the canves
    image_ = createImg("images/clock.png", "clock_img");
    image_.position(0, height - min(width, height) * (1 / 4));
    image_.size(min(width, height) * 1 / 4, min(width, height) * 1 / 4);
    image_.mouseClicked(mousePressed_);


    //make the class with diffrent case color
    CS = new Color_System();
    LM = new Light_Mode();
    DM = new Dark_Mode();

}

function mousePressed_() {

    Cheaker_Color ^= 1;   //if 0->1 || 1->0
    CS = (Cheaker_Color == 0 ? LM : DM); //make the CS=(light mode || Dark mode)

}

function draw() {
    //updata the X, Y
    Refresh_X = windowWidth * (0.7);
    Refresh_Y = windowHeight * (0.6);

    if (X != Refresh_X || Y != Refresh_Y) {
        X = Refresh_X;
        Y = Refresh_Y;
        resizeCanvas(X, Y); //resize the canvas
        Center_X = width / 2;
        Center_Y = height / 2;
        //Reset the radious with diffrent width and height
        S.radious_ = min(Center_X, Center_Y) * (6 / 9);
        M.radious_ = min(Center_X, Center_Y) * (5 / 9);
        H.radious_ = min(Center_X, Center_Y) * (4 / 9);
        animation.radious_ = min(Center_X, Center_Y) * (7 / 9);
        animation.go_again(0, convert_degree_radian(60)); //draw the points around indicator again
        Points_X = []; //clear the array
        Points_Y = [];
        //reposition
        image_.position(0, height - min(width, height) * (1 / 4));
        image_.size(min(width, height) * 1 / 4, min(width, height) * 1 / 4);

    }

    background(CS.background[0], CS.background[1], CS.background[2]);

    textSize(min(width, height) * (2 / 60));
    textStyle(BOLD);
    fill(CS.text_color[0], CS.text_color[1], CS.text_color[2]);
    textAlign(CENTER);
    text("Click on the flower " + CS.text, Center_X, height * 0.03);

    strokeWeight(min(width, height) * (1 / 75));

    stroke(LM.background[0], LM.background[1], LM.background[2]);  //star indicator animation
    strokeWeight(min(width, height) * (1 / 150));
    line(Center_X, Center_Y, animation.X, animation.Y);
    //update and increase the theta at a Special Rate (S,M,H)
    S.go(second(), convert_degree_radian(60)); //60 for every second
    M.go(second(), convert_degree_radian(3600));//60*60 for every minuter
    H.go(second(), convert_degree_radian(3600 * 12)); //60*60*12 fo every hour

    //Recycle the value of theta for each of (S,M,H) -> when the indicators Make **Full_Circle**
    if (convert_radian_degree(S.theta) >= 360) {
        dif_S = (second() - 15);
        S.go_again(dif_S, convert_degree_radian(60));

    }
    if (convert_radian_degree(M.theta) >= 360) {
        dif_M = ((minute() - 15) * 60) + second();
        M.go_again(dif_M, convert_degree_radian(3600));

    }
    if (convert_radian_degree(H.theta) >= 360) {
        dif_H = ((hour() - 15) * 60 * 60) + minute() * 60 + second();
        H.go_again(dif_H, convert_degree_radian(3600 * 12));

    }
    //---------------------------------------------------------------------------------------------------//
    //Digital Clock
    textSize(min(width, height) * (2 / 45));
    textStyle(BOLD);
    fill(CS.text_color[0], CS.text_color[1], CS.text_color[2]);
    textAlign(LEFT);
    strokeWeight(0);
    text((hour() % 12 != 0 ? hour() % 12 : 12) + ':' + minute() + ':' + second() + '  ' + (hour() < 12 ? "AM" : "PM"), Center_X - min(Center_X, Center_Y) * (6 / 9), Center_Y);


    //---------------------------------------------------------------------------------------------//

    stroke(CS.Color_Indcator_S[0], CS.Color_Indcator_S[1], CS.Color_Indcator_S[2]);

    if (Cheaker_Color) {
        fill(CS.Transparency_S[0], CS.Transparency_S[1], CS.Transparency_S[2], 100);
        strokeWeight(min(width, height) * (1 / 90));
        arc(Center_X, Center_Y, min(width, height) * (5 / 12), min(width, height) * (5 / 12), 0, S.theta);
    }
    strokeWeight(min(width, height) * (1 / 90));
    line(Center_X, Center_Y, S.X, S.Y); //Second indicator


    stroke(CS.Color_Indcator_M[0], CS.Color_Indcator_M[1], CS.Color_Indcator_M[2]);

    if (Cheaker_Color) {

        fill(CS.Transparency_M[0], CS.Transparency_M[1], CS.Transparency_M[2], 100);
        strokeWeight(min(width, height) * (1 / 90));
        arc(Center_X, Center_Y, min(width, height) * (1 / 4), min(width, height) * (1 / 4), 0, M.theta);
    }
    strokeWeight(min(width, height) * (1 / 90));
    line(Center_X, Center_Y, M.X, M.Y);// Minute indicator


    stroke(CS.Color_Indcator_H[0], CS.Color_Indcator_H[1], CS.Color_Indcator_H[2]);

    if (Cheaker_Color) {

        fill(CS.Transparency_H[0], CS.Transparency_H[1], CS.Transparency_H[2], 100);
        strokeWeight(min(width, height) * (1 / 90));
        arc(Center_X, Center_Y, min(width, height) * (1 / 10), min(width, height) * (1 / 10), 0, H.theta);
    }
    strokeWeight(min(width, height) * (1 / 90));
    line(Center_X, Center_Y, H.X, H.Y);//Hour indicator

    //print the points around indicator
    for (let U = 1; U <= Points_X.length; U++) {
        stroke(178, 102, 255);
        strokeWeight(min(width, height) * (1 / 60));
        // for every 5 the hour point
        if ((U) % 5 == 0) {

            strokeWeight(min(width, height) * (2 / 45));
            stroke(255, 100, 150);
            point(Points_X[U - 1], Points_Y[U - 1]);

            strokeWeight(0);
            textSize(min(Center_X, Center_Y) * (3 / 50));
            textAlign(CENTER, CENTER);
            fill(CS.text_color[0], CS.text_color[1], CS.text_color[2]);
            text((3 + U / 5) % 12 == 0 ? 12 : (3 + U / 5) % 12, Points_X[U - 1], Points_Y[U - 1]);  //Value: (3 <- star + ***number Repition***)
            continue;
        }

        point(Points_X[U - 1], Points_Y[U - 1]);

    }
    //check draw all the points
    if (Points_X.length <= 59) {
        animation.go(millis(), convert_degree_radian(60));
        Points_X.push(animation.X), Points_Y.push(animation.Y);

    }
    strokeWeight(0);
    fill(CS.color_theta[0], CS.color_theta[1], CS.color_theta[2]);

    //print thera with round two digit
    let θ_S = (complementary(convert_radian_degree(S.theta))).toFixed(2);
    let θ_M = (complementary(convert_radian_degree(M.theta))).toFixed(2);
    let θ_H = (complementary(convert_radian_degree(H.theta))).toFixed(2);
    text('[S,M,H] θ  : ' + θ_S + '° ' + θ_M + '° ' + θ_H + '°', Center_X, height * (670 / 700));


}

//main class
class Time_Maker_For_Every_Second {
    //(second_ <-- to store the Current Second , diffrent (S || M || H) from current second ,Rate angle (S || M || H), (radious size of  indicators )|| (circle:animation object))
    constructor(second_, diffrent_from_now, increase_angle, radious_) {
        this.X = 0;
        this.Y = 0;
        this.theta = 0;
        this.last_s = second_;
        this.radious_ = radious_;
        this.increase_angle = increase_angle;
        this.loop = abs(diffrent_from_now);
        this.dif = diffrent_from_now;
        while (this.loop--) {

            if (this.dif < 0) {
                this.theta -= this.increase_angle;
            } else {
                this.theta += this.increase_angle;
            }


        }
        this.X = Center_X + this.radious_ * cos(this.theta);
        this.Y = Center_Y + this.radious_ * sin(this.theta);


    }


    go(second_, increase_angle) {  //the flag when pre_second!=second increse the theta

        if (this.last_s != second_)
            this.theta += increase_angle , this.last_s = second_;

        this.X = Center_X + this.radious_ * cos(this.theta);
        this.Y = Center_Y + this.radious_ * sin(this.theta);


    }

    //Full_circle
    go_again(diffrent_from_now, increase_angle) {
        this.theta = 0;
        this.loop = abs(diffrent_from_now);
        this.dif = diffrent_from_now;
        while (this.loop--) {

            if (this.dif < 0) {
                this.theta -= increase_angle;
            } else {
                this.theta += increase_angle;
            }


        }


    }
}

function convert_degree_radian(X) {
    //(360/X) because division all X point in the Circle && convert
    return (360 / X) * (Math.PI / 180);

}

function convert_radian_degree(x) {
    return x * (180 / Math.PI);
}


function complementary(X) {
    return (X <= 0 ? 360 + X % 360 : X % 360);
}

//Done :)