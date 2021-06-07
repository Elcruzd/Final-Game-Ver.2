/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Final Game:
** Game Title: Gundustrial Ascent
** Date: 6/7/2021
*/

class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
    }

    create() {
        // place menu background
         this.add.image(0, 0, 'bg3').setOrigin(0, 0);
         this.add.image(game.config.width/2 - 300, game.config.height/2 - 120, 'pickupFA').setOrigin(0, 0);
         this.add.image(game.config.width/2 + 120, game.config.height/2, 'pickupRefill').setOrigin(0, 0);

        // tutorial text configuration
        let tutorialConfig2 = {
            fontFamily: 'Tahoma',
            fontSize: '20px',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let tutorialConfig = {
            fontFamily: 'Tahoma',
            fontSize: '20px',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        // add back button
        this.backButtonOutline = this.add.rectangle(game.config.width/16, game.config.height/4 + borderUISize + borderPadding + 300, game.config.width/12, borderUISize * 1.5, 0xFEEEBC)
        this.backButton = this.add.text(game.config.width/16, game.config.height/4 + borderUISize + borderPadding + 300, 'BACK', tutorialConfig2).setOrigin(0.5);
        // set interactive that can go back to the menu scene
        this.backButtonOutline.setInteractive();
        this.backButtonOutline.on('pointerdown', () => {
            this.selectSound = this.sound.add('select', {
                mute: false,
                volume: 0.05,
                rate: 1,
                loop: false 
            });
            this.selectSound.play();
            this.scene.start('menuScene');
        })

        // add play button
        this.playButtonOutline = this.add.rectangle(game.config.width/2 + 282, game.config.height/4 + borderUISize + borderPadding + 300, game.config.width/12, borderUISize * 1.5, 0xFEEEBC)
        this.playButton = this.add.text(game.config.width/2 + 282, game.config.height/4 + borderUISize + borderPadding + 300, 'PLAY', tutorialConfig2).setOrigin(0.5);
        // set interactive that can go to the play scene
        this.playButtonOutline.setInteractive();
        this.playButtonOutline.on('pointerdown', () => {
            this.selectSound = this.sound.add('select', {
                mute: false,
                volume: 0.05,
                rate: 1,
                loop: false 
            });
            this.selectSound.play();
            this.scene.start('level1Scene');
        })

        // // add play button
        // this.playButtonOutline = this.add.rectangle(game.config.width/2, game.config.height/2 + 32, game.config.width/7, borderUISize * 1.5, 0xFEEEBC)
        // this.playButton = this.add.text(game.config.width/2, game.config.height/2 + 32, 'PLAY', tutorialConfig).setOrigin(0.5);
        // // set interactive that can go to the play scene
        // this.playButtonOutline.setInteractive();
        // this.playButtonOutline.on('pointerdown', () => {
        //     this.selectSound = this.sound.add('select', {
        //         mute: false,
        //         volume: 0.2,
        //         rate: 1,
        //         loop: false 
        //     });
        //     this.selectSound.play();
        //     this.scene.start('level1Scene');
        // })

        // add game instructions
        this.add.text(game.config.width/4, game.config.height/64 - borderUISize - borderPadding + 64, 'USE WASD/ARROWS TO MOVE', tutorialConfig).setOrigin(0.5);
        this.add.text(game.config.width/2 - 27, game.config.height/64 - borderUISize - borderPadding + 96, 'MOVE MOUSE TO AIM AND CLICK TO SHOOT THE MONSTER', tutorialConfig).setOrigin(0.5);
        this.add.text(game.config.width/2 + 100, game.config.height/5 - borderUISize - borderPadding + 96, 'PICK UP THIS ITEM WILL INCREASE YOUR HP', tutorialConfig).setOrigin(0.5);
        this.add.text(game.config.width/2 + 90, game.config.height/2 - borderUISize - borderPadding + 170, 'PICK UP THIS ITEM WILL INCREASE YOUR AMMO', tutorialConfig).setOrigin(0.5);
        
        // define keys
        // cursors = this.input.keyboard.createCursorKeys();
        
    }

    update() {
    //     if(cursors.right.isDown) {
    //         this.scene.start('playScene');
    //     }
    }
}
