/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Final Game:
** Game Title: Gundustrial Ascent
** Date: 6/7/2021
*/

// game configuration
let config = {
    type: Phaser.CANVAS,
    render: {
        pixelArt: false
    },
    width: 640,
    height: 480,
    // scale: {
    //     autoCenter: Phaser.Scale.CENTER_BOTH
    // },
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    // zoom: 2,
    scene: [ Load, Menu, Credits, Tutorial, Level1, Level2, Level3, End, End2, End3 ]
}
// localStorage.clear();

// define game
let game = new Phaser.Game(config);

// define golbal
let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 3;
let cursors;
let keyW, keyA, keyF, keyD, mouse;
let mouseClick = false;
let angle = 0;
let player;
let enemy1;
let enemy2;
let enemy3;
let playAgain = false;
let returnMenu = false;
