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
            health: 100,
            attack: 5
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
    enemies: [],
    defender: "",
    isPlayerCharacterChosen: false,
    isDefenderChosen: false
}

//intialize the game
function initializeGame() {
    game.playerCharacter = "";
    game.enemies = [];
    game.defender = "";
    game.isPlayerCharacterChosen = "false";
    game.isDefenderChosen = "false"
    makeButtons();
    chooseCharacter();
}

//Assign characters to buttons
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

//choose a player character
$(".btn-character").on("click", function () {
    if (game.isPlayerCharacterChosen === false) {
        game.isPlayerCharacterChosen = true;
        game.playerCharacter = $(this).val();
        console.log(game.playerCharacter);
        console.log(game.isPlayerCharacterChosen);
        var chosenChar = $(this).detach();
        chosenChar.appendTo(".selectedCharacter");
        setEnemies();
    } else if (game.isDefenderChosen === false) {
        game.isDefenderChosen = true;
        game.defender = $(this).val();
        console.log(game.defender);
        console.log(game.isDefenderChosen);
        var chosenDefender = $(this).detach();
        chosenDefender.appendTo(".defender");
    }
});

//Functions:
//create enemies list with unchosen characters
function setEnemies () {
    if (game.isPlayerCharacterChosen === true && game.isDefenderChosen === false) {
        var enemies = $(".characterMenu").children().detach();
        enemies.appendTo(".enemies")
    }
}

$(".btn-attack").on("click", attack);

//Making stuff attack each other
function attack () {
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
    //subtract defender attack from player health
    game.characters[game["playerCharacter"]].health = playerHealth - defenderAttack;
    console.log(game.characters[game["playerCharacter"]].health);
    //push currentPlayerHealth to object and display on button
    $(".health" + game.playerCharacter).text(game.characters[game["playerCharacter"]].health);
}

