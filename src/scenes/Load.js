/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Final Game:
** Game Title: 
** Date: 
*/

class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // set load path
        this.load.path = './assets/';
        // load images asset
        this.load.image('background', 'background.png')
        this.load.image('background1', 'background1.png')
        this.load.image('background3', 'background3.png')
        this.load.image('background4', 'background4.png')
        this.load.image('platforms', 'prop pack.png')
        this.load.image('items', 'colored_packed.png')
        this.load.image('menuBackground', 'finalgametitle.png');
        this.load.image('over', 'EndArt.png');
        // this.load.image('platforms2', 'tileset1.png')
       
       //Game assets
        this.load.image ('crosshair', 'CHgame.png');
        this.load.image ('projectile', 'bullet.png');
        this.load.image ('fireball', 'fireball.png');
        this.load.image('boss', 'enemy1.png')
        
        // load tilemap.json Data
        this.load.tilemapTiledJSON('map1', 'level1.json');
        this.load.tilemapTiledJSON('map2', 'level2.json');
        this.load.tilemapTiledJSON ('map3','Level 3.json');

        // load audio asset
        this.load.audio('select', 'select.wav');
        this.load.audio('bgm', 'bgm.wav');
        this.load.audio('gunshot', 'gunshot.wav');
        this.load.audio('monsterHit', 'monsterHit.wav');
        this.load.audio('dead', 'dead.wav');
        // load player atlas asset
        this.load.atlas('player', 'player.png', 'player.json');
        this.load.atlas('enemy1', 'enemy1.png', 'enemy1.json');
        this.load.atlas('enemy2', 'enemy2.png', 'enemy2.json');

        // create loading bar
        this.add.text(game.config.width / 2, (game.config.height / 2) - 50, 'Loading...').setOrigin(0.5);
        let loadingBar = this.add.graphics();
        this.load.on("progress", (value) => {
            loadingBar.clear();
            loadingBar.fillStyle(0xFFFFFF, 1);
            loadingBar.fillRect(0, game.config.height / 2, game.config.width * value, 5);
        })
        this.load.on("complete", () => {
            loadingBar.destroy();
        })
    }

    create() {
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'hurt/hurt',
                start: 1,
                end: 1,
                suffix: '.png',
                zeroPad: 4,
            }),
            // repeat: -1,
            frameRate: 10
        });
        this.anims.create({
            key: 'hurt',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'hurt/hurt',
                start: 1,
                end: 2,
                suffix: '.png',
                zeroPad: 4,
            }),
            // repeat: -1,
            frameRate: 10
        });
        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'attack/attack',
                start: 1,
                end: 6,
                suffix: '.png',
                zeroPad: 4,
            }),
            repeat: -1,
            frameRate: 10
        });
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'run/run',
                start: 1,
                end: 6,
                suffix: '.png',
                zeroPad: 4,
            }),
            repeat: -1,
            frameRate: 10
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'jump/jump',
                start: 1,
                end: 4,
                suffix: '.png',
                zeroPad: 4,
            }),
            repeat: -1,
            frameRate: 10
        });
        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'death/death',
                start: 1,
                end: 6,
                suffix: '.png',
                zeroPad: 4,
            }),
            repeat: -1,
            frameRate: 10
        });
        this.anims.create({
            key: 'enemyIdle',
            frames: this.anims.generateFrameNames('enemy1', {
                prefix: 'walk/enemy1walk',
                start: 1,
                end: 1,
                suffix: '.png',
                zeroPad: 4,
            }),
            // repeat: -1,
            frameRate: 10
        });
        this.anims.create({
            key: 'enemyWalk',
            frames: this.anims.generateFrameNames('enemy1', {
                prefix: 'walk/enemy1walk',
                start: 1,
                end: 4,
                suffix: '.png',
                zeroPad: 4,
            }),
            repeat: -1,
            frameRate: 10
        });
        this.anims.create({
            key: 'enemyAttack',
            frames: this.anims.generateFrameNames('enemy1', {
                prefix: 'attack/enemy1attack',
                start: 1,
                end: 6,
                suffix: '.png',
                zeroPad: 4,
            }),
            repeat: -1,
            frameRate: 10
        });
        this.anims.create({
            key: 'enemyHurt',
            frames: this.anims.generateFrameNames('enemy1', {
                prefix: 'hurt/enemy1hurt',
                start: 1,
                end: 2,
                suffix: '.png',
                zeroPad: 4,
            }),
            // repeat: -1,
            frameRate: 10
        });
        this.anims.create({
            key: 'enemyDeath',
            frames: this.anims.generateFrameNames('enemy1', {
                prefix: 'death/enemy1death',
                start: 1,
                end: 4,
                suffix: '.png',
                zeroPad: 4,
            }),
            repeat: -1,
            frameRate: 10
        });
        this.anims.create({
            key: 'enemy2Idle',
            frames: this.anims.generateFrameNames('enemy2', {
                prefix: 'walk/enemy2walk',
                start: 1,
                end: 1,
                suffix: '.png',
                zeroPad: 4,
            }),
            // repeat: -1,
            frameRate: 10
        });
        this.anims.create({
            key: 'enemy2Walk',
            frames: this.anims.generateFrameNames('enemy2', {
                prefix: 'walk/enemy2walk',
                start: 1,
                end: 4,
                suffix: '.png',
                zeroPad: 4,
            }),
            repeat: -1,
            frameRate: 10
        });
        this.anims.create({
            key: 'enemy2Attack',
            frames: this.anims.generateFrameNames('enemy2', {
                prefix: 'attack/enemy2attack',
                start: 1,
                end: 6,
                suffix: '.png',
                zeroPad: 4,
            }),
            repeat: -1,
            frameRate: 10
        });
        this.anims.create({
            key: 'enemy2Hurt',
            frames: this.anims.generateFrameNames('enemy2', {
                prefix: 'hurt/enemy2hurt',
                start: 1,
                end: 2,
                suffix: '.png',
                zeroPad: 4,
            }),
            repeat: -1,
            frameRate: 10
        });
        this.anims.create({
            key: 'enemy2Death',
            frames: this.anims.generateFrameNames('enemy2', {
                prefix: 'death/enemy2death',
                start: 1,
                end: 4,
                suffix: '.png',
                zeroPad: 4,
            }),
            repeat: -1,
            frameRate: 10
        });

        this.scene.start('menuScene');  // move to menu scene
    }
}