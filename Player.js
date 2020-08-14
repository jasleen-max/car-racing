class Player {
  constructor(){
   //Each player will have these properties
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = null;
  }
 //update value from database to variable
  getCount(){
    //address of player count of database is stored 
    //in the variable playercountref
    var playerCountRef = database.ref('playerCount');
    //on is the securityguard sitting on playercount node in database 
    //and click a pic if the value changed
    //val() converts the pic to value/data
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }
//value of count will come from Form class depending 
//on how many form is filled
//this will update the playercount value from Form.js to database
  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }
 //this.name & this.distanve are the value received for different players from Form.js
 //this function updates this information in the database
  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance
    });
  }
//in the playersnode of database there are 4 subnodes player1,player2,player3,player4
//player1 to player4 has 2 subnodes, name & distance
//so the val() will create a json value like below
//{{player1{name:chiku ,distance:1000}},{player1{name:chiku ,distance:1000}}
//{player1{name:chiku ,distance:1000}},{player1{name:chiku ,distance:1000}}}
//allPlayers is a variable where above json is stored 
//static means it will not be called by object it will be called on class 
//so all objects of the class will be included
static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
//
  getCarsAtEnd() {
    database.ref('CarsAtEnd').on("value",(data)=>{
      this.rank = data.val();
    })
  }

  static updateCarsAtEnd(rank) {
    database.ref('/').update({
      CarsAtEnd:rank
    })
  }
}
