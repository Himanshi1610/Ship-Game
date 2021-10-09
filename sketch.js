var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterbg, shipimg, helicopterimg, bombimg;
var water, ship, helicopter, bomb, edges;
var waterSound, explosion, helicopterSound, bombDrop;
var helicopterGroup, bombGroup;
var score = 0;



function preload(){
  skybg = loadImage("images/skybg.jpg");
  waterbg = loadImage("images/waterbg.png");
  shipimg = loadImage("images/ship.png");
  helicopterimg = loadImage("images/helicopter.png");
  bombimg = loadImage("images/bomb.png");
  gameOverimg = loadImage("images/gameOver.png");
  restartImg = loadImage("images/restart.png");

}

function setup() {
  createCanvas(800, 450);
  
  //creating water ground
  water = createSprite(400,350);
  water.addImage(waterbg);
 
  //creating ship
  ship = createSprite(400,280);
  ship.addImage("ship",shipimg);
  ship.scale = 0.6;

  restart = createSprite(400,350);
  restart.addImage(restartImg);
  restart.scale = 0.1;
  
  //creating helicopter group
  helicopterGroup = new Group();

  //creating bomb group
  bombGroup = new Group();

  // ship.debug = "true";
  edges = createEdgeSprites();

}

function draw() {
  background(skybg);
  fill("yellow")
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);
  
    
  //gameState play
  if(gameState === PLAY){
    //increase score
    // score = score + Math.round(frameCount/300);
    score = score + Math.round(getFrameRate()/60);
    
    //moving water body
    water.velocityX=-6;
    
    
    //Call user defined function
    spawnHelicopter();
    spawnBomb();

    //moving the ship
    if(keyDown("left")){
      ship.x-=10;
    }
    if(keyDown("right")){
      ship.x+=10;
    }
    
    if(bombGroup.isTouching(ship)){
        gameState = END;
    }

    //Restart Image shouldn't be visible in play state
    restart.visible = false;

    
    ship.collide(edges);

  }
  
  //gameState end
  else if(gameState === END){
    ship.x = 400;
    ship.addImage("ship",gameOverimg)
    restart.visible = true;

   //water velocity becomes zero 
   water.velocityX=0;

   //destroy Helicopter group
   helicopterGroup.destroyEach();

   //destroy bomb group
   bombGroup.destroyEach();


  
    if(mousePressedOver(restart)){
      gameState = PLAY;
      ship.addImage("ship",shipimg);
      score = 0;

      
    }
    
  }
  
 
 //for infinite background 
 if(water.x < 300){
    water.x = 400;
    }
    
  
  drawSprites();
}


function spawnHelicopter(){
  if(frameCount%200 === 0){
    helicopter = createSprite(800,80,200,50);
    helicopter.addImage("helicopter",helicopterimg);
    helicopter.setVelocity(-5,0);

    //adding lifetime
    helicopter.lifetime = 800/5;
    
    helicopter.scale = 0.5;
    
    helicopterGroup.add(helicopter);

  }
}

function spawnBomb(){
 // create bombs at random position
 //use Math.random
 if(frameCount%300 == 0){
  bomb = createSprite(random(800,80),80,200,50);
  bomb.addImage(bombimg);
  bomb.setVelocity(0,5);

  bomb.lifetime = 800/5;
  
  bomb.scale = 0.1;
  
  bombGroup.add(bomb);
 }
}




