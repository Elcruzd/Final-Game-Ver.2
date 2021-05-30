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


        this.physics.world.gravity.y = 2000;
        this.physics.world.bounds.setTo(0, 0, map3.widthInPixels, map3.heightInPixels);
        this.physics.add.collider(player, platformLayer);

//Crosshair and UI
this.p1 = this.add.sprite(0, 0, 'crosshair');
this.add.rectangle(this.cameras.x+16,borderUISize + borderPadding, game.config.width/4, borderUISize * 2,  0x00FF00).setOrigin(0,0.7); 
this.healthText = this.add.text(this.cameras.x+16,16, `Health: ${this.playerHP}`, { fontSize: '16px', fill: '#000' });


//this.add.rectangle(0,borderUISize + borderPadding, game.config.width/4, borderUISize * 2, 0xFEEEBC).setOrigin(-4,0.7);  
this.ammoText = this.add.text(this.cameras.x+32,45,`Ammo: ${this.ammoCount}`, { fontSize: '16px', fill: '#000' });


this.bossGroup = this.add.group({
    runChildUpdate:true
  })
// setup camera
 this.cameras.main.setBounds(0, 0, map3.widthInPixels, map3.heightInPixels);
 this.cameras.main.startFollow(player, true, 0.25, 0.25);

 //Temporary enemy placement
 const enemySpawn = map3.findObject("Enemy", obj => obj.name === "e3Spawn");
 this.boss1 = new Enemy( this, enemySpawn.x, enemySpawn.y);
 this.boss1 = new Enemy( this, enemySpawn.x+300, enemySpawn.y);
 this.bossGroup.add(this.boss1);

 this.shooting();              
cursors = this.input.keyboard.createCursorKeys();
  this.swap = this.input.keyboard.addKey('S');
}   

shooting(){
    //Fire projectile on click
    this.input.on('pointerdown', (pointer) =>{ 

     //Position Projectile to spawn from player's position
     this.bullet = new projectile (this, player.x, player.y, 'projectile');

     this.bullet.body.velocity.x =this.p1.x-300; //projectile physics
     this.bullet.body.velocity.y =this.p1.y-300; 
    
     this.ammoCount -= 1
     this.ammoText.text = `Ammo: ${this.ammoCount}`;
     
      this.sfx = this.sound.add('gunshot', {
          mute: false,
          volume: 1,
          rate: 1,
          loop: false 
      });
        this.sfx.play();   
      })
}


 update() {    
    this.input.on('pointermove', (pointer) =>{ 
        this.p1.x = pointer.x;
        this.p1.y = pointer.y;
        })
        player.update();

        this.physics.overlap(player, this.bossGroup, this.takeDamage, null, this)
        this.physics.overlap(this.bossGroup, this.bullet, this.hitEnemy, null, this)
        if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("level1Scene");
        }
    }

    takeDamage(player, sprite){
        console.log('hit');
        this.playerHP -=10
        this.healthText.text = `Health: ${this.playerHP}`
        
        this.cameras.main.shake(250, 0.0075);
        if( this.playerHP <=0)
         {
          this.scene.start("menuScene");
          }
       }
    
       hitEnemy(sprite, bullet) {
        console.log('hit');
        sprite.hit();
        bullet.destroy();
        this.collide = this.sound.add('monsterHit', {
          mute: false,
          volume: 1,
          rate: 1,
          loop: false 
         });
        this.collide.play();
      
        this.replenishAmmo(sprite);
      }
    
      replenishAmmo(sprite) {
        if(sprite.isDead())
        {
          this.ammoCount += 10
          this.ammoText.text = `Ammo: ${this.ammoCount}`;
        }  
     
      }


}