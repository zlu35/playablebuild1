class ThirdLevel extends Phaser.Scene {
    constructor() {
        super('Scene3');

        this.ACCELERATION = 500;
        this.MAX_X_VEL = 200;
        this.MAX_Y_VEL = 2000;
        this.DRAG = 600;
        this.JUMP_VELOCITY = -650;
    }

    preload() {
        this.load.image('Doll', './assets/Doll.png');
        this.load.image('JumpMan', './assets/JumpMan.png');
        this.load.image('tile_set', './assets/tile_example.png');
        this.load.image('Door', './assets/door.png');

        this.load.audio('sfx_possess', './assets/possess.wav');
        this.load.audio('sfx_jump', './assets/Jump.wav');
        this.load.audio('sfx_jump_higher', './assets/JumpHigher.wav');
        this.load.audio('sfx_NextLevel', './assets/NextLevel.wav');

        this.load.tilemapTiledJSON('level3Map', './assets/level3.json');
    }

    create() {
        const map = this.add.tilemap('level3Map');

        const tileset = map.addTilesetImage('tile_example', 'tile_set');

        const backgroundLayer = map.createStaticLayer('BG', tileset, 0, 0);
        const groundLayer = map.createStaticLayer('ground', tileset, 0, 0);
        groundLayer.setCollisionByProperty({ collides: true});

        // add the door
        door = this.physics.add.sprite(625, 335, 'Door');
        door.body.setAllowGravity(false);
        // add the sprites
        player = this.physics.add.sprite(50, 50, 'Doll');
        player.body.setMaxVelocity(this.MAX_X_VEL, this.MAX_Y_VEL);
        player.setCollideWorldBounds(true);
        player.name = 'doll';

        jumpMan = this.physics.add.sprite(25, centerY - 50, 'JumpMan');
        jumpMan.body.setMaxVelocity(this.MAX_X_VEL + 200, this.MAX_Y_VEL + 100);
        jumpMan.setCollideWorldBounds(true);
        jumpMan.name = 'jumpman';

        this.physics.world.gravity.y = 2000;
        this.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);

        this.physics.add.collider(player, groundLayer);
        this.physics.add.collider(jumpMan, groundLayer);

        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        cursors = this.input.keyboard.createCursorKeys();

    }

    update() {
        // Setting of movement
        if(cursors.left.isDown) {
            if (player.name == 'jumpman') {
                player.body.setAccelerationX(-(this.ACCELERATION) - 500)
            } else {
                player.body.setAccelerationX(-this.ACCELERATION);
            }
        } else if (cursors.right.isDown) {
            if (player.name == 'jumpman') {
                player.body.setAccelerationX(this.ACCELERATION + 500)
            } else {
                player.body.setAccelerationX(this.ACCELERATION);
            }
        } else {
            player.body.setAccelerationX(0);
            if (player.name == 'jumpman') {
                player.body.setDragX(this.DRAG + 400);
            } else {
                player.body.setDragX(this.DRAG);
            }
        }

        if (player.body.blocked.down && Phaser.Input.Keyboard.JustDown(cursors.up)) {
            if (player.name == 'jumpman') {
                this.sound.play('sfx_jump_higher');
                player.body.setVelocityY(this.JUMP_VELOCITY - 200);
            } else {
                this.sound.play('sfx_jump');
                player.body.setVelocityY(this.JUMP_VELOCITY);
            }
        }
        // when overlap with another doll, press E to switch body
        if (this.physics.world.overlap(player, jumpMan) && Phaser.Input.Keyboard.JustDown(keyE)) {
            this.sound.play('sfx_possess');
            temp = player;
            player = jumpMan;
            jumpMan = temp;
            jumpMan.body.setAccelerationX(0);
            //jumpMan.body.setDragX(this.DRAG);
        }

        // play sound and switch scene
        if(this.physics.world.overlap(player, door)){  
            this.sound.play('sfx_NextLevel');
            this.scene.start('Scene1');
        }
    }
}

