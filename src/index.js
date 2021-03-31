import Phaser from 'phaser';

import Preload from './scenes/Preload';
import TitleScreen from './scenes/TitleScreen';
import Game from './scenes/Game';
import EndScreen from './scenes/EndScreen';

import * as SceneKeys from './consts/SceneKeys';

const config = {
    width: 800,
    height: 500,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: environment === 'development'
        }
    }
};

const game = new Phaser.Game(config);

game.scene.add(SceneKeys.PRELOAD, Preload);
game.scene.add(SceneKeys.TITLE_SCREEN, TitleScreen);
game.scene.add(SceneKeys.GAME, Game);
game.scene.add(SceneKeys.END_SCREEN, EndScreen);

game.scene.start(SceneKeys.PRELOAD);