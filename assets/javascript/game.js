//Variables
var characters = [
    {
        id: 0,
        name: "Leonardo",
        health: 100,
        attack: 5
    },
    {
        id: 1,
        name: "Raphael",
        health: 100,
        attack: 5
    },
    {
        id: 2,
        name: "Donatello",
        health: 100,
        attack: 5
    },
    {
        id: 3,
        name: "Michaelangelo",
        health: 100,
        attack: 5
    }
]
// var chosenCharacter;
// var enemies;
// var defender;

//Assign characters to buttons
var charMenu = $(".characterMenu")

characters.forEach(function(character){
    // charMenu.append("<btn>" + character.name + character.health + "</btn>")
    var button = document.createElement("button");
    $(button).addClass("btn btn-" + character.id);
    $(button).text(character.name + " " + character.health)
    charMenu.append(button);
})



