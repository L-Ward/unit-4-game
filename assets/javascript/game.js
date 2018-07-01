//Variables
var game = {
    characters: [
        {
            name: "Leonardo",
            id: 0,
            img: function () {
                var img = new Image(140, 109);
                img.src = "assets/images/Leonardo.png";
                return img;
            },
            health: 300,
            attack: 25
        },
        {
            name: "Raphael",
            id: 1,
            img: function () {
                var img = new Image(140, 109);
                img.src = "assets/images/Raphael.png";
                return img;
            },
            health: 100,
            attack: 5
        },
        {
            name: "Donatello",
            id: 2,
            img: function () {
                var img = new Image(140, 109);
                img.src = "assets/images/Donatello.png";
                return img;
            },
            health: 100,
            attack: 5
        },
        {
            name: "Michaelangelo",
            id: 3,
            img: function () {
                var img = new Image(140, 109);
                img.src = "assets/images/Michaelangelo.png";
                return img;
            },
            health: 100,
            attack: 5
        }
    ],
    playerCharacter: "",
    defender: "",
    isPlayerCharacterChosen: false,
    isDefenderChosen: false,
    enemiesRemaining: 3,
    gameOver: false
}

//Start game on first button click
initializeGame();
//call attack function on click of attack button
$(".btn-attack").on("click", attack);
//call intialize function on click of restart button
$(".btn-restart").on("click", initializeGame);

//Functions:
//intialize the game
function initializeGame() {
    game.playerCharacter = "";
    game.enemies = [];
    game.defender = "";
    game.isPlayerCharacterChosen = false;
    game.isDefenderChosen = false;
    game.enemiesRemaining = 3;
    game.gameOver = false;
    game.characters[0].health = 300
    game.characters[1].health = 100
    game.characters[2].health = 100
    game.characters[3].health = 100
    $(".statusDisplayText").text("");
    clearButtons();
    makeButtons();
    //choose a player character and defender
    $(".btn-character").on("click", selections);
}

//Clear all buttons for repopulation in character selection div
function clearButtons() {
    $(".characterMenu").empty();
    $(".selectedCharacter").empty();
    $(".enemies").empty();
    $(".defender").empty();
}

//Assign characters to buttons
function makeButtons() {
    var charMenu = $(".characterMenu")
    //loop through characters array to create buttons
    game.characters.forEach(function (character) {
        var button = document.createElement("button");
        $(button).addClass("btn btn-character btn-" + character.id);
        $(button).attr("value", character.id);
        $(button).append("<span class='name'>" + character.name + "</span>")
        $(button).append(character.img())
        var healthID = "health" + character.id;
        $(button).append("<span class= '" + healthID + "'>" + character.health + "</span>");
        charMenu.append(button);
    });
}

function selections() {
    if (game.isPlayerCharacterChosen === false) {
        game.isPlayerCharacterChosen = true;
        game.playerCharacter = $(this).val();
        var chosenChar = $(this).detach();
        chosenChar.appendTo(".selectedCharacter");
        setEnemies();
    } else if (game.isDefenderChosen === false && game.enemiesRemaining > 0) {
        game.isDefenderChosen = true;
        game.defender = $(this).val();
        var chosenDefender = $(this).detach();
        chosenDefender.appendTo(".defender");
        $(".statusDisplayText").text("");
    }
}

//create enemies list with unchosen characters
function setEnemies() {
    if (game.isPlayerCharacterChosen === true && game.isDefenderChosen === false) {
        var enemies = $(".characterMenu").children().detach();
        enemies.appendTo(".enemies")
    }
}

//Making stuff attacks each other
function attack() {
    if (game.isPlayerCharacterChosen && game.isDefenderChosen && game.gameOver === false) {
        var defenderObj = game.characters[game["defender"]];
        var defenderHealth = defenderObj.health;
        var defenderAttack = defenderObj.attack;
        var playerObj = game.characters[game["playerCharacter"]];
        var playerHealth = playerObj.health;
        var playerAttack = playerObj.attack;

        //subtract player attack from defender health
        game.characters[game["defender"]].health = defenderHealth - playerAttack;
        console.log(game.characters[game["defender"]].health);
        //push currentDefenderHealth to object and display on button
        $(".health" + game.defender).text(game.characters[game["defender"]].health);
        //Display player attack damage in status display


        //subtract defender attack from player health
        game.characters[game["playerCharacter"]].health = playerHealth - defenderAttack;
        //push currentPlayerHealth to object and display on button
        $(".health" + game.playerCharacter).text(game.characters[game["playerCharacter"]].health);
        //Display defender attack damage in status display 

        nextDefender();
        winCondition();
    }
}

//Pick next defender
function nextDefender() {
    var defenderObj = game.characters[game["defender"]];
    var defenderHealth = defenderObj.health;
    var defenderID = defenderObj.id;

    if (defenderHealth <= 0 && game.gameOver === false) {
        game.isDefenderChosen = false;
        $(".btn-" + defenderID).remove();
        $(".statusDisplayText").text("Select the next defender.");
        game.enemiesRemaining--;
    }
}

//win codition
function winCondition() {
    if (game.enemiesRemaining === 0 && game.characters[game["playerCharacter"]].health > 0) {
        $(".statusDisplayText").text("YOU WON!!!! Game Over");
    } else if (game.characters[game["playerCharacter"]].health <= 0) {
        game.gameOver = true;
        $(".statusDisplayText").text("YOU LOST!!!! Game Over");
    }
}