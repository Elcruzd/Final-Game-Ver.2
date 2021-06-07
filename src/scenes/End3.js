/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Final Game:
** Game Title: Gundustrial Ascent
** Date: 6/7/2021
*/

class End3 extends Phaser.Scene {
    constructor() {
        super("end3Scene");
    }

     create() {
         this.add.image(0, 0, 'over2').setOrigin(0, 0);

         // stop bgm and play 'gameover' audio
        this.sound.stopAll();
        this.gameoverSound = this.sound.add('finalGameOver', {
            mute: false,
            volume: 0.1,
            rate: 1,
            loop: true 
        });
        this.gameoverSound.play();
   
         // add game over text
        let endConfig = {
            fontFamily: 'Tahoma',
            fontSize: '28px',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - 32, 'YOU HAVE LIBERATED THIS PLACE!', endConfig).setOrigin(0.5);
            
        this.playButtonOutline = this.add.rectangle(game.config.width/2, game.config.height/2 + 32, game.config.width/4, borderUISize * 2, 0xFEEEBC)
        this.playButtonText = this.add.text(game.config.width/2, game.config.height/2 + 32, ' Play Again', endConfig).setOrigin(0.5);
        this.playButtonOutline.setInteractive();    
        this.playButton = this.playButtonOutline.on('pointerdown', () => {
            this.selectSound = this.sound.add('select', {
                mute: false,
                volume: 0.2,
                rate: 1,
                loop: false 
            });
            this.selectSound.play();
            playAgain = true;
            // this.scene.start("level1Scene");
        }, this);

        this.returnButtonOutline = this.add.rectangle(game.config.width/2, game.config.height/2 + 90, game.config.width/4, borderUISize * 2, 0xFEEEBC)
        this.returnButtonText = this.add.text(game.config.width/2, game.config.height/2 + 90, 'Title Screen', endConfig).setOrigin(0.5);
        this.returnButtonOutline.setInteractive();
        this.returnButton = this.returnButtonOutline.on('pointerdown', () => {
            this.selectSound = this.sound.add('select', {
                mute: false,
                volume: 0.2,
                rate: 1,
                loop: false 
            });
            this.selectSound.play();
            returnMenu = true;
            // this.scene.start("menuScene");
        }, this);
    }

    update() {
        if(playAgain == true) {
            playAgain = false;
            this.sound.stopAll();   // stop 'gameover' audio
            this.scene.start("level1Scene");
        }
        if(returnMenu == true) {
            returnMenu = false;
            this.sound.stopAll();   // stop 'gameover' audio
            this.scene.start("menuScene");
        }
    }
} 
     
