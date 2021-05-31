/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Final Game:
** Game Title: 
** Date: 
*/

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x,y) {
        // call Phaser Physics Sprite constructor
        super (scene,x, y, 'boss');
        scene.add.existing(this);           // add object to the existing scene
        scene.physics.add.existing(this);
        this.setSize(128, 32);
        this.newMonster = true;
        this.hP = 5; //set hitpoints
        this.body.allowGravity = false;  //prevent sprite from falling


        /*
        super(scene, game.config.width + 32, Phaser.Math.Between(128/2, game.config.height - 128/2), 'boss');
        scene.add.existing(this);           // add object to the existing scene
        scene.physics.add.existing(this);   // add to physics system
<<<<<<< HEAD
        // this.setSize(128, 64);
        // this.setOffset(32, -8);
        // this.setVelocityX(velocity);
        // this.setImmovable();
        // this.newWhale = true;
    }

    update() {
        
=======
        this.setSize(128, 64);
        this.setOffset(32, -8);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.newWhale = true;
        */


        
    }

    update() {
        /*
        if(this.newWhale && this.x < game.config.width/8) {
            this.newWhale = false;
            this.scene.addWhale(this.velocity);
        }

        // destroy whale if it reaches the left edge of the screen
        if(this.x < -this.width) {
            this.destroy();
        }*/
    }


    hit() {
        console.log('hit2');
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
>>>>>>> origin/Shooting-Mechanic-and-UI
    }
 
}