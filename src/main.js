/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Final Game:
** Game Title: 
** Date: 
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
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    // zoom: 2,
    scene: [ Load, Menu, Credits, Level1, Level3, End ]
}
// localStorage.clear();

// define game
let game = new Phaser.Game(config);

// define golbal
let borderUISize = game.config.height / 20;
let borderPadding = borderUISize / 3;
let cursors;
let player;
let enemy1;
let ammoCount;
// initialize score and high score
