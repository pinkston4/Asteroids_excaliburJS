var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Border = (function (_super) {
    __extends(Border, _super);
    function Border(x, y, width, height) {
        var _this = _super.call(this, x, y, width, height, ex.Color.White) || this;
        _this.collisionType = ex.CollisionType.Fixed;
        return _this;
    }
    return Border;
}(ex.Actor));
var config = {
    gameScreen: ex.DisplayMode.FullScreen,
    color: ex.Color.Transparent,
};
var resources = {
    playerShip: new ex.Texture('../resources/PNG/playerShip1_blue.png')
};
var MainMenu = (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainMenu.prototype.onInitialize = function (engine) {
    };
    // each time the scene is entered (Engine.goToScene)
    MainMenu.prototype.onActivate = function () { };
    // each time the scene is exited (Engine.goToScene)
    MainMenu.prototype.onDeactivate = function () { };
    return MainMenu;
}(ex.Scene));
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameScene.prototype.onInitialize = function (engine) {
        var topLeftY = 0 - game.getDrawHeight() / 2;
        var bottomLeftY = game.getDrawHeight() / 2;
        var left = 0 - game.getDrawWidth() / 2;
        var right = game.getDrawWidth() / 2;
        this.topBorder = new Border(0, topLeftY + 10, game.getDrawWidth() - 20, 2);
        this.bottomBorder = new Border(0, bottomLeftY - 10, game.getDrawWidth() - 20, 2);
        this.leftBorder = new Border(left + 10, 0, 2, game.getDrawHeight() - 20);
        this.rightBorder = new Border(right - 10, 0, 2, game.getDrawHeight() - 20);
        this.player = new Player(0, 0);
    };
    // each time the scene is entered (Engine.goToScene)
    GameScene.prototype.onActivate = function () {
        var _this = this;
        this.add(this.leftBorder);
        this.add(this.topBorder);
        this.add(this.rightBorder);
        this.add(this.bottomBorder);
        this.add(this.player);
        this.player.on('collision', function (ev) {
            if (ev.other == _this.leftBorder || ev.other == _this.rightBorder || ev.other == _this.topBorder || ev.other == _this.bottomBorder) {
                _this.player.vel.x = 0;
                _this.player.vel.y = 0;
                _this.player.pos.x = _this.player.oldPos.x;
                _this.player.pos.y = _this.player.oldPos.y;
            }
        });
        // this.player.on('collision', (cv: ex.CollisionEvent) => {
        //     console.log(cv);
        //     if(cv.other == this.topBorder) {
        //        console.log('collided with top');
        //     }
        //     if(cv.other == this.rightBorder) {
        //     }
        //     if(cv.other == this.bottomBorder) {
        //     }
        //     if(cv.other == this.leftBorder) {
        //     }
        // });
    };
    // each time the scene is exited (Engine.goToScene)
    GameScene.prototype.onDeactivate = function () {
        this.removeGroup('player/boundaries');
        this.remove(this.player);
        this.remove(this.topBorder);
        this.remove(this.bottomBorder);
        this.remove(this.leftBorder);
        this.remove(this.rightBorder);
    };
    return GameScene;
}(ex.Scene));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(x, y) {
        var _this = _super.call(this, x, y) || this;
        _this.collisionType = ex.CollisionType.Active;
        _this.playerSprite = new ex.Sprite(resources.playerShip, x, y, 96, 75);
        _this.playerSprite.scale = new ex.Vector(0.5, 0.5);
        _this.addDrawing('playerShip', _this.playerSprite);
        return _this;
    }
    Player.prototype.onInitialize = function (engine) {
        this.setDrawing('playerShip');
    };
    Player.prototype.update = function (engine, delta) {
        //move
        var leftKey = ex.Input.Keys.A;
        var rightKey = ex.Input.Keys.D;
        var upKey = ex.Input.Keys.W;
        var downKey = ex.Input.Keys.S;
        //aim
        var leftArrow = ex.Input.Keys.Left;
        var rightArrow = ex.Input.Keys.Right;
        var upArrow = ex.Input.Keys.Up;
        var downArrow = ex.Input.Keys.Down;
        var keyThing = engine.input.keyboard;
        _super.prototype.update.call(this, engine, delta);
        if (keyThing.wasPressed(leftKey)) {
            this.vel.x = -350;
        }
        else if (keyThing.wasPressed(rightKey)) {
            this.vel.x = 350;
        }
        else if (keyThing.wasPressed(upKey)) {
            this.vel.y = -350;
        }
        else if (keyThing.wasPressed(downKey)) {
            this.vel.y = 350;
        }
        else if (keyThing.wasReleased(leftKey) || keyThing.wasReleased(rightKey)) {
            this.vel.x = 0;
        }
        else if (keyThing.wasReleased(upKey) || keyThing.wasReleased(downKey)) {
            this.vel.y = 0;
        }
        // if(keyThing.isHeld(leftKey) && keyThing.isHeld(upKey)) {
        //     this.pos.x -= 2.5;
        //     this.pos.y -= 2.5;
        // } else if(keyThing.isHeld(leftKey) && keyThing.isHeld(downKey)) {
        //     this.pos.x -= 2.5;
        //     this.pos.y += 2.5;
        // } else if(keyThing.isHeld(rightKey) && keyThing.isHeld(upKey)) {
        //     this.pos.x += 2.5;
        //     this.pos.y -= 2.5;;
        // } else if(keyThing.isHeld(rightKey) && keyThing.isHeld(downKey)) {
        //     this.pos.x += 2.5;
        //     this.pos.y += 2.5; 
        // } 
        if (keyThing.wasPressed(leftArrow)) {
            this.rotation = 4.712;
        }
        else if (keyThing.wasPressed(upArrow)) {
            this.rotation = 0;
        }
        else if (keyThing.wasPressed(rightArrow)) {
            this.rotation = 1.571;
        }
        else if (keyThing.wasPressed(downArrow)) {
            this.rotation = 3.141;
        }
        else if (keyThing.isHeld(leftArrow) && keyThing.isHeld(upArrow)) {
            this.rotation = 5.497;
        }
        else if (keyThing.isHeld(leftArrow) && keyThing.isHeld(downArrow)) {
            this.rotation = 3.926;
        }
        else if (keyThing.isHeld(rightArrow) && keyThing.isHeld(upArrow)) {
            this.rotation = 0.785;
        }
        else if (keyThing.isHeld(rightArrow) && keyThing.isHeld(downArrow)) {
            this.rotation = 2.356;
        }
    };
    return Player;
}(ex.Actor));
/// <reference path="../bower_components/excalibur/dist/excalibur.d.ts" />
/// <reference path="resources.ts" />
/// <reference path="config.ts" />
/// <reference path="menu.ts" />
/// <reference path="gameScene.ts" />
/// <reference path="player.ts" />
/// <reference path="border.ts" />
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
game.start(loader).then(function () {
    // start your game!
    var menu = new MainMenu();
    var gameScene = new GameScene();
    game.add('gameScene', gameScene);
    game.add('menu', menu);
    game.goToScene('gameScene');
});
