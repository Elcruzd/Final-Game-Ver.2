/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Final Game:
** Game Title: 
** Date: 
*/

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, game.config.width + 32, Phaser.Math.Between(128/2, game.config.height - 128/2), 'whales');
        scene.add.existing(this);           // add object to the existing scene
        scene.physics.add.existing(this);   // add to physics system
        // this.setSize(128, 64);
        // this.setOffset(32, -8);
        // this.setVelocityX(velocity);
        // this.setImmovable();
        // this.newWhale = true;
    }

    update() {
        
    }
}