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



//Assign characters to buttons
var charMenu = $(".characterMenu")
//loop through characters array to create buttons
game.characters.forEach(function (character) {
    var button = document.createElement("button");
    $(button).addClass("btn btn-character btn-" + character.id);
    $(button).attr("value", character.id);
    $(button).text(character.name).append(character.img()).append(character.health);
    charMenu.append(button);
})

//intialize the game
function initializeGame() {
    game.playerCharacter = "";
    game.enemies = [];
    game.defender = "";
    game.isPlayerCharacterChosen = "false";
    game.isDefenderChosen = "false"
}

//choose a player character
$(".btn-character").on("click", function () {
    if (game.isPlayerCharacterChosen === false) {
        game.isPlayerCharacterChosen = true;
        game.playerCharacter = $(this).val();
        console.log(game.playerCharacter);
        console.log(game.isPlayerCharacterChosen);
        var chosenChar = $(this).detach();
        chosenChar.appendTo(".selectedCharacter");
    }
})

