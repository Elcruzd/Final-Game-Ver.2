/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Final Game:
** Game Title: 
** Date: 
*/

class End extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

     create() {
         this.add.image(0, 0, 'over').setOrigin(0, 0);
   
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
            
    this.playButtonOutline = this.add.rectangle(game.config.width/2, game.config.height/2 + 32, game.config.width/2, borderUISize * 2, 0xFEEEBC)
    this.playButtonText = this.add.text(game.config.width/2, game.config.height/2 + 32, ' Play Again', endConfig).setOrigin(0.5);
    this.playButtonOutline.setInteractive();    
       this.playButtonOutline.on('pointerdown', () => {
            this.selectSound = this.sound.add('select', {
                mute: false,
                volume: 0.2,
                rate: 1,
                loop: false 
            });
            this.selectSound.play();
            this.scene.start("level1Scene");
        })

     this.returnButtonOutline = this.add.rectangle(game.config.width/2, game.config.height/2 + 160, borderUISize * 2, 0xFEEEBC)
    this.returnButtonText = this.add.text(game.config.width/2, game.config.height/2 + 160, 'Title Screen', endConfig).setOrigin(0.5);
      this.returnButtonOutline.setInteractive();
        this.returnButtonOutline.on('pointerdown', () => {
            this.selectSound = this.sound.add('select', {
                mute: false,
                volume: 0.2,
                rate: 1,
                loop: false 
            });
            this.selectSound.play();
            this.scene.start("menuScene");
        })
  
    }

 update() {
    this.sound.stopAll();
    }
} 
    //     // if(localStorage.getItem('highscore') != null) {
    //     //     let storedTime = parseInt(localStorage.getItem('highscore'));
    //     //     if(p1Time > storedTime) {
    //     //         localStorage.setItem('highscore', p1Time.toString());
    //     //         p1HighScore = p1Time;
    //     //         newHighScore = true;
    //     //     } else {
    //     //         p1HighScore = parseInt(localStorage.getItem('highscore'));
    //     //         newHighScore = false;
    //     //     }
    //     // } else {
    //     //     p1HighScore = p1Time;
    //     //     localStorage.setItem('highscore', p1HighScore.toString());
    //     //     newHighScore = true;
    //     // }



    //     // if SPACE hit, move to play scene
    //     if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
    //         this.sound.stopAll();   // stop 'gameover' audio
    //         this.selectSound = this.sound.add('select', {
    //             mute: false,
    //             volume: 1,
    //             rate: 1,
    //             loop: false 
    //         });
    //         this.selectSound.play();    // play 'select' sound
    //         this.scene.start('playScene');
    //     }

    //     // if LEFT hit, move to menu scene
    //     if(Phaser.Input.Keyboard.JustDown(cursors.left)) {
    //         this.sound.stopAll();   // stop 'gameover' audio
    //         this.selectSound = this.sound.add('select', {
    //             mute: false,
    //             volume: 1,
    //             rate: 1,
    //             loop: false 
    //         });
    //         this.selectSound.play();    // play 'select' sound

    //         this.scene.start('menuScene');
     //     this.add.text(game.config.width/5, game.config.height/64 - borderUISize - borderPadding + 64, `SCORE: ${p1Score}`, endConfig).setOrigin(0.5);
    //     this.add.text(game.config.width/5, game.config.height/64 - borderUISize - borderPadding + 96, `TIME: ${p1Time}s`, endConfig).setOrigin(0.5);
    //     this.add.text(game.config.width/5, game.config.height/64 - borderUISize - borderPadding + 128, `HIGH SCORE: ${p1HighScore}`, endConfig).setOrigin(0.5);
        // this.add.text(game.config.width/2, game.config.height/2 + 128, ' Play Again', endConfig).setOrigin(0.5);
       //
        
    //     // stop bgm and play 'gameover' audio
    //     this.sound.stopAll();
    //     this.sound.play('over');

    //     // set up cursor keys
    //     cursors = this.input.keyboard.createCursorKeys();
       