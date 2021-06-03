/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Final Game:
** Game Title: 
** Date: 
*/

class Level1 extends Phaser.Scene {
    constructor() {
        super("level1Scene");
    } 
    create() {
        const map = this.add.tilemap('map1');
        const bgset = map.addTilesetImage('background', 'background');
        const tileset = map.addTilesetImage('prop pack', 'platforms');
        const bgLayer = map.createLayer('Background', bgset, 0, 0);
        const platformLayer = map.createLayer('Platfroms', tileset, 0, 0);

        //Initialize Player's ammo
        this.playerHP = 100;
        this.ammoCount = 50;
        
        // platformLayer.setCollisionByProperty({ 
        //     collides: true 
        // });
        platformLayer.setCollisionByExclusion(-1, true);

        const p1Spawn = map.findObject("Object", obj => obj.name === "P1 Spawn");
        player = new Player(this, p1Spawn.x, p1Spawn.y, 'player');
        player.anims.play('idle');

        //Crosshair and UI
        // this.p1 = this.add.sprite(0, 0, 'crosshair');
      //  this.add.rectangle(16,borderUISize + borderPadding, game.config.width/4, borderUISize * 2,  0x00FF00).setScrollFactor(0); 
        this.healthText = this.add.text(16, 16 ,`Health: ${this.playerHP}`, { fontSize: '16px', fill: '#000' }).setScrollFactor(0);
        
        //this.add.rectangle(0,borderUISize + borderPadding, game.config.width/4, borderUISize * 2, 0x00FF00).setScrollFactor(0);  
        this.ammoText = this.add.text(16, 32, `Ammo: ${this.ammoCount}`, { fontSize: '16px', fill: '#000' }).setScrollFactor(0);
        


        this.enemyGroup = this.add.group({
            runChildUpdate: true
        });

        // const enemySpawn = map.findObject("Object", obj => obj.name === "Enemy Spawn");
        // enemy1 = new Enemy(this, enemySpawn.x, enemySpawn.y, 'enemy1');
        // this.enemyGroup.add(enemy1);

        this.enemyGroup = this.add.group({
            runChildUpdate: true
        });

        this.addEnemy(map);
     
        this.physics.world.gravity.y = 2000;
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.add.collider(player, platformLayer);
        this.physics.add.collider(enemy1, platformLayer);
        this.physics.add.collider(player.bulletGroup, platformLayer,(obj1,obj2)=> obj1.destroy());
                
        cursors = this.input.keyboard.createCursorKeys();
        this.swap = this.input.keyboard.addKey('S');

        // setup camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(player, true, 0.25, 0.25);
 
    }

    addEnemy(map) {
        for (let i=0;  i< 4; i++) {
         const enemySpawn = map.findObject("Enemy1", obj => obj.name === "Enemy Spawn"+(i + 1).toString());
        let movementSpeed = Phaser.Math.Between(0, 50);
        enemy1 = new Enemy(this,movementSpeed, enemySpawn.x, enemySpawn.y,);
        this.enemyGroup.add(enemy1);
        }
    }
 

 
    update() {
        // this.input.on('pointermove', (pointer) =>{
        //     this.p1.x = pointer.x;
        //     this.p1.y = pointer.y;
        //     })
            player.update();
            
            this.physics.add.overlap(this.enemyGroup, player, this.takeDamage, null, this)
            this.physics.add.overlap(this.enemyGroup, player.bulletGroup, this.hitEnemy, null, this)
        
            if(Phaser.Input.Keyboard.JustDown(this.swap)) {
            this.scene.start("level3Scene");
        }
    }

    takeDamage(sprite, player){
        console.log('hit');
        this.playerHP -=1;
        this.healthText.text = `Health: ${this.playerHP}`;  
        
        this.cameras.main.shake(250, 0.0075);
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

//REFERENCE FOR OLD CODE

     // this.time.delayedCall(5000, () => {
        //     this.loopCall();  
        // }) 
           

   // spawnBoss(){
    //     this.boss1 = new Enemy(this, Phaser.Math.Between(game.config.width, game.config.width/2), Phaser.Math.Between(0,  game.config.height)).setOrigin(0.5,1);
    //     this.bossGroup.add(this.boss1);
    // }
    
    // // Have enemies spawn repeatedly every ten seconds     
    // loopCall() {
    //     this.time.delayedCall(10000, () => {
    //     this.loopCall();  
    //     })
    //     this.spawnBoss();
    // }

         //Spawn Enemies
      /*  this.enemyGroup = this.add.group({
           runChildUpdate: true
        });*/
     
       // const enemySpawn = map.getObjectLayer('Enemy1');
      /*  for (let i=0;  i< 4; i++) {
            let enemySpawn1 = map.findObject("Enemy1", obj => obj.name === "Enemy Spawn" + (i + 1).toString());
              let movementSpeed = Phaser.Math.Between(0, 50);
              let enemy = new Enemy(this, movementSpeed, enemySpawn1.x, enemySpawn1.y);
              this.enemyGroup.add(enemy);
        }*/
        //enemySpawn.objects.forEach(objects => {

          
            /*
            let enemySpawn1 = map.findObject("Enemy1", obj => obj.name === "Enemy Spawn1") 
            let movementSpeed = Phaser.Math.Between(0, 50);
            let enemy = new Enemy(this, movementSpeed, enemySpawn1.x, enemySpawn1.y);
            this.enemyGroup.add(enemy);
            */
  
        //});  

        /* addEnemy(map) {
    /*
     for (i;  i< 4; i++) {
    let enemySpawn = map.findObject("Enemy1", obj => obj.name === "Enemy Spawn" + (i + 1).toString());
      let movementSpeed = Phaser.Math.Between(0, 50);
      let enemy = new Enemy(this, movementSpeed, enemySpawn.x, enemySpawn.y);
      this.enemyGroup.add(enemy);
      }*/
  //}