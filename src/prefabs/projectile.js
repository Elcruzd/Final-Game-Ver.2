class projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, _texture) {
        super(scene, x, y, 'projectile');
        scene.add.existing(this); //Place projectile in scene
        scene.physics.world.enableBody(this);
        this.body.allowGravity = false;
        
    }


  update() {

      
     }
    }