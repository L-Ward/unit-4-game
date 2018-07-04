$(document).ready(function () {
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
        enemies: [true, true, true, true],
        defenderArr: [],
        enemiesArr: [],
        isPlayerCharacterChosen: false,
        isDefenderChosen: false,
        enemiesRemaining: 3,
        gameOver: false
    }

    selectionMenuBuilder(game.characters, "Pick your hero");


    //functions
    //data reset function
    function dataReset() {
        game.playerCharacter = "";
        game.defender = "";
        game.enemies = [true, true, true, true];
        game.defenderArr = [];
        game.enemiesArr = [];
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
    }

    //BUILDERS -- Screen Builders
    //selection screen builder
    function selectionMenuBuilder(charArray, title) {
        //creating and appendign element div for hero selection screen
        var heroPopUp = $(document.createElement("div")).addClass("container pop-up");
        $("body").append(heroPopUp);
        //creating and appending title for heroPopUp screen
        var heroHeading = $(document.createElement("div")).addClass("row justify-content-center");
        var heading = $(document.createElement("h1")).addClass("col-xs-12 header-text").text(title);
        $(heroPopUp).append(heroHeading);
        $(heroHeading).append(heading);
        //creating and appending row for buttons
        var heroBody = $(document.createElement("div")).addClass("row justify-content-center");
        $(heroPopUp).append(heroBody);

        //looping through characters to create buttons for hero selection screen
        charArray.forEach(function (character) {
            var btnDiv = $(document.createElement("div")).addClass("col-xs-6 col-md-3 text-center");
            $(btnDiv).append(charBtnBuilder(character));
            $(heroBody).append(btnDiv);
        });
        $(".btn-character").on("click", charBtnHandler);
    }

    //game screen builder after all selections are made
    function gameScreenBuilder() {

    }
    
    //BUILDERS -- Element builders
    //button builder function
    function charBtnBuilder(character) {
        //creating elements for buttons
        var heroBtn = $(document.createElement("btn")).addClass("btn btn-character btn-" + character.id).attr("value", character.id);
        var nameDiv = $(document.createElement("div")).addClass("name").text(character.name);
        var healthDiv = $(document.createElement("div")).addClass("health-" + character.id).text(character.health);
        //appending elements
        $(heroBtn).append(nameDiv, character.img(), healthDiv);
        return heroBtn;
    }

    //versus row builder function
    function versusRowBuilder() {
        var vsRow = $(document.createElement("div")).addClass("row justify-content-center");
        var vsPlayerCol = $(document.createElement("div")).addClass("col");
        var vsBtnCol = $(document.createElement("div")).addClass("col");
        var vsDefenderCol = $(document.createElement("div")).addClass("col");
        var playerHeader = $(document.createElement("h3").addClass("display-text"));
        var playerBody = charBtnBuilder(game.characters[game.playerCharacter]);

    }

    //combat log builder
    function combatLogRowBuilder() {

    }

    //enemies row builder
    function enemiesRowBuilder() {

    }

    //HANDLERS
    //character handler to move characters after selection process
    function charBtnHandler() {
        //choosing character
        if (game.isPlayerCharacterChosen === false) {
            game.isPlayerCharacterChosen = true;
            game.playerCharacter = $(this).attr("value");
            game.enemies[game.playerCharacter] = false;
            //pushing leftover characters to potential defenderArr
            game.characters.forEach(function (character) {
                if (game.enemies[character.id] === true) {
                    game.defenderArr.push(character);
                }
            });
            empty();
            selectionMenuBuilder(game.defenderArr, "Pick your sparring partner");
        } else if (game.isDefenderChosen === false && game.enemiesRemaining > 0) {
            //chosing defender
            game.isDefenderChosen = true;
            game.defender = $(this).attr("value");
            game.enemies[game.defender] = false;
            //pushing leftover characters to enemiesArr
            game.characters.forEach(function (character) {
                if (game.enemies[character.id] === true) {
                    game.enemiesArr.push(character)
                }
            });
            empty();
        }
    }

    //RANDOM
    function empty() {
        $("body").empty();
    }

});