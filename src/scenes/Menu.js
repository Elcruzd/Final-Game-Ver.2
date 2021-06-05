/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Final Game:
** Game Title: 
** Date: 
*/

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        // place menu background
         this.add.image(0, 0, 'menuBackground').setOrigin(0, 0);
        // place logo
        // this.add.image(game.config.width/2, game.config.height/4, 'logo').setOrigin(0.5);
        
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // add play button
        this.playButton = this.add.text(game.config.width/2, game.config.height/2 + 32, 'CLICK HERE TO START', menuConfig).setOrigin(0.5);
        // set interactive that can go to the play scene
        this.playButton.setInteractive();
        this.playButton.on('pointerdown', () => {
            this.selectSound = this.sound.add('select', {
                mute: false,
                volume: 0.2,
                rate: 1,
                loop: false 
            });
            this.selectSound.play();
            this.scene.start('level1Scene');
        })

        // add credits button
        this.creditsButton = this.add.text(game.config.width/2, game.config.height/2 + 190, 'CLICK TO VIEW CREDITS', menuConfig).setOrigin(0.5);
        // set interactive that can go to the play scene
        this.creditsButton.setInteractive();
        this.creditsButton.on('pointerdown', () => {
            this.selectSound = this.sound.add('select', {
                mute: false,
                volume: 0.2,
                rate: 1,
                loop: false 
            });
            this.selectSound.play();
            this.scene.start('creditScene');
        })
        // add game instructions
        this.add.text(game.config.width/2, game.config.height/2 + 160, 'USE ARROWS TO MOVE', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 140, 'MOVE MOUSE TO AIM AND CLICK TO SHOOT', menuConfig).setOrigin(0.5);
        
        // define keys
        // cursors = this.input.keyboard.createCursorKeys();
        
    }

    update() {
    //     if(cursors.right.isDown) {
    //         this.scene.start('playScene');
    //     }
    }
}
