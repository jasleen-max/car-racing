class Game {
  constructor(){

  }
 //to read gameState value from db to variable
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }
//update the gameState value from based on form.js to db
  update(state){
    database.ref('/').update({
      gameState: state
    });
  }
//before all 4 players login,so gameState 0
  async start(){
    if(gameState === 0){
      //creating new player object
      player = new Player();
//to update the change from computer to database will take a little time so 
//await till it is updated in DB so the function is asynchronous..
//in synchronous computer keeps on reading doesnt wait any instructions to be executed
      var playerCountRef = await database.ref('playerCount').once("value");
     // if the playerCount value(not the address it is the value as .once() returns pic if any change) changes
      if(playerCountRef.exists()){
       //from pic to value
        playerCount = playerCountRef.val();
        //update the value from database to variable playerCount
        player.getCount();
      }
      //new Form object to be created for log in of new player
      form = new Form()
      form.display();
   //if gameState 0 ends here
    }
//Before gameState play will start ,all the cars will be visible now so addIamage
    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }
//now gameState is 1 the race starts
  play(){
    //no form will be visible
    form.hide();
    //player will get the information from db and store it in a variable  named "allplayers" in json form
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    //when there is value inside allplayers
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      //animation to track,displayHeight is screen height and so on
      //track width is same as the displayWidth & tracklength 5 times screen length
     image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the cars array to get each car
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;
//to access player1,player2,player3,player4 index inside allplayers variable
      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
       //position of car1 car2 car3 car4
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)

       //if 1===1,player1 is in index1,to choose the right player,as each player
       //is responsible for their respective car
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
         //focusing on your car
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
//changing distance
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
//giving rank
    if(player.distance > 3860){
      gameState = 2;
      player.rank +=1
      Player.updateCarsAtEnd(player.rank)
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
