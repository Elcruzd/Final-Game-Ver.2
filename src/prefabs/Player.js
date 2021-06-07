/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Final Game:
** Game Title: 
** Date: 
*/

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        // call Phaser Physics Sprite constructor
        super(scene, x, y, texture, frame);
        scene.add.existing(this);           // add object to the existing scene
        scene.physics.add.existing(this);   // add to physics system
        this.setOrigin(0.5, 0.5);
        
        // player variables and settings
        this.playerHP = 100;
        this.ammoCount = 50;
        this.ACCELERATION = 500;
        this.MAX_X_VEL = 200;
        this.MAX_Y_VEL = 2000;
        this.DRAG = 6000;
        this.JUMP_VELOCITY = -600;
        this.setBounce(0.1);
        this.setImmovable();
        this.body.setSize(this.width - 9, this.height);
        this.body.setOffset(0, 0);
        this.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.body.setCollideWorldBounds(true);
        this.attack = true;
        this.bulletGroup = scene.add.group();
        // mouse = scene.input.on('pointerdown', (pointer) => {
        //     this.shoot(pointer);
        // })
        // mouse = this.input.mousePointer;
    }

    update() {
        // player movement
        if(cursors.left.isDown || keyA.isDown) {
            player.body.setAccelerationX(-this.ACCELERATION);
            player.anims.play('run', true);
            player.setFlip(true, false);
        } else if(cursors.right.isDown || keyD.isDown) {
            player.body.setAccelerationX(this.ACCELERATION);
            player.anims.play('run', true);
            player.resetFlip();
        } else {
            player.anims.play('idle');
            player.body.setAccelerationX(0);
            player.body.setDragX(this.DRAG);
        }

        if(!player.body.blocked.down) {
            player.anims.play('jump');
        }
        if(player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up) || Phaser.Input.Keyboard.JustDown(keyW)) {
            // player.body.setVelocityY(this.JUMP_VELOCITY);
            if(player.body.onFloor()) {
                this.canDoubleJump = false;
                this.setVelocityY(this.JUMP_VELOCITY);
            }
        }
    }

    shoot(pointer) {
        if(this.attack) {
            let bullet = this.scene.physics.add.sprite(player.x, player.y, 'fireball').setImmovable(true);
            bullet.body.setAllowGravity(false);
            this.scene.physics.velocityFromRotation(Phaser.Math.Angle.BetweenPoints(player, pointer), this.ACCELERATION, bullet.body.velocity);
            this.scene.sfx = this.scene.sound.add('gunshot', {
                mute: false,
                volume: 0.1,
                rate: 1,
                loop: false 
            });
            this.scene.sfx.play();
            // player.anims.play('attack', true);
            this.bulletGroup.add(bullet);

            this.scene.time.delayedCall(2000, () => {
                bullet.destroy();       
            })

            this.attack = false;
            this.scene.time.delayedCall(100, () => {
                this.attack = true;
            })
            this.scene.ammoCount -= 1
            this.scene.ammoText.text = `Ammo: ${this.scene.ammoCount}`;  
        }
        // //Bullet collison with enemies
        // this.scene.physics.add.collider(this.scene.enemyGroup, this.scene.bulletGroup, this.scene.hitEnemy, null, this)
    }
    
    // isDead(){
    //     if(this.scene.playerHP<=0){
    //         this.scene.playerDead = this.scene.sound.add('dead', {
    //             mute: false,
    //             volume: 0.5,
    //             rate: 1,
    //             loop: false 
    //         });
    //         this.scene.playerDead.play();
    //     } 
    // }
}