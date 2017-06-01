class NextLevel extends ex.Scene {

    private levelComplete: ex.Sprite;
    private nextLevel: ex.Sprite;
    private message: ex.UIActor;
    private button: ex.UIActor; 

    public onInitialize(engine: ex.Engine) {
        
        this.levelComplete = new ex.Sprite(resources.levelComplete, 0, 0, 100, 100);
        this.message = new ex.UIActor(game.getDrawWidth()/2 - 200, 50);
        this.message.addDrawing('complete', this.levelComplete);
        this.message.setDrawing('complete');
        this.message.scale = new ex.Vector(4, 4);

        this.nextLevel = new ex.Sprite(resources.beginNextLevel, 0, 0, 100, 100);
        this.button = new ex.UIActor(game.getDrawWidth()/2 - 200, 500);
        this.button.addDrawing('nextButton', this.nextLevel);
        this.button.setDrawing('nextButton');
        this.button.scale = new ex.Vector(4, 1.5);
    }
    // each time the scene is entered (Engine.goToScene)
    public onActivate() { 
        this.add(this.message);
        this.add(this.button);
        game.input.keyboard.on('press', (evt) => {
            if(evt.key == 13) {
                game.goToScene('gameScene');
            }
        });
    }
    // each time the scene is exited (Engine.goToScene)
    public onDeactivate() {
        for(let child of this.children) {
            this.remove(child);
        }
    }
}