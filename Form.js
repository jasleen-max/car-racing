class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.reset = createButton('Reset');
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
    this.title.html("Car Racing Game");
    this.title.position(displayWidth/2 - 50, 0);

    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 80);
    this.button.position(displayWidth/2 + 30, displayHeight/2);
    this.reset.position(displayWidth-100,20);

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      //player is the object,name is the property
      player.name = this.input.value();
      //playerCount is the variable
      playerCount+=1;
      //index is the property of player object
      player.index = playerCount;
      //update all the properties information inside the database
      player.update();
      //update the playercount inside database
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);
    });
    //when mouse is pressed on reset everything will be clear 
    //in the database
    this.reset.mousePressed(()=>{
      //playerCount in database is 0
      player.updateCount(0);
      //gameState in database is 0
      game.update(0);
    });

  }
}
