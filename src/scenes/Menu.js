/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Final Game:
** Game Title: Gundustrial Ascent
** Date: 6/7/2021
*/

class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    create() {
        // place menu background
         this.add.image(0, 0, 'menuBackground').setOrigin(0, 0);
        
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Tahoma',
            fontSize: '20px',
            color: '#000000.',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // add play button
        this.playButtonOutline = this.add.rectangle(game.config.width/2, game.config.height/2 + 32, game.config.width/7, borderUISize * 1.5, 0xFEEEBC)
        this.playButton = this.add.text(game.config.width/2, game.config.height/2 + 32, 'START', menuConfig).setOrigin(0.5);
        // set interactive that can go to the play scene
        this.playButtonOutline.setInteractive();
        this.playButtonOutline.on('pointerdown', () => {
            this.selectSound = this.sound.add('select', {
                mute: false,
                volume: 0.2,
                rate: 1,
                loop: false 
            });
            this.selectSound.play();
            this.scene.start('tutorialScene');
        })

        // add credits button
        this.creditsButtonOutline = this.add.rectangle(game.config.width/2, game.config.height/2 + 72, game.config.width/7, borderUISize * 1.5, 0xFEEEBC)
        this.creditsButton = this.add.text(game.config.width/2, game.config.height/2 + 72, 'CREDITS', menuConfig).setOrigin(0.5);
        // set interactive that can go to the credits scene
        this.creditsButtonOutline.setInteractive();
        this.creditsButtonOutline.on('pointerdown', () => {
            this.selectSound = this.sound.add('select', {
                mute: false,
                volume: 0.2,
                rate: 1,
                loop: false 
            });
            this.selectSound.play();
            this.scene.start('creditScene');
        })
    }

    update() {
    }
}
