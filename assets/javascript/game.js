//Variables
var characters = [
    {
        name: "Leonardo",
        health: 100,
        attack: 5
    },
    {
        name: "Raphael",
        health: 100,
        attack: 5
    },
    {
        name: "Donatello",
        health: 100,
        attack: 5
    },
    {
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
    charMenu.append("<btn>" + character.name + "</btn>")
})



