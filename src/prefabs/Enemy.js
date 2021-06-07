/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Final Game:
** Game Title: 
** Date: 
*/

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        // call Phaser Physics Sprite constructor
        super (scene, x, y, texture, frame);
        scene.add.existing(this);           // add object to the existing scene
        scene.physics.add.existing(this);   // add to physics system
        this.setOrigin(0.5, 0.5);
        this.anims.play('enemyWalk', true)
        this.body.allowGravity = false;     // prevent sprite from falling
        this.hP = 3;                        // set hitpoints
        this.movementSpeed = 30;            // set enemy1 movement speed
        // this.setImmovable();
        this.setVelocityX(-this.movementSpeed);
        this.enemyHurt = true;
        this.moveLeft = true;
        this.body.setCollideWorldBounds(true);
        
    }

    update() {
    }

    changeDirection() {
        // check if enemy1 moving the right direction and flip their body
        if(this.moveLeft == true) {
            this.moveLeft = false;
            this.setVelocityX(-this.movementSpeed);
            this.resetFlip();
        }else if(this.moveLeft == false) {
            this.moveLeft = true;
            this.setVelocityX(this.movementSpeed);
            this.flipX = true;
        }
    }

    hit() {
        // check if enemy1 is damaged
        if(this.enemyHurt == true) {
            this.scene.bulletCollide = this.scene.sound.add('monsterHit', {
                mute: false,
                volume: 0.2,
                rate: 1,
                loop: false 
            });
            this.scene.bulletCollide.play();
            console.log('hit2');
            // this.anims.play('enemyHurt', true);
            this.hP = this.hP - 1
            this.isDead();
        }
    }

    isDead() {
        // Destroy enemy1 in multiple hits
        if(this.hP <= 0) {
            this.destroy();
        }
    }
}