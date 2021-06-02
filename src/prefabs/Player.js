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

        this.ACCELERATION = 500;
        this.MAX_X_VEL = 200;
        this.MAX_Y_VEL = 2000;
        this.DRAG = 600;
        this.JUMP_VELOCITY = -600;
        this.setBounce(0.1);
        this.setImmovable();
        this.body.setSize(this.width - 9, this.height);
        this.body.setOffset(0, 0);
        this.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        this.body.setCollideWorldBounds(true);

        this.attack = true;
        this.bulletGroup = scene.add.group();
        scene.input.on('pointerdown', (pointer) => {
            this.shoot(pointer);
        })
    }

    update() {
        if(cursors.left.isDown) {
            player.body.setAccelerationX(-this.ACCELERATION);
            player.anims.play('run', true);
            player.setFlip(true, false);
        } else if(cursors.right.isDown) {
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
        if(player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            player.body.setVelocityY(this.JUMP_VELOCITY);
        }
    }

    shoot(pointer) {
        if(this.attack) {
            player.anims.play('attack');

            let bullet = this.scene.physics.add.sprite(player.x, player.y, 'projectile').setImmovable(true);
            bullet.body.setAllowGravity(false);
            this.scene.physics.velocityFromAngle(Phaser.Math.RadToDeg(Phaser.Math.Angle.BetweenPoints(player, pointer)), 500, bullet.body.velocity);
            // bullet.body.setAngularVelocity(1000);
            
            this.bulletGroup.add(bullet);

            this.scene.time.delayedCall(2000, () => {
                bullet.destroy();
            })

            this.attack = false;
            this.scene.time.delayedCall(100, () => {
                this.attack = true;
            })
        }
    }
}