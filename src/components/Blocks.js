import Phaser from 'phaser';

import * as BlockKeys from '../consts/BlockKeys';

export default class Blocks {
    constructor(scene = new Phaser.Scene(), collisionCallback) {
        this.scene = scene;
        this.rowCount = 9;
        this.pop = this.scene.sound.add('pop');
        this.collisionCallback = collisionCallback;
        this.blocks = this.scene.physics.add.staticGroup();
    }

    buildBlocks(count) {
        this.blocks.clear(true, true);
        for (let i = 1; i <= count; i++) {
            for (let j = 0; j < 15; j++) {
                this.blocks.create(
                    (j * 48) + 40 + (48/2),
                    ((i - 1) * 16) + 50,
                    `block_0${i}`
                );
            }
        }
    }

    addCollider(ball) {
        this.scene.physics.add.collider(ball, this.blocks, this.blockCollision, null, this);
    }

    blockCollision(ball, block) {
        this.pop.play();
        block.disableBody(true, true);
        this.collisionCallback();
    }

    isEmpty() {
        return this.blocks.countActive(true) === 0;
    }
}