//Create variables here
var dog, happyDog, database, foodS, foodStock;

function preload()
{
  happyDog=loadImage("images/dogImg1.png");
  dogImg= loadImage("images/dogImg.png");
	//load images here
}

function setup() {
  createCanvas(600, 600);
  database= firebase.database();

  dog= createSprite(300,400,10,10);
  dog.addImage(dogImg);
  dog.scale= 0.5;
  
  foodStock= database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog)
  }
  drawSprites();
  //add styles here
  fill("white");
  textSize(20);
  stroke("black");
  text("Press UP ARROW key to feed Pluto Milk",50,50);
  text("foodCount: "+foodS,350,420);
}
 
function readStock(data){
foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}


