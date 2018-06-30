//Variables
var characters = [
    {
        id: 0,
        name: "Leonardo",
        img: function () {
            var img = new Image(140, 109);
            img.src = "assets/images/Leonardo.png";
            return img;
        },
        health: 100,
        attack: 5
    },
    {
        id: 1,
        img: function () {
            var img = new Image(140, 109);
            img.src = "assets/images/Raphael.png";
            return img;
        },
        name: "Raphael",
        health: 100,
        attack: 5
    },
    {
        id: 2,
        img: function () {
            var img = new Image(140, 109);
            img.src = "assets/images/Donatello.png";
            return img;
        },
        name: "Donatello",
        health: 100,
        attack: 5
    },
    {
        id: 3,
        img: function () {
            var img = new Image(140, 109);
            img.src = "assets/images/Michaelangelo.png";
            return img;
        },
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
    $(button).text(character.name).append(character.img()).append(character.health);
    charMenu.append(button);
})



