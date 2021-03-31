import Phaser from 'phaser';

import * as FontKeys from '../consts/FontKeys';
import { GAME } from '../consts/SceneKeys';

export default class EndScreen extends Phaser.Scene {

    create(data) {
        this.title = this.add.text(400, 200, 'Game Over', {
            fontSize: 38,
            fontFamily: FontKeys.ROBOTO
        }).setOrigin(0.5);

        this.add.text(400, 250, `Final Score: ${data.score}`, {
            fontFamily: FontKeys.ROBOTO
        }).setOrigin(0.5);

        this.add.text(400, 300, 'Press Space to Play Again', {
            fontFamily: FontKeys.ROBOTO
        }).setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start(GAME)
        })
    }
}