/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Final Game:
** Game Title: 
** Date: 
*/

class Level1 extends Phaser.Scene {
    constructor() {
        super("level1Scene");
    }

    create() {
        const map = this.add.tilemap('map1');
        const bgset = map.addTilesetImage('background', 'background');
        const tileset = map.addTilesetImage('prop pack', 'platforms');
        const bgLayer = map.createLayer('Background', bgset, 0, 0);
        const platformLayer = map.createLayer('Platfroms', tileset, 0, 0);
        
        // platformLayer.setCollisionByProperty({ 
        //     collides: true 
        // });
        platformLayer.setCollisionByExclusion(-1, true);

        const p1Spawn = map.findObject("Object", obj => obj.name === "P1 Spawn");
        player = new Player(this, p1Spawn.x, p1Spawn.y, 'player');
        player.anims.play('idle');

        this.physics.world.gravity.y = 2000;
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.add.collider(player, platformLayer);
        
        cursors = this.input.keyboard.createCursorKeys();

        // setup camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(player, true, 0.25, 0.25);
    }

    update() {
        player.update();
    }
}