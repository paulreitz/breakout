import Phaser from 'phaser';

import Blocks from '../components/Blocks';

import * as Colors from '../consts/Colors';
import * as FontKeys from '../consts/FontKeys';
import { END_SCREEN } from '../consts/SceneKeys';

export default class Game extends Phaser.Scene {
    init() {
        this.nextPosition = 400;
        this.rowCount = 3;
        this.ballSpeed = 200;
        this.score = 0;
        this.balls = 5;
    }

    preload() {
        
    }

    create() {
        this.physics.world.setBounds(0, 0, 800, 700);
        this.beep = this.sound.add('beep');
        this.wallHit = this.sound.add('wall-hit');

        this.paddle = this.add.image(400, 475, 'paddle');
        this.physics.add.existing(this.paddle, true);

        this.ball = this.add.image(400, 450, 'ball');
        this.physics.add.existing(this.ball);
        this.ball.body.setCircle(8);
        this.ball.body.setBounce(1, 1);
        this.ball.body.setCollideWorldBounds(true, 1, 1);
        this.ball.body.onWorldBounds = true;
        this.physics.add.collider(this.paddle, this.ball, this.nudgeBall, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.blocks = new Blocks(this, this.incrementScore);
        this.blocks.buildBlocks(this.rowCount);
        this.blocks.addCollider(this.ball);
        this.resetBall();

        this.scoreLabel = this.add.text(25, 10, `Score: ${this.score}`, {
            fontSize: 24,
            fontFamily: FontKeys.ROBOTO
        });

        this.ballLabel = this.add.text(700, 10, `Balls: ${this.balls}`, {
            fontSize: 24,
            fontFamily: FontKeys.ROBOTO
        });

        this.physics.world.on('worldbounds', this.wallBounce, this);
    }

    update() {
        let move = 0;
        const drag = 10;
        const paddleSpeed = 50;
        if (this.cursors.left.isDown && this.paddle.x > 50) {
            this.nextPosition = this.paddle.x - paddleSpeed;
            this.nextPosition = this.nextPosition > 0 ? this.nextPosition : 0;
        }
        else if (this.cursors.right.isDown && this.paddle.x < 750) {
            this.nextPosition = this.paddle.x + paddleSpeed;
            this.nextPosition = this.nextPosition < 800 ? this.nextPosition : 800;
        }
        if (Math.abs(this.nextPosition - this.paddle.x) > 10) {
            move = (this.nextPosition - this.paddle.x) / drag;
            this.paddle.x += move;
            this.paddle.body.updateFromGameObject();
        }

        if (this.ball.y > 630) {
            if (this.balls === 0) {
                this.physics.pause();
                this.scene.start(END_SCREEN, {score: this.score});
            }
            this.balls--;
            this.ballLabel.text = `Balls: ${this.balls}`;
            this.resetBall();
        }

        if (this.blocks.isEmpty()) {
            this.physics.pause();
            if (this.rowCount < 9) {
                this.rowCount++;
            }
            this.blocks.buildBlocks(this.rowCount);
            this.resetBall(true);
            this.score += 100;
            this.scoreLabel.text = `Score: ${this.score}`;
            this.physics.resume();
        }
    }

    resetBall(updateSpeed) {
        if (updateSpeed) {
            this.ballSpeed += 25;
        }
        this.ball.setPosition(400, 450);
        const angle = Phaser.Math.Between(200, 340);
        const vec = this.physics.velocityFromAngle(angle, this.ballSpeed);
        this.ball.body.setVelocity(vec.x, vec.y);
    }

    incrementScore() {
        this.scene.score += 10;
        this.scene.scoreLabel.text = `Score: ${this.scene.score}`;
    }

    nudgeBall(paddle, ball) {
        this.beep.play();
        const nudge = 10;
        if (this.cursors.left.isDown) {
            this.ball.x -= nudge;
        }
        else if (this.cursors.right.isDown) {
            this.ball.y += 10;
        }
    }

    wallBounce() {
        this.wallHit.play();
    }
}