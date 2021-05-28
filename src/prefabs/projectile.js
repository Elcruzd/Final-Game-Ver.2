class projectile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, _texture) {
        super(scene, x, y, 'projectile');
        scene.add.existing(this); //Place projectile in scene
       // this.x = scene.Player.x;
       // this.y = scene.Player.y;
        scene.physics.world.enableBody(this);
       

        
    }


    update() {

      
     }
    }