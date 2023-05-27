const modulePath = "modules/Fallout-Dice-Module/";
const imgPath = modulePath + "faces/";
const hit0 = imgPath + "0hits.png";
const hit1 = imgPath + "1hits.png";
const hit2 = imgPath + "2hits.png";
const effect = imgPath + "effect.png";

function rollD6 (diceNum){
    let results = [diceNum];

    //Prevent the server from freezing
    if (diceNum > 100)
        diceNum = 100;
    //Validate for positive integer
    if (diceNum < 1)
        diceNum = 1;

    //Roll desired number of d6s
    for (i = 0; i<diceNum; i++){
        switch (Math.ceil(Math.random() * 6)){
            case 1:
                results[i] = "<img src=\""+ hit1 +"\" style=\"height:50px;\">";
                break;
            case 2:
                results[i] = "<img src=\""+ hit2 +"\" style=\"height:50px;\">";
                break;
            case 5, 6:
                results[i] = "<img src=\""+ effect +"\" style=\"height:50px;\">";
                break;
            default:
                results[i] = "<img src=\""+ hit0 +"\" style=\"height:50px;\">";
        }
    }

    ChatMessage.create({
        "content": results,
        "speaker": {
            "alias": game.user.name
        }
    }).then()
  }

//Bad way to go about this but I want fast not good
Hooks.on("renderChatLog", function() {
    console.log("Is this doing anything???");
    document.getElementById("chat").innerHTML += "<div id=\"fallout-dice\" class=\"flexrow\" style =\"flex: 0 0 56px;\">"
    +"<input type=\"number\" value = 1 id=\"diceNum\" style=\"align-self: center; height: 50px; margin: 0 6px 6px;"
    +"background: #f0f0e0;\"><button id=\"fo-btn\" style=\"display: contents;\"><img src=\""+ effect +"\" style=\"height:"
    +"50px;\"></button></div>";

    document.getElementById("fo-btn").addEventListener("click", function(){
        n = document.getElementById("diceNum").value;
        document.getElementById("diceNum").value = 1;
        rollD6(n); 
    });
  });