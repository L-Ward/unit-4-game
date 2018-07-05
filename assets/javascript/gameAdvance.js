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

    dataReset();

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
        empty();
        selectionMenuBuilder(game.characters, "Pick your hero");
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
        //create container div for bootstrap display
        var containerDiv = $(document.createElement("div")).addClass("container");
        //append container to body
        $("body").append(containerDiv);
        //populate container div
        $(containerDiv).append(versusRowBuilder(), combatLogRowBuilder(), enemiesRowBuilder());
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
        //top row
        var vsRow = $(document.createElement("div")).addClass("row justify-content-center");
        //creating columns x3
        var vsPlayerCol = $(document.createElement("div")).addClass("col-xs-12 col-md-4 text-center");
        var vsBtnCol = $(document.createElement("div")).addClass("col-xs-12 col-md-4 text-center align-self-center");
        var vsDefenderCol = $(document.createElement("div")).addClass("col-xs-12 col-md-4 text-center");
        //content for column 1 -- PC 
        var playerHeader = $(document.createElement("h3")).addClass("display-text").text("Hero");
        var playerBody = charBtnBuilder(game.characters[game.playerCharacter]);
        //content for column 2  -- buttons 
        //divs for vs content
        var vsHeaderDiv = document.createElement("div");
        var vsAtkBtnDiv = document.createElement("div");
        var vsRestartBtnDiv = document.createElement("div");
        //content
        var vsHeader = $(document.createElement("h3")).addClass("display-text").text("vs");
        var vsAtkBtn = $(document.createElement("button")).addClass("btn btn-default btn-attack").text("Attack").on("click", attack);
        var vsRestartBtn = $(document.createElement("button")).addClass("btn btn-default btn-restart").text("Restart").on("click", dataReset);
        //content for column 3 -- defender 
        var defenderHeader = $(document.createElement("h3")).addClass("display-text").text("Defender");
        var defenderBody = charBtnBuilder(game.characters[game.defender]);
        //appending
        $(vsRow).append(vsPlayerCol, vsBtnCol, vsDefenderCol);
        $(vsPlayerCol).append(playerHeader, playerBody);
        $(vsBtnCol).append(vsHeaderDiv, vsAtkBtnDiv, vsRestartBtnDiv);
        $(vsHeaderDiv).append(vsHeader);
        $(vsAtkBtnDiv).append(vsAtkBtn);
        $(vsRestartBtnDiv).append(vsRestartBtn);
        $(vsDefenderCol).append(defenderHeader, defenderBody);
        //return parent element
        return vsRow;
    }

    //combat log builder
    function combatLogRowBuilder() {

        var combatLogDiv = document.createElement("div");
        //create combat rows
        var combatHeaderRow = $(document.createElement("div")).addClass("row justify-content-center");
        var combatBodyRow = $(document.createElement("div")).addClass("row justify-content-center");
        //create combat column
        var combatLogHeader = $(document.createElement("h3")).addClass("display-text").text("Combat Log");
        var combatLogBody = $(document.createElement("div")).addClass("col-xs-12 combat-log body-text");
        //append
        $(combatHeaderRow).append(combatLogHeader);
        $(combatBodyRow).append(combatLogBody);
        $(combatLogDiv).append(combatHeaderRow, combatBodyRow);
        //return parent element
        return combatLogDiv;
    }

    //enemies row builder
    function enemiesRowBuilder() {
        var enemiesDiv = document.createElement("div");
        //create rows
        var enemiesHeaderRow = $(document.createElement("div")).addClass("row justify-content-center");
        var enemiesBodyRow = $(document.createElement("div")).addClass("row justify-content-center");

        //columns for enemies display
        var enemiesHeader = $(document.createElement("h3")).addClass("display-text").text("Remaining Enemies");
        //appending
        $(enemiesHeaderRow).append(enemiesHeader);
        game.enemiesArr.forEach(function (character) {
            var btnDiv = $(document.createElement("div")).addClass("col-xs-6 col-md-3 text-center");
            $(btnDiv).append(charBtnBuilder(character));
            $(enemiesBodyRow).append(btnDiv);
        });

        $(enemiesDiv).append(enemiesHeaderRow, enemiesBodyRow);
        return enemiesDiv;
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
            gameScreenBuilder();
        }
    }

    //attack handler
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
            $(".health-" + game.defender).text(game.characters[game["defender"]].health);
            //subtract defender attack from player health
            game.characters[game["playerCharacter"]].health = playerHealth - defenderAttack;
            //push currentPlayerHealth to object and display on button
            $(".health-" + game.playerCharacter).text(game.characters[game["playerCharacter"]].health);

            //Display damage done and damage take
            $(".combat-log").html("You did " + playerAttack + " damage to " + defenderObj.name + ". <br>" + defenderObj.name + " did " + defenderAttack + " damage to you.");

            nextDefender();
            winCondition();
        }
    }

    //RANDOM FUNCTIONS
    //Pick next defender
    function nextDefender() {
        var defenderObj = game.characters[game["defender"]];
        var defenderHealth = defenderObj.health;
        var defenderID = defenderObj.id;

        if (defenderHealth <= 0 && game.gameOver === false) {
            game.isDefenderChosen = false;
            $(".btn-" + defenderID).remove();
            $(".combat-log").text("You have defeated " + defenderObj.name + ". Select the next defender.");
            game.enemiesRemaining--;
            //set on click event listener to enemies buttons
            game.characters.forEach(function (character) {
                if (game.enemies[character.id] === true) {
                    //empty defenderArr
                    game.enemiesArr = [];
                    $(".btn-" + character.id).on("click", charBtnHandler);
                }
            });
        }
    }

    //win codition
    function winCondition() {
        if (game.enemiesRemaining === 0 && game.characters[game["playerCharacter"]].health > 0) {
            game.gameOver = true;
            $(".combat-log").text("YOU WON!!!! Game Over");

        } else if (game.characters[game["playerCharacter"]].health <= 0) {
            game.gameOver = true;
            $(".combat-log").text("YOU LOST!!!! Game Over");

        }
    }

    function empty() {
        $("body").empty();
    }

});