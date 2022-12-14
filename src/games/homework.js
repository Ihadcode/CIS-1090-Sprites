//You might have some game state so you can keep track of
//what is happening:
let score = 20;  //The players score
let alive;  //is the 

var timer;

var remainingTime = 30;
const startTimer = () => {
    if (isStopped) {
      isStopped = false;
      countContainer.innerHTML = remainingTime;
      timer = setInterval(renderTime, 1000);
    }
  };
  const renderTime = () => {
    // decement time
    remainingTime -= 1;
    // render count on the screen
    countContainer.innerHTML = remainingTime;
  }


let speed = 200;  //In pixels per second

//This is a helper function to compute the distance
//between two sprites
function distance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

//This setup function is called once when the game starts
function setup(sprites) {
    score = 0;      //set score to zero
    alive = true;   //Set player to alive


    //Sprite "Images" are just characters,
    //But you can use emojis!
    // https://emojis.wiki/

    sprites[0].image = "⚪"; // Main player is a snowball
    sprites[0].x = 100;
    sprites[0].y = 100;

    //Putting two sprites together you
    //can make more complicated things.
    sprites[1].image = "☃️"; //A target you want to hit for points
    sprites[1].x = 300;
    sprites[1].y = 100;

    sprites[2].image = "🏂"; //A TARGET YOU WANT TO AVOID minus points.
    sprites[2].x = 460;
    sprites[2].y = 200;

    sprites [3].image ="🎄"// The tree will end the game. 
    sprites [3].x = 500;
    sprites [3].y =250;


}

//This function returns a random integer [0...max)

/**
 * This function is called every frame
 * @param sprites   Array of sprite objects
 * @param t         Seconds since start of game
 * @param dt        Seconds since last frame (A very small number)
 * @param up        Is up arrow pressed?
 * @param down      "
 * @param left      "
 * @param right     "
 * @param space     Is spacebar pressed?
 * @returns The current score
 */
function frame(sprites, t, dt, up, down, left, right, space) {
    //Keep references to the sprites in some variables with
    //better names:
    const Snowball = sprites[0]; //Easier to remember
    const SnowMan = sprites[1]; //Easier to remember
    const SnowBoarder = sprites[2]; //Easier to remember
    const tree = sprites[3]; 

    timer += dt;
    //To randomly move the sprits
    if (Math.random()> .99){
        sprites[1].x = Math.random() * 750;
        sprites[1].y = Math.random() * 450; 
        sprites[2].x = Math.random() * 750;
        sprites[2].y = Math.random() * 450; 
        sprites[3].x = Math.random() * 750;
        sprites[3].y = Math.random() * 450; 
    }



    //Move the snowball 
    if (up) {
        //Speed is in pixels per second, and
        //dt is the number of seconds that have
        //passed since the last frame.
        //
        //Multiply them together so that the
        //truck moves at the same speed if the
        //computer is fast or slow
        Snowball.y += speed * dt;
    } 
    if (down) {
        Snowball.y -= speed * dt;
    }
    if (right) {
        Snowball.x += speed * dt;
        //You can flipH a spright so it is facing
        //the other direction
        Snowball.flipH = true;
    }
    if (left) {
        Snowball.x -= speed * dt;
        Snowball.flipH = false;
    }
    //To check the position of the snowball. 
    if (Snowball.x<0){
        Snowball.x= 200 ;
        Snowball.y= 200;
    }


    if (Snowball.y<0){
        Snowball.x=20;
        Snowball.y=20;
    }
    if (Snowball.y>450){
        Snowball.x=250;
        Snowball.y=250;
    }

    if (Snowball.x>750){
        Snowball.x = 450;
        Snowball.y = 300;
    }
    
    //If the snowball is close to the snowman
    if ( distance(Snowball, SnowMan) < 15 ){
        score = score +10; 
          speed = speed + 50 ;
        SnowMan.x = Math.random;
        SnowMan.y = Math.random ;
          
    }

    if (distance (Snowball, SnowBoarder) < 15 ) {
        score = score -5; 
         speed = speed - 10;
        SnowBoarder.x = Math.random;
        SnowBoarder.y = Math.random;
         
    }
    
    if (distance (Snowball,tree) < 40){
       Snowball.image ="";

        alert ("game over"); 
    }

    //A very simple repeating animation
    sprites[2].y += Math.sin(t)/10;

    return score;
};

export default {
    name: "Homework",
    instructions: "Write your instructions here",
    icon: "📝", //Choose an emoji icon
    background: {
        //You can put CSS here to change your background
        "background-color": "#555"
    },
    frame,
    setup,
};