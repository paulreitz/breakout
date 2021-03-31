import Phaser from 'phaser';

import { GAME } from '../consts/SceneKeys';
import * as FontKeys from '../consts/FontKeys';

export default class TitleScreen extends Phaser.Scene {
    create() {
        this.title = this.add.text(400, 200, 'Basic Break Out', {
            fontSize: 38,
            fontFamily: FontKeys.ROBOTO
        }).setOrigin(0.5);

        this.add.text(400, 300, 'Press Space to Play', {
            fontFamily: FontKeys.ROBOTO
        }).setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start(GAME);
        })
    }
}