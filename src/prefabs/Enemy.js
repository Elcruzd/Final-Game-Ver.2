/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Final Game:
** Game Title: 
** Date: 
*/

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x,y,texture, frame) {
        // call Phaser Physics Sprite constructor
        super (scene,x, y, texture, frame);
        scene.add.existing(this);           // add object to the existing scene
        scene.physics.add.existing(this);
        this.newMonster = true;
        this.hP = 5; //set hitpoints
        this.body.allowGravity = false;  //prevent sprite from falling
        this.MAX_X_VEL = 200;
        this.body.setCollideWorldBounds(true);


        /*
        super(scene, game.config.width + 32, Phaser.Math.Between(128/2, game.config.height - 128/2), 'boss');
        scene.add.existing(this);           // add object to the existing scene
        scene.physics.add.existing(this);   // add to physics system
        this.setSize(128, 64);
        this.setOffset(32, -8);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.newWhale = true;
        */

        
    }
    update() {
        this.anims.play('walk', true);
        this.body.setAccelerationX(-this.MAX_X_VEL)
        
    }


    hit() {
        console.log('hit2');
        this.anims.play('hurt', true)
        this.hP= this.hP-1
        this.isDead();
        
    }

    isDead() {
         //Destroy sprite in multiple hits
         if(this.hP <= 0)
         {  
            this.destroy();
             return true;
         }
    }
 
}