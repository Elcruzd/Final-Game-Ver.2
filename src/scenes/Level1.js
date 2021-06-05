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

         //Play bgm
         this.bgm = this.sound.add('bgm', {
            mute: false,
            volume: 1.5,
            rate: 1.5,
            loop: true 
        });
        this.bgm.play();

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

    
        this.addEnemy(map);

     
        this.physics.world.gravity.y = 2000;
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.add.collider(player, platformLayer);
        this.physics.add.collider(this.enemyGroup, platformLayer);
        this.physics.add.collider(player.bulletGroup, platformLayer,(obj1,obj2)=> obj1.destroy());
      
                
        cursors = this.input.keyboard.createCursorKeys();
        this.swap = this.input.keyboard.addKey('S');

        // setup camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(player, true, 0.25, 0.25);

       // Move to next level upon Collision
        const Exit = map.findObject("Exit", obj => obj.name === "nextLevel");
        this.transition =this.add.rectangle(Exit.x,Exit.y-50,Exit.width,Exit.height, 0xff6699);
        this.physics.world.enable(this.transition);
        this.transition.body.allowGravity = false;
 
    }

    addEnemy(map) {
        for (let i=0;  i<10; i++) {
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
            if(this.ammoCount<=0){
                this.scene.start("menuScene");
            }
            
            
            this.physics.add.collider(this.enemyGroup, player, this.takeDamage, null, this)
            this.physics.add.collider(this.enemyGroup, player.bulletGroup, this.hitEnemy, null, this)
        
            
            //Move to next level upon Collision
            this.physics.add.collider(player,this.transition, this.exitCall, null, this)
        
            if(Phaser.Input.Keyboard.JustDown(this.swap)) {
                this.scene.start("level3Scene");
            }
    }

    takeDamage(sprite, player) {
        console.log('hit');
        this.playerHP -=10;
        this.healthText.text = `Health: ${this.playerHP}`;  

        //Send Player back to spawn point on collison with enemy
        player.setVelocity(0, 0);
        player.setX(31.25);
        player.setY(463.25);
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
        if(this.playerHP <= 0)
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

    exitCall() {
        console.log('exit');
        this.scene.start("level2Scene");
    }


}

  