var balloonImg2, balloonImg1, balloon;
var database, height;

function preload(){
bg = loadImage("img/background.png");
  balloonImg1 = loadAnimation("img/b1.png");
  balloonImg2 = loadAnimation("img/b1.png", "img/b1.png", "img/b1.png", "img/b2.png",  "img/b2.png",  "img/b2.png",  "img/B3.png", "img/B3.png", "img/B3.png");
  

}

function setup() {
  createCanvas(1500,700);
  database = firebase.database();

  balloon = createSprite(250, 650, 150, 150);
  balloon.addAnimation(balloonImg1);
  balloon.scale = 0.5;

  var balloonHeight = database.ref('balloon/height');
  balloonHeight.on("value", readHeight, showError);


}

function draw() {
  background(bg); 
  
  if(keyDown(LEFT_ARROW))
{  
     updateHeight(-10, 0);
     balloon.addAnimation(balloonImg2);
}

else if(keyDown(RIGHT_ARROW))
{  
     updateHeight(10, 0);
     balloon.addAnimation(balloonImg2);
}

if(keyDown(UP_ARROW))
{  
     updateHeight(0, -10);
     balloon.addAnimation(balloonImg2);
     balloon.scale = balloon.scale-0.005;
}

if(keyDown(DOWN_ARROW))
{  
     updateHeight(0, 10);
     balloon.addAnimation(balloonImg2);
     balloon.scale = balloon.scale + 0.005;
    }

fill("blue");
stroke("pink");
textSize(25);
text("Use arrow keys to move hot arrow balloon", 40, 40);


  drawSprites();
}

function updateHeight(x,y){

  database.ref('balloon/height').set({
  'x': height.x + x, 
  'y': height.y + y

  })

}

function readHeight(data){
  height=  data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("error into database");
}