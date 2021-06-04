/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Final Game:
** Game Title: 
** Date: 
*/

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity, positionX, positionY) {
        // call Phaser Physics Sprite constructor
        super (scene, positionX, positionY, 'enemy1');
        scene.add.existing(this);           // add object to the existing scene
        scene.physics.add.existing(this);
        this.setOrigin(0, 0);
        // this.anims.play('enemyWalk');
        // this.MAX_X_VEL = 200;
        // this.setSize(128, 32);
        this.hP = 5; //set hitpoints
        this.setVelocityX(velocity);
        this.setCollideWorldBounds(true);
        // this.body.allowGravity = false;  //prevent sprite from falling
        this.body.allowGravity = true;
        this.body.checkCollision.down = true;
        this.body.checkCollision.up = true;
        this.body.checkCollision.left = true;
        this.body.checkCollision.right = true;
        this.newMonster = true;
    }

    update() {
        
        if(this.newMonster && this.x < game.config.width/2) {
            this.newMonster = false;
       //   this.scene.addEnemy(this.parent, this.velocity);
          // this.scene.addEnemy();
        }
         this.body.setAccelerationX(-this.MAX_X_VEL);
        this.anims.play('enemyWalk', true);
    }

    hit() {
        this.scene.bulletCollide = this.scene.sound.add('monsterHit', {
            mute: false,
            volume: 1,
            rate: 1,
            loop: false 
            });
            this.scene.bulletCollide.play();
            
        console.log('hit2');
        this.anims.play('enemyHurt', true)
        this.hP = this.hP - 1
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