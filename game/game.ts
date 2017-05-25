/// <reference path="../bower_components/excalibur/dist/excalibur.d.ts" />
/// <reference path="resources.ts" />
/// <reference path="config.ts" />
/// <reference path="menu.ts" />
/// <reference path="gameScene.ts" />
/// <reference path="player.ts" />
/// <reference path="border.ts" />
/// <reference path="laser.ts" />

var game = new ex.Engine({
    width: null,
    height: null,
    displayMode: config.gameScreen,
});

game.backgroundColor = config.color;

// create an asset loader
var loader = new ex.Loader();

// queue resources for loading
for (var r in resources) {
    loader.addResource(resources[r]);
}

// uncomment loader after adding resources
game.start(loader).then(() => {
    // start your game!
    var menu = new MainMenu(); 
    var gameScene = new GameScene();
    game.add('gameScene', gameScene);
    game.add('menu', menu);    
    game.goToScene('gameScene');
});