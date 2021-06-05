class Level3 extends Phaser.Scene {
    constructor() {
        super("level3Scene");
    } 

    preload(){
        this.load.path = "./assets/";
        this.load.tilemapTiledJSON ('map3','Level 3.json');

    }
    create() {
        const map3 = this.add.tilemap('map3');
        const bgset = map3.addTilesetImage('background1', 'background1');
        const tileset = map3.addTilesetImage("prop pack", 'platforms');
        const bgLayer = map3.createLayer('Background', bgset, 0, 0);
        const platformLayer = map3.createLayer('Platforms', tileset, 0, 0);

        //Initialize Player's ammo
        this.playerHP = 100;
        this.ammoCount = 50;

        platformLayer.setCollisionByExclusion(-1, true);

        const p1Spawn = map3.findObject("Player spawn", obj => obj.name === "p1 Spawn");
        player = new Player(this, p1Spawn.x, p1Spawn.y, 'player');
        player.anims.play('idle');


//Crosshair and UI
//this.p1 = this.add.sprite(0, 0, 'crosshair');
this.add.rectangle(16,borderUISize + borderPadding, game.config.width/4, borderUISize * 2,  0x00FF00).setScrollFactor(0);
this.healthText = this.add.text(16,16, `Health: ${this.playerHP}`, { fontSize: '16px', fill: '#000' }).setScrollFactor(0);


//this.add.rectangle(0,borderUISize + borderPadding, game.config.width/4, borderUISize * 2, 0xFEEEBC).setOrigin(-4,0.7);  
this.ammoText = this.add.text(16,32,`Ammo: ${this.ammoCount}`, { fontSize: '16px', fill: '#000' }).setScrollFactor(0);


// setup camera
 this.cameras.main.setBounds(0, 0, map3.widthInPixels, map3.heightInPixels);
 this.cameras.main.startFollow(player, true, 0.25, 0.25);

 this.enemyGroup = this.add.group({

    runChildUpdate: true
});

this.physics.world.gravity.y = 2000;
this.physics.world.bounds.setTo(0, 0, map3.widthInPixels, map3.heightInPixels);
this.physics.add.collider(player, platformLayer);
this.physics.add.collider(this.enemyGroup, platformLayer);
this.physics.add.collider(player.bulletGroup, platformLayer,(obj1, obj2)=> obj1.destroy());
this.addEnemy(map3);



             
cursors = this.input.keyboard.createCursorKeys();
  this.swap = this.input.keyboard.addKey('S');
}   

addEnemy(map3){
    for (let i=0;  i< 4; i++) {
        const enemySpawn = map3.findObject("Enemy", obj => obj.name === "e3Spawn"+(i + 1).toString());
       let movementSpeed = Phaser.Math.Between(0, 50);
       enemy1 = new Enemy(this,movementSpeed, enemySpawn.x, enemySpawn.y,);
       this.enemyGroup.add(enemy1);
       }
}
 update() {    
   // this.input.on('pointermove', (pointer) =>{ 
      //  this.p1.x = pointer.x;
       // this.p1.y = pointer.y;
       // })
      
        player.update();
        this.physics.add.collider(this.enemyGroup, player, this.takeDamage, null, this)
        this.physics.add.collider(this.enemyGroup, player.bulletGroup, this.hitEnemy, null, this)
      
      //Debug swap
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("level1Scene");
        }


    }

    takeDamage(sprite, player){
        console.log('hit');
        this.playerHP -=5;
        this.healthText.text = `Health: ${this.playerHP}`;  
        //Send Player back to spawn point
        player.setVelocity(0, 0);
        player.setX(130);
        player.setY(923);
        player.anims.play('idle', true);
        player.setAlpha(0);
        let sendBack = this.tweens.add({
            targets: player,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
          }); 
        this.cameras.main.shake(250, 0.0075);
        //Game Over
        if( this.playerHP <=0)
        {
            this.scene.start("menuScene");
        }
    }
    hitEnemy(sprite, bulletGroup) {
        console.log('hit');
        sprite.hit();
        bulletGroup.destroy();
    
        if(sprite.isDead())
        {
            this.ammoCount += 10
            this.ammoText.text = `Ammo: ${this.ammoCount}`;
        }  
    }

    



}