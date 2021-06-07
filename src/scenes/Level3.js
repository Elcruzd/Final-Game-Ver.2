/* 
** Name: Zhendong Jiang - programming, game design
**       Nathan Pon - art, audio assets
**       Jiahui Li - art, audio assets
** Porject: Final Game:
** Game Title: Gundustrial Ascent
** Date: 6/7/2021
*/

class Level3 extends Phaser.Scene {
    constructor() {
        super("level3Scene");
    } 
    create() {
        const map = this.add.tilemap('map3');
        const bgset = map.addTilesetImage('background4', 'background4');
        const tileset = map.addTilesetImage('prop pack', 'platforms');
        const tileset2 = map.addTilesetImage('colored_packed', 'items');
        const bgLayer = map.createLayer('Background', bgset, 0, 0);
        const platformLayer = map.createLayer('Platforms', tileset, 0, 0);

        //Initialize Player's status
        this.playerHP = 100;
        this.ammoCount = 50;
        let playerHurt = false;
        
        // platformLayer.setCollisionByProperty({ 
        //     collides: true
        // });
        platformLayer.setCollisionByExclusion(-1, true);

        // define a render debug so we can see the tilemap's collision bounds
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        platformLayer.renderDebug(debugGraphics, {
            tileColor: null,    // color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),    // color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)                // color of colliding face edges
        });
        
         //Play bgm
         this.bgm = this.sound.add('bgm', {
            mute: false,
            volume: 0.3,
            rate: 1.5,
            loop: true 
        });
        this.bgm.play();

        const p1Spawn = map.findObject("Object", obj => obj.name === "P1 Spawn");
        player = new Player(this, p1Spawn.x, p1Spawn.y, 'player');
        // player.anims.play('idle');

        this.items = map.createFromObjects("Item3", {
            name: "heal",
            key: "fa",
        });
        this.items2 = map.createFromObjects("Item3", {
            name: "bullet",
            key: "refillAmmo",
        });

        this.physics.world.enable(this.items, Phaser.Physics.Arcade.STATIC_BODY);
        this.itemGroup = this.add.group(this.items);
        this.physics.world.enable(this.items2, Phaser.Physics.Arcade.STATIC_BODY);
        this.itemGroup2 = this.add.group(this.items2);
        // Crosshair and UI
        // this.p1 = this.add.sprite(0, 0, 'crosshair');
        // this.add.rectangle(16,borderUISize + borderPadding, game.config.width/4, borderUISize * 2,  0x00FF00).setScrollFactor(0); 
        this.healthText = this.add.text(16, 16 ,`Health: ${this.playerHP}`, { fontSize: '16px', fill: '#000' }).setScrollFactor(0);
        // this.add.rectangle(0,borderUISize + borderPadding, game.config.width/4, borderUISize * 2, 0x00FF00).setScrollFactor(0);  
        this.ammoText = this.add.text(16, 32, `Ammo: ${this.ammoCount}`, { fontSize: '16px', fill: '#000' }).setScrollFactor(0);

        this.enemyGroup = this.add.group({

            runChildUpdate: true
        });
        this.enemyWallsGroup = this.add.group({
            runChildUpdate: true
        });

        this.addEnemy(map);
        this.addInvisibleWall();
     
        this.physics.world.gravity.y = 2000;
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.add.collider(player, platformLayer);
        this.physics.add.overlap(player, this.itemGroup, (obj1, obj2) => {
            obj2.destroy();
            this.playerHP +=50;
            this.healthText.text = `Health: ${this.playerHP}`;
        });
        this.physics.add.overlap(player, this.itemGroup2, (obj1, obj2) => {
            obj2.destroy();
            this.ammoCount +=60;
            this.ammoText.text = `Ammo: ${this.ammoCount}`;
        });
        // this.physics.add.collider(this.enemyGroup, platformLayer);
        this.physics.add.collider(this.enemyGroup, platformLayer, (obj1, obj2) => {
            obj1.changeDirection();
        });
        this.physics.add.overlap(this.enemyGroup, this.enemyGroup, (obj1, obj2) => {
            // obj1.changeDirection();
        });
        this.physics.add.collider(this.enemyGroup, this.enemyWallsGroup, (obj1, obj2) => {
            obj1.changeDirection();
        });
        // this.physics.add.overlap(player, this.enemyGroup, this.takeDamage, null, this);
        this.physics.add.overlap(this.enemyGroup, player.bulletGroup, this.hitEnemy, null, this);
        this.physics.add.overlap(player, this.enemyGroup, (obj1, obj2) => {
            if(playerHurt == false) {
                this.playerHP -= 20;
                this.healthText.text = `Health: ${this.playerHP}`;
                playerHurt = true;
                this.cameras.main.shake(250, 0.0075);
                this.sfx = this.sound.add('hurt', {
                    mute: false,
                    volume: 0.3,
                    rate: 1,
                    loop: false 
                });
                this.sfx.play();
                // obj2.anims.play('enemy2Attack');
                obj2.changeDirection();
                this.time.delayedCall(2000, () => {
                    this.healthText.text = `Health: ${this.playerHP}`;
                    playerHurt = false;
                }, null, this);
            }
        });
        this.physics.add.collider(player.bulletGroup, platformLayer,(obj1,obj2)=> obj1.destroy());
      
                
        cursors = this.input.keyboard.createCursorKeys();
        // this.swap = this.input.keyboard.addKey('S');
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.input.on('pointerdown', (pointer) => {
            if(pointer.leftButtonDown()) {
                player.shoot(pointer);
            }
        });
        
        // setup camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(player, true, 0.25, 0.25);

       // Move to next level upon Collision
        const Exit = map.findObject("Exit3", obj => obj.name === "End");
        this.transition =this.add.rectangle(Exit.x,Exit.y-50,Exit.width,Exit.height, 0xff6699);
        this.physics.world.enable(this.transition);
        this.transition.body.allowGravity = false;
 
    }

    addEnemy(map) {
        for (let i=0;  i<10; i++) {
            const enemySpawn = map.findObject("Enemy3", obj => obj.name === "Enemy Spawn"+(i + 1).toString());
            enemy3 = new Enemy3(this, enemySpawn.x, enemySpawn.y, 'enemy3');
            this.enemyGroup.add(enemy3);
        }
    }

    addInvisibleWall() {
        this.enemyWall = this.addWall(150, 229);
        this.enemyWallsGroup.add(this.enemyWall);
        this.enemyWall2 = this.addWall(823, 277);
        this.enemyWallsGroup.add(this.enemyWall2);
        this.enemyWall3 = this.addWall(936, 277);
        this.enemyWallsGroup.add(this.enemyWall3);
        this.enemyWall4 = this.addWall(969, 294);
        this.enemyWallsGroup.add(this.enemyWall4);
        this.enemyWall5 = this.addWall(1163, 164);
        this.enemyWallsGroup.add(this.enemyWall5);
        this.enemyWall6 = this.addWall(1388, 36);
        this.enemyWallsGroup.add(this.enemyWall6);
        this.enemyWall7 = this.addWall(1544, 36);
        this.enemyWallsGroup.add(this.enemyWall7);
    }
    // custom wall property
    addWall(x, y) {
        let wall = this.physics.add.sprite(x, y, 'crosshair').setOrigin(0.5).setScale(0.1, 0.3);
        // wall.setOffset(18, 16);
        wall.setVisible(false);
        wall.setImmovable(true);
        wall.body.allowGravity = false;
        return wall;
    }

    update() {
        player.update();
        // enemy2.update();
        if(this.ammoCount<=0) {
            this.scene.start("end2Scene");
        }
        if(this.playerHP <= 0) {
            this.scene.start("endScene");
        }            
            
        // this.physics.add.collider(this.enemyGroup, player, this.takeDamage, null, this)
        // this.physics.add.collider(this.enemyGroup, player.bulletGroup, this.hitEnemy, null, this);
        
            
        // Move to next level upon Collision
        this.physics.add.collider(player,this.transition, this.exitCall, null, this)
        
        // if(Phaser.Input.Keyboard.JustDown(this.swap)) {
        //     this.scene.start("level3Scene");
        // }
    }

    // takeDamage() {
    //     console.log('hit');
    //     if(playerHurt == false){
    //         this.playerHP -=1;
    //         this.healthText.text = `Health: ${this.playerHP}`;
    //     } 

    //     // Send Player back to spawn point on collison with enemy
    //     // player.setVelocity(0, 0);
    //     // player.setX(31.25);
    //     // player.setY(463.25);
    //     // player.anims.play('idle', true);
    //     // player.setAlpha(0);
    //     // let sendBack = this.tweens.add({
    //     //     targets: player,
    //     //     alpha: 1,
    //     //     duration: 100,
    //     //     ease: 'Linear',
    //     //     repeat: 5,
    //     // }); 
    //     this.cameras.main.shake(250, 0.0075);
    //     player.anims.play('hurt');
    //     if(this.playerHP <= 0) {
    //         this.scene.start("menuScene");
    //     }
    // }

    hitEnemy(monster, bulletGroup) {
        console.log('hit');
        monster.hit();
        bulletGroup.destroy();
    }

    exitCall() {
        console.log('exit');
        this.scene.start("level3Scene");
        this.sound.stopAll();
    }


}

  