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
        this.load.image('platforms', 'prop pack.png')
        // this.load.image('platforms2', 'tileset1.png')
       
       //Game assets
        this.load.image ('crosshair', 'CHgame.png');
        this.load.image ('projectile', 'bullet.png');
        
        // load tilemap.json Data
        this.load.tilemapTiledJSON('map1', 'level1.json');
        this.load.tilemapTiledJSON ('map3','Level 3.json');

        // load audio asset
        this.load.audio('select', 'select.wav');
        this.load.audio('bgm', 'bgm.wav');
        this.load.audio('gunshot', 'gunshot.wav');
        this.load.audio('monsterHit', 'monsterHit.wav');
        // load player atlas asset
        this.load.atlas('player', 'player.png', 'player.json');

        //load enemy asset
        this.load.atlas('enemy1walk', 'enemy1walk.png', 'enemy1walk.json');
        this.load.atlas('enemy1Death', 'enemy1Death.png', 'enemy1Death.json');
        this.load.atlas('enemy1Hurt','enemy1Hurt.png','enemy1Hurt.json')
        // load custom spritesheet
        // this.load.spritesheet('run', 'run.png', {
        //     frameWidth: 48,
        //     frameHeight: 48,
        //     startFrame: 0,
        //     endFrame: 5
        // });
        // this.load.spritesheet('bloodExplode', 'blood.png', {
        //     frameWidth: 64,
        //     frameHeight: 32,
        //     startFrame: 0,
        //     endFrame: 9
        // });
    }

    create() {
        // animation config
        // this.anims.create({
        //     key: 'running',
        //     frames: this.anims.generateFrameNumbers('run', {
        //         start: 0,
        //         end: 5,
        //         first: 0
        //     }),
        //     repeat: -1,
        //     frameRate: 10
        // });
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

        //Enemy animations
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('enemy1walk', {
                prefix: 'enemy1walk_',
                start: 1,
                end: 3,
                suffix: '.png',
                zeroPad: 2,
            }),
            repeat: -1,
            frameRate: 5
        });

        this.anims.create({
            key: 'hurt',
            frames: this.anims.generateFrameNames('enemy1Hurt', {
                prefix: 'enemy1hurt_',
                start: 1,
                end: 2,
                suffix: '.png',
                zeroPad: 2,
            }),
            repeat: -1,
            frameRate: 2
        });
        // this.anims.create({
        //     key: 'bloods',
        //     frames: this.anims.generateFrameNumbers('bloodExplode', {
        //         start: 0,
        //         end: 9,
        //         first: 0
        //     }),
        //     frameRate: 30
        // });

        this.scene.start('menuScene');  // move to menu scene
    }
}