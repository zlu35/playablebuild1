// Prototype of Final Project
// 5/17/20
// Hang Rui; Zhifeng Lu; Amir Alaj
// Section A

let config = {
    type: Phaser.CANVAS,
    pixelArt: true,
    width: 640, 
    height: 480,
    physics: {
        default: "arcade",
        arcade: {
            //debug: true,
        }
    },
    scene: [  Menu, FirstLevel, SecondLevel, ThirdLevel ],
};

const game = new Phaser.Game(config);
// define some vars
const centerX = game.config.width / 2;
const centerY = game.config.height / 2;
let keyE;
let keySPACE;
let cursors = null;
let player = null;
let jumpMan = null;
let temp = null;
let door = null;