var friends = require("../data/friends");

module.exports = function(app) {
 
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);

   
    var user = req.body;

    for(var x = 0; x < user.scores.length; x++) {
      user.scores[x] = parseInt(user.scores[x]);
    }

    
    var bestFriendIndex = 0;
    var minimumDifference = 40;

   
    for(var x = 0; x < friends.length; x++) {
      var totalDifference = 0;
      for(var z = 0; z < friends[x].scores.length; z++) {
        var difference = Math.abs(user.scores[z] - friends[x].scores[z]);
        totalDifference += difference;
      }

      
      if(totalDifference < minimumDifference) {
        bestFriendIndex = x;
        minimumDifference = totalDifference;
      }
    }

    
    friends.push(user);

    
    res.json(friends[bestFriendIndex]);
  });
};