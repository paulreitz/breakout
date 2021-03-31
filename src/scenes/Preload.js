import Phaser from 'phaser';

import * as FontKeys from '../consts/FontKeys';
import WebFontFile from '../WebFontFile';
import { TITLE_SCREEN } from '../consts/SceneKeys'

export default class Preload extends Phaser.Scene {
    preload() {
        const fonts = new WebFontFile(this.load, FontKeys.ROBOTO);
        this.load.addFile(fonts);

        this.load.image('ball', 'assets/images/ball.png');
        this.load.image('paddle', 'assets/images/paddle.png');

        this.load.audio('pop', ['assets/sounds/pop.ogg', 'assets/sounds/pop.mp3']);
        this.load.audio('beep', ['assets/sounds/beep.ogg', 'assets/sounds/beep.mp3']);
        this.load.audio('wall-hit', ['assets/sounds/wall.ogg', 'assets/sounds/wall.mp3']);

        for (let i = 1; i <= 9; i++) {
            this.load.image(`block_0${i}`, `assets/images/block0${i}.png`);
        }
    }

    create() {
        this.scene.start(TITLE_SCREEN);
    }
}