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
            health: 150,
            attack: 0,
            attackPower: function () {
                this.attack += 4;
                return this.attack;
            },
            counterAttack: 8
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
            attack: 0,
            attackPower: function () {
                this.attack += 6;
                return this.attack;
            },
            counterAttack: 12
        },
        {
            name: "Donatello",
            id: 2,
            img: function () {
                var img = new Image(140, 109);
                img.src = "assets/images/Donatello.png";
                return img;
            },
            health: 180,
            attack: 0,
            attackPower: function () {
                this.attack += 3;
                return this.attack;
            },
            counterAttack: 6
        },
        {
            name: "Michaelangelo",
            id: 3,
            img: function () {
                var img = new Image(140, 109);
                img.src = "assets/images/Michaelangelo.png";
                return img;
            },
            health: 125,
            attack: 0,
            attackPower: function () {
                this.attack += 5;
                return this.attack;
            },
            counterAttack: 10
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
    game.characters[0].health = 150;
    game.characters[1].health = 100;
    game.characters[2].health = 180;
    game.characters[3].health = 125;    
    game.characters[0].attack = 0;
    game.characters[1].attack = 0;
    game.characters[2].attack = 0;
    game.characters[3].attack = 0;
    $(".statusDisplay").text("");
    $(".displayDamage").text("");
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
        // var div = document.createElement("div")
        // $(div).addClass("col-xs-6 col-md-3 div-" + character.id);
        // charMenu.append(div);
        var button = document.createElement("button");
        $(button).addClass("btn btn-character btn-" + character.id);
        $(button).attr("value", character.id);
        $(button).append("<div class='name'>" + character.name + "</div>")
        $(button).append(character.img())
        var healthID = "health" + character.id;
        $(button).append("<div class= '" + healthID + "'>" + character.health + "</div>");
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
        $(".statusDisplay").text("");
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
        var defenderAttack = defenderObj.counterAttack;
        var playerObj = game.characters[game["playerCharacter"]];
        var playerHealth = playerObj.health;
        var playerAttack = playerObj.attackPower();

        //subtract player attack from defender health
        game.characters[game["defender"]].health = defenderHealth - playerAttack;
        //push currentDefenderHealth to object and display on button
        $(".health" + game.defender).text(game.characters[game["defender"]].health);
        //subtract defender attack from player health
        game.characters[game["playerCharacter"]].health = playerHealth - defenderAttack;
        //push currentPlayerHealth to object and display on button
        $(".health" + game.playerCharacter).text(game.characters[game["playerCharacter"]].health);

        //Display damage done and damage take
        $(".displayDamage").html("You did " + playerAttack + " damage to " + defenderObj.name + ". <br>" + defenderObj.name + " did " + defenderAttack + " damage to you.");

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
        $(".statusDisplay").text("You have defeated " + defenderObj.name + ". Select the next defender.");
        $(".displayDamage").text("");
        game.enemiesRemaining--;
    }
}

//win codition
function winCondition() {
    if (game.enemiesRemaining === 0 && game.characters[game["playerCharacter"]].health > 0) {
        $(".statusDisplay").text("YOU WON!!!! Game Over");
        $(".displayDamage").text("");

    } else if (game.characters[game["playerCharacter"]].health <= 0) {
        game.gameOver = true;
        $(".statusDisplay").text("YOU LOST!!!! Game Over");
        $(".displayDamage").text("");

    }
}